// Libs
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// Core
import { socket } from "core/index";
// Components
import { Ticker } from "shared/index";
// Actions
import { setFinance } from "store/finance-service/reducer";
// Selectors
import { selectorGetALlFinances } from "store/finance-service/selectors";
// Styles
import * as Styled from "./styled";

export const TickerList = () => {
  const dispatch = useDispatch();
  const tickers = useSelector(selectorGetALlFinances);

  const getData = () => {
    socket.on("connect", () => {
      socket.emit("start");
    });
    socket.on("ticker", (value) => {
      dispatch(setFinance(value));
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Styled.Tickers>
      <Styled.TickersHeader>
        <h1>You can be interested</h1>
      </Styled.TickersHeader>
      <Styled.TickerList>
        {tickers?.map((item) => (
          <Ticker ticker={item} key={JSON.stringify(item)}></Ticker>
        ))}
      </Styled.TickerList>
    </Styled.Tickers>
  );
};
