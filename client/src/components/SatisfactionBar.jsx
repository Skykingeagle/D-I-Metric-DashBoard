import React, { useMemo } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { Box, useTheme } from "@mui/material";
import { useGetSatQuery } from "state/api";

const SatisfactionBar = ({ isDashboard = false }) => {
  const theme = useTheme();
  const { data, isLoading } = useGetSatQuery();
  console.log("data:", data);

  if (!data || isLoading) return "Loading...";

  return (
    <ResponsiveBar
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
              fontSize: "15px",
            },
          },
        },
        legends: {
          text: {
            fill: theme.palette.secondary[200],
          },
        },
        tooltip: {
          container: {
            color: theme.palette.primary.main,
          },
        },
      }}
      keys={["maleCount", "femaleCount", "satisfaction"]}
      indexBy="department"
      margin={
        isDashboard
          ? { top: 40, right: 80, bottom: 60, left: 50 }
          : { top: 50, right: 130, bottom: 50, left: 160 }
      }
      padding={0.3}
      groupMode="grouped"
      layout="horizontal"
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default SatisfactionBar;
