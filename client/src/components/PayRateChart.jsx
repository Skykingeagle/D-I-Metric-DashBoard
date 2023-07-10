import React from "react";
import { Box, useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { useGetPayRateQuery } from "state/api";

const PayRateChart = (isDashboard = false) => {
  const theme = useTheme();
  const { data, isLoading } = useGetPayRateQuery();
  console.log("data:", data);

  if (!data || isLoading) return "Loading...";

  return (
    <ResponsiveLine
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
        labels: {
          text: {
            fontSize: "15px",
          },
        },
      }}
      margin={
        isDashboard
          ? { top: 40, right: 80, bottom: 60, left: 50 }
          : { top: 50, right: 110, bottom: 50, left: 60 }
      }
      domain={[0, 70]}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "25",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Years",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: "value",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={true}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      enableArea={false}
      useMesh={true}
      legends={[
        {
          anchor: "top-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PayRateChart;
