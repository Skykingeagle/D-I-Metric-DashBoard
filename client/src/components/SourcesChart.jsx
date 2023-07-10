import React from "react";
import { ResponsiveRadar } from "@nivo/radar";
import { Box, Typography, useTheme } from "@mui/material";
import { useGetSourcesQuery } from "state/api";
import FlexBetween from "./FlexBetween";

const SourcesChart = ({ isDashboard = false }) => {
  const { data, isLoading } = useGetSourcesQuery();
  console.log("data:", data);
  const theme = useTheme();

  if (!data || isLoading) return "Loading...";

  const bestSource = data.reduce((prevSource, currSource) => {
    const prevDisparity = Math.abs(
      prevSource.maleCount - prevSource.femaleCount
    );
    const currDisparity = Math.abs(
      currSource.maleCount - currSource.femaleCount
    );

    return currDisparity > prevDisparity ? currSource : prevSource;
  });

  return (
    <Box
      height={isDashboard ? "400px" : "100%"}
      width={undefined}
      minHeight={isDashboard ? "325px" : undefined}
      minWidth={isDashboard ? "325px" : undefined}
      position="relative"
    >
      <ResponsiveRadar
        data={data}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: theme.palette.secondary[200],
              },
            },
            legend: {
              text: {
                fill: theme.palette.secondary[200],
              },
            },
            ticks: {
              line: {
                stroke: theme.palette.secondary[200],
                strokeWidth: 1,
              },
              text: {
                fill: theme.palette.secondary[200],
                fontSize: isDashboard ? "10px" : "15px",
              },
            },
          },
          legends: {
            text: {
              fill: theme.palette.secondary[200],
              fontSize: "15px",
            },
          },
          tooltip: {
            container: {
              color: theme.palette.primary.main,
            },
          },
        }}
        keys={["totalEmployees", "maleCount", "femaleCount"]}
        indexBy="source"
        valueFormat=">-.2f"
        margin={
          isDashboard
            ? { top: 40, right: 80, bottom: 60, left: 50 }
            : { top: 80, right: 180, bottom: 80, left: 80 }
        }
        borderColor={{ from: "color" }}
        s
        gridLabelOffset={36}
        dotSize={10}
        dotColor={{ theme: "background" }}
        dotBorderWidth={2}
        colors={{ scheme: "orange_red" }}
        fillOpacity={0.2}
        blendMode="normal"
        motionConfig="wobbly"
        legends={[
          {
            anchor: "top-left",
            direction: "column",
            translateX: -50,
            translateY: -40,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: "#999",
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: theme.palette.primary[500],
                },
              },
            ],
          },
        ]}
      />
      {!isDashboard ? (
        <Box
          sx={{
            backgroundColor: theme.palette.primary[1000],
            color: theme.palette.secondary[200],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            borderRadius: "10px",
          }}
          width="100%"
          mt="1.5rem"
        >
          <FlexBetween>
            <Typography variant="h5">Recommended to focus on:</Typography>
            {bestSource.source}
            <Typography variant="h6">
              <FlexBetween>
                Total Employees: {bestSource.totalEmployees} | Male Count:{" "}
                {bestSource.maleCount} | Female Count: {bestSource.femaleCount}
              </FlexBetween>
            </Typography>
          </FlexBetween>
        </Box>
      ) : (
        []
      )}
    </Box>
  );
};

export default SourcesChart;
