// Libs
import { useState } from "react";
import { Box, Button } from "@mui/material";
// Core
import { socket } from "core/index";
// Styles
import * as Styled from "./styled";

export const TickerAdd = () => {
  const [inputValue, setInputValue] = useState(5000);

  const handleChangeTime = (e) => {
    socket.emit("interval", +inputValue);
  };

  return (
    <Styled.Tickers>
      <Box sx={{ marginBottom: "40px" }}>
        <Styled.TickersHeader>
          <h1>Specify the time interval</h1>
        </Styled.TickersHeader>
        <Styled.Field
          label="Time"
          variant="outlined"
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          InputProps={{
            endAdornment: (
              <Button variant="contained" onClick={handleChangeTime}>
                Change Time
              </Button>
            ),
          }}
        />
      </Box>
    </Styled.Tickers>
  );
};
