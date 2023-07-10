import React from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import PerformancePie from "components/PerformancePie";

const Performance = () => {
  return (
    <Box height="75vh" m="1.5rem 2.5rem">
      <Header
        title="PERFORMANCE ACROSS SOURCES"
        subtitle="Analyze Special project counts across different sources"
      />
      <PerformancePie />
    </Box>
  );
};

export default Performance;
