import React from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import PayRateChart from "components/PayRateChart";
import { useGetPayRateQuery } from "state/api";
import { ResponsiveLine } from "@nivo/line";

const PayRate = () => {
  return (
    <Box m="1.5rem 2.5rem" height="75vh">
      <Header
        title="PAY RATE"
        subtitle="Analyze and study payrate across time"
      />
      <PayRateChart />
    </Box>
  );
};

export default PayRate;
