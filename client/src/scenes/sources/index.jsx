import React from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
import SourcesChart from "components/SourcesChart";

const Sources = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="RECRUITMENT SOURCES"
        subtitle="Analyze Gender ratio across different Recruitment sources"
      />
      <Box mt="40px" height="75vh">
        <SourcesChart />
      </Box>
    </Box>
  );
};

export default Sources;
