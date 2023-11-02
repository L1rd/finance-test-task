"use strict";
const express = require("express");
const http = require("http");
const io = require("socket.io");
const cors = require("cors");

const FETCH_INTERVAL = 5000;
const PORT = process.env.PORT || 4000;
let tickersGroup = [];

const tickers = [
  "AAPL", // Apple
  "GOOGL", // Alphabet
  "MSFT", // Microsoft
  "AMZN", // Amazon
  "FB", // Facebook
  "TSLA", // Tesla
];

function randomValue(min = 0, max = 1, precision = 0) {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(precision);
}

function utcDate() {
  const now = new Date();
  return new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds()
  );
}

function getQuotes(socket) {
  const quotes = tickers.map((ticker) => ({
    ticker,
    exchange: "NASDAQ",
    price: randomValue(100, 300, 2),
    change: randomValue(0, 200, 2),
    change_percent: randomValue(0, 1, 2),
    dividend: randomValue(0, 1, 2),
    yield: randomValue(0, 2, 2),
    last_trade_time: utcDate(),
    isWatchingGroup: false,
  }));
  if (tickersGroup.length === 0) {
    
    tickersGroup = quotes;
    socket.emit("ticker", quotes);
    return;
  } else {
    const updateQuote = quotes.map((item) => {
      const anotherTicker = tickersGroup.find(
        (ticker) => ticker.ticker === item.ticker
      );
      const diff = (+item.price - +anotherTicker.price).toFixed(2);
      return {
        ...item,
        change: diff > 0 ? `+${diff}` : diff,
        change_percent: Math.abs((100 * diff) / +item.price).toFixed(2),
      };
    });
    tickersGroup = updateQuote;
    socket.emit("ticker", updateQuote);
  }
}

const changeSocketInterval = (func, socket) => {
  let timer;

  return (time) => {
    clearInterval(timer);
    timer = setInterval(() => {
      func(socket);
    }, time);
  };
};

function trackTickers(socket) {
  // run the first time immediately
  getQuotes(socket);

  // every N seconds
  const timer = changeSocketInterval(getQuotes, socket);

  timer(FETCH_INTERVAL);
  socket.on("interval", (time) => {
    timer(time);
  });
  socket.on("disconnect", function () {
    clearInterval(timer);
  });
}

const app = express();
app.use(cors());
const server = http.createServer(app);

const socketServer = io(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

socketServer.on("connection", (socket) => {
  socket.on("start", () => {
    trackTickers(socket);
  });
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});
