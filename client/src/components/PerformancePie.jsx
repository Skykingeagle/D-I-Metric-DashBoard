import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetPerformanceQuery } from "state/api";
import { ResponsivePie } from "@nivo/pie";


const PerformancePie = ({ isDashboard = false }) => {
  const theme = useTheme();
  const { data, isLoading } = useGetPerformanceQuery();
  console.log("data:", data);

  if (!data || isLoading) return "Loading...";
  
  return (
    <Box
      height={isDashboard ? "400px" : "100%"}
      width={undefined}
      minHeight={isDashboard ? "325px" : undefined}
      minWidth={isDashboard ? "325px" : undefined}
      position="relative"
    >
      <ResponsivePie
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
        margin={
          isDashboard
            ? { top: 40, right: 80, bottom: 60, left: 50 }
            : { top: 40, right: 100, bottom: 100, left: 80 }
        }
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={theme.palette.secondary[200]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        // legends={[
        //   {
        //     anchor: "bottom-right",
        //     direction: "column",
        //     justify: false,
        //     translateX: 0,
        //     translateY: 56,
        //     itemsSpacing: 10,
        //     itemWidth: 100,
        //     itemHeight: 18,
        //     itemTextColor: theme.palette.secondary[200],
        //     itemDirection: "left-to-right",
        //     itemOpacity: 1,
        //     symbolSize: 18,
        //     symbolShape: "circle",
        //     effects: [
        //       {
        //         on: "hover",
        //         style: {
        //           itemTextColor: theme.palette.primary[500],
        //         },
        //       },
        //     ],
        //   },
        // ]}
      />
    </Box>
  );
};

export default PerformancePie;
