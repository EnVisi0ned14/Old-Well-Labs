import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import StockService from "../../../services/stock-service";
import { CumulativeReturn } from "../../../types";

interface CumulativeCalculatorProps {
  company_id: number;
}

const CumulativeCalculator: React.FC<CumulativeCalculatorProps> = ({
  company_id,
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState<CumulativeReturn | null>(null);
  const [error, setError] = useState<string>("");

  const calculateCumulativeReturns = async () => {
    setError(""); // Reset error before new calculation
    setResult(null); // Reset result

    try {
      const { data } = await StockService.calculateCumulativeReturn(
        company_id,
        startDate,
        endDate
      );
      setResult(data);
    } catch (err) {
      setError(
        "Failed to calculate cumulative return. Please check the dates and try again."
      );
    }
  };

  return (
    <Stack pl={4} spacing={2}>
      <TextField
        variant="standard"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        variant="standard"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={calculateCumulativeReturns}
        disabled={!startDate || !endDate} // Disable if dates are missing
      >
        Calculate
      </Button>

      {result && (
        <Typography variant="body1" color="textPrimary">
          Cumulative Return: {result.cumulative_return.toFixed(2)}% <br />
          Initial Price: ${result.initial_price.toFixed(2)} <br />
          Final Price: ${result.final_price.toFixed(2)} <br />
        </Typography>
      )}

      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
    </Stack>
  );
};

export default CumulativeCalculator;
