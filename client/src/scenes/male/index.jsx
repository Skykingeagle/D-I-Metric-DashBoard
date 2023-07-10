import React from "react";
import { Box, useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import Header from "components/Header";
import { useGetPredMaleQuery } from "state/api";

const MalePred = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetPredMaleQuery();
  console.log("data:", data);

  if (!data || isLoading) return "Loading...";

  return (
    <Box m="1.5rem 2.5rem" height="75vh">
      <Header
        title="MALE PREDICTION"
        subtitle="Analyze and study Male ratio across time"
      />
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
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "30",
          max: "55",
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
    </Box>
  );
};

export default MalePred;
