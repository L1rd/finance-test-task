/* eslint-disable jest/no-conditional-expect */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TickerAdd } from "components";
import { Ticker } from "shared";
import { Provider } from "react-redux";
import store from "store/root";

test("Input functionality check", () => {
  render(<TickerAdd />);

  const timeInput = screen.getByLabelText("Time");

  expect(timeInput).toHaveValue(5000);

  fireEvent.change(timeInput, { target: { value: 10000 } });

  expect(timeInput).toHaveValue(10000);

  const changeTimeButton = screen.getByText("Change Time");

  fireEvent.click(changeTimeButton);
});

test("isChangeUp in Ticker component functionality check", () => {
  const tickerData = {
    ticker: "AAPL",
    price: 150.0,
    change: "+5.0",
    change_percent: "3.33%",
    isWatchingGroup: true,
    last_trade_time: "2023-11-01T12:00:00Z",
    exchange: "NASDAQ",
  };

  render(
    <Provider store={store}>
      <Ticker ticker={tickerData} />
    </Provider>
  );

  if (tickerData.change.includes("+")) {
    expect(screen.getByTestId("upArrowIcon")).toBeInTheDocument();
  } else {
    expect(screen.getByTestId("downArrowIcon")).toBeInTheDocument();
  }
});
