import React from "react";
import { Box, useTheme } from "@mui/material";

const RegionTooltip = ({ feature }) => {
  const theme = useTheme();
  const { id, value, maleCount, femaleCount } = feature.data || {};

  if (!id || !value || !maleCount || !femaleCount) {
    return null;
  }

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.secondary[200],
        color: theme.palette.primary.main,
      }}
      m="1rem 1.5rem"
    >
      <Box m="1rem 0.5rem">
        <div style={{ marginBottom: "0.5rem" }}>{id}</div>
        <div style={{ marginBottom: "0.5rem" }}>Total Count: {value}</div>
        <div>Male Count: {maleCount}</div>
        <div>Female Count: {femaleCount}</div>
      </Box>
    </Box>
  );
};

export default RegionTooltip;
