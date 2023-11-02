import { Box } from "@mui/material";
import styled, { keyframes, css } from "styled-components";
import { flex } from "assets/styles/mixins";

const fadeIn = keyframes`
  50% {
    transform: rotateX(0.5turn);
  }
  100% {
    transform: rotateX(1turn);
  }
`;

export const TickerBox = styled(Box)({
  padding: "20px 20px",
  borderRadius: "10px",
  border: "1px solid gray",
  width: "100%",
  boxSizing: "border-box",
  cursor: "pointer",
  transition: ".3s",
  "&:hover": {
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  },
});

export const TickerContent = styled(Box)({
  ...flex({ justify: "flex-start", gap: 30 }),
});

export const TickerInfo = styled(Box)({
  display: "grid",
  width: "100%",
  gridTemplateColumns: "150px repeat(3, 120px)",
  alignItems: "center",
  justifyContent: "space-between",
  "& > div": {
    ...flex({}),
    animation: css`
      ${fadeIn} .7s
    `,
    animationFillMode: "forwards",
  },
});

export const Title = styled("h2")({
  ...flex({}),
  color: "white",
  fontFamily: "Sora, sans-serif",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "normal",
  padding: "10px",
  borderRadius: "10px",
  "&.AAPL": {
    background: "black",
  },
  "&.GOOGL": {
    background: "#ED161E",
  },
  "&.MSFT": {
    background: "#737373",
  },
  "&.AMZN": {
    background: "#C26C03",
  },
  "&.TSLA": {
    background: "#E31937",
  },
  "&.FB": {
    background: "rgb(39, 48, 99)",
  },
});

export const Text = styled("p")({
  color: "#323443",
  fontFamily: "Inter, sans-serif",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "35px",
  "&.up": {
    color: "#34C34D",
  },
  "&.down": {
    color: "#CD463A",
  },
});

export const PercentBox = styled(Box)({
  ...flex({ gap: 5 }),
  padding: "5px",
  borderRadius: "10px",
  "&.up": {
    background: "#34C34D",
    ":is(p, svg)": {
      color: "#1F752E",
    },
  },
  "&.down": {
    background: "#CD463A",
    ":is(p, svg)": {
      color: "#861515",
    },
  },
});

export const Footer = styled(Box)({
  ...flex({ justify: "space-between" }),
  marginTop: "10px",
  padding: "0 10px",
  "& p": {
    fontSize: "15px",
    color: "gray",
  },
});
