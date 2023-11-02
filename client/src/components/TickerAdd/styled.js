import styled from "styled-components";
import { flex } from "assets/styles/mixins";
import { Box, TextField } from "@mui/material";

export const Tickers = styled(Box)({
  width: "650px",
});

export const TickersHeader = styled(Box)({
  ...flex({ justify: "flex-start" }),
  width: "100%",
  borderBottom: "1px solid lightgray",
  margin: "0 0 20px 0",
  "& h1": {
    fontFamily: "Sora",
    fontSize: "40px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "normal",
  },
});

export const Field = styled(TextField)({
  width: "100%",
  "& .MuiInputBase-root": {
    paddingRight: "0",
  },
  "& input": {
    marginRight: "10px",
  },
  "& button": {
    boxShadow: "none",
    borderRadius: "0 4px 4px 0",
    width: "50%",
    padding: "16px 0",
  },
});

export const TickerList = styled(Box)({
  ...flex({ justify: "flex-start", direction: "column", gap: "10" }),
  width: "100%",
  overflowY: "auto",
  maxHeight: "800px",
  paddingRight: "5px",
});
