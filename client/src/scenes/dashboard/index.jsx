import React from "react";
import { useGetDashboardQuery } from "state/api";
import { DataGrid } from "@mui/x-data-grid";
import PerformancePie from "components/PerformancePie";
import PayRate from "scenes/payrate";
import SourcesChart from "components/SourcesChart";
import { Box, useTheme, Typography, useMediaQuery } from "@mui/material";
import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import PositionChart from "components/PositionChart";
import SatisfactionBar from "components/SatisfactionBar";
import PayRateChart from "components/PayRateChart";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetDashboardQuery();
  console.log("data:", data);

  const columns = [
    {
      field: "EmpID",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "Employee_Name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "DepartmentName",
      headerName: "Department Name",
      flex: 1,
    },
    {
      field: "PayRate",
      headerName: "Pay Rate",
      flex: 0.5,
    },
    {
      field: "PerformanceScore",
      headerName: "Performance Score",
      flex: 0.5,
    },
    {
      field: "RecruitmentSource",
      headerName: "Recruitment Source",
      flex: 1,
    },
    {
      field: "Sex",
      headerName: "Gender",
      flex: 0.5,
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.5,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD OVERVIEW" subtitle="Welcome to BackTogether" />
      </FlexBetween>
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoFlow="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* row 1 */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          height="450px"
          minHeight="325px"
          minWidth="325px"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }} marginBottom="0.5rem">
            Sources Chart
          </Typography>
          <SourcesChart isDashboard={true} />
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          height="450px"
          minHeight="325px"
          minWidth="325px"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Track Chart
          </Typography>
          <PayRateChart isDashboard={true} />
        </Box>
        {/* row 2 */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          height="400px"
          minHeight="325px"
          minWidth="325px"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.primary[400],
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.primary.light,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.primary[400],
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={data || []}
            columns={columns}
          />
        </Box>

        <Box
          gridColumn="span 6"
          gridRow="span 2"
          height="400px"
          minHeight="325px"
          minWidth="325px"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Performance Chart
          </Typography>
          <PerformancePie isDashboard={true} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
