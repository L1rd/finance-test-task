// Libs
import dayjs from "dayjs";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { Tooltip, IconButton, Box } from "@mui/material";
// Icons
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
// Core
import { socket } from "core/index";
// Actions
import { setToWatchingGroup } from "store/finance-service/reducer";
// Styles
import * as Styled from "./styled";

export const Ticker = ({ ticker }) => {
  const dispatch = useDispatch();
  const isChangeUp = useMemo(
    () => ticker?.change.includes("+"),
    [ticker.change]
  );

  const handleAddTickerToWatcherGroup = () => {
    socket.emit("watching-group", { ...ticker, isWatchingGroup: true });
    socket.on("watching-group", (value) => {
      dispatch(setToWatchingGroup(value));
    });
  };

  return (
    <>
      <Styled.TickerBox>
        <Styled.TickerContent>
          <Styled.TickerInfo>
            <Styled.Title className={ticker.ticker}>
              {ticker.ticker}
            </Styled.Title>
            <Box>
              <Tooltip title="Price">
                <Styled.Text>{ticker.price}</Styled.Text>
              </Tooltip>
            </Box>
            <Box>
              <Tooltip title="Change">
                <Styled.Text className={isChangeUp ? "up" : "down"}>
                  {ticker.change}$
                </Styled.Text>
              </Tooltip>
            </Box>
            <Tooltip title="Change Percent">
              <Styled.PercentBox className={isChangeUp ? "up" : "down"}>
                {isChangeUp ? (
                  <KeyboardDoubleArrowUpIcon data-testid="upArrowIcon" />
                ) : (
                  <KeyboardDoubleArrowDownIcon data-testid="downArrowIcon" />
                )}
                <Styled.Text>{ticker.change_percent}%</Styled.Text>
              </Styled.PercentBox>
            </Tooltip>
          </Styled.TickerInfo>
          {ticker.isWatchingGroup ? (
            <IconButton onClick={handleAddTickerToWatcherGroup}>
              <Tooltip title="Unfollow">
                <CloseIcon sx={{ height: "1.3em", width: "1.3em" }} />
              </Tooltip>
            </IconButton>
          ) : (
            <IconButton onClick={handleAddTickerToWatcherGroup}>
              <Tooltip title="Follow">
                <ControlPointIcon sx={{ height: "1.3em", width: "1.3em" }} />
              </Tooltip>
            </IconButton>
          )}
        </Styled.TickerContent>
        <Styled.Footer>
          <Tooltip title="Last trade time">
            <Styled.Text>
              {dayjs(ticker.last_trade_time).format("DD MMM, YYYY")}
            </Styled.Text>
          </Tooltip>
          <Tooltip title="Exchange">
            <Styled.Text>{ticker.exchange}</Styled.Text>
          </Tooltip>
        </Styled.Footer>
      </Styled.TickerBox>
    </>
  );
};
