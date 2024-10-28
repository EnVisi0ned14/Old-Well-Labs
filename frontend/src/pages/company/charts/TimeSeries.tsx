import * as React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import { Stock } from "../../../types";
import { Box, Typography } from "@mui/material";

interface TimeSeriesProps {
  stocks: Stock[];
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const price = payload[0].payload.price; // Access price
    const volume = payload[0].payload.volume; // Access volume

    return (
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: 3,
        }}
      >
        <Typography variant="body2">{`Date: ${label}`}</Typography>
        <Typography variant="body2">{`Price: $${price}`}</Typography>
        <Typography variant="body2">{`Volume: ${volume.toLocaleString()}`}</Typography>
      </Box>
    );
  }

  return null; // Render nothing if not active
};

const TimeSeries: React.FC<TimeSeriesProps> = ({ stocks }) => {
  // Format data for the LineChart
  const formattedData = stocks?.map((stock) => ({
    date: dayjs(stock.asof).format("YYYY-MM-DD"), // Format date for the X-axis
    price: stock.close_usd, // Price for the Y-axis
    volume: stock.volume, // Volume for the tooltip
  }));

  // Function to round up to the nearest multiple of 50
  const roundUpToNearest50 = (num: number) => {
    return Math.ceil(num / 50) * 50;
  };

  // Calculate the maximum price and round it upwards to the nearest 50
  const maxPrice = Math.max(...formattedData.map((stock) => stock.price));
  const roundedMaxPrice = roundUpToNearest50(maxPrice);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart title="Stock Prices Over Time" data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={(tick) => dayjs(tick).format("YYYY")}
          minTickGap={20}
        />
        <YAxis type="number" domain={[0, roundedMaxPrice]} />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#82ca9d"
          dot={false}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TimeSeries;
