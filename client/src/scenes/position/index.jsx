import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import PositionChart from "components/PositionChart";

const Position = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="GENDER DIVERSITY ACROSS POSITIONS"
        subtitle="View Male to Female ratios across all postions"
      />
      <Box height="75vh">
        <PositionChart />
      </Box>
    </Box>
  );
};

export default Position;
