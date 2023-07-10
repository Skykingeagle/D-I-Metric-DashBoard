import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useGetDeptQuery } from "state/api";
import Header from "components/Header";

const DepartmentCard = ({
  _id,
  departmentName,
  females,
  males,
  totalEmployees,
  avgPayRate,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography variant="h3" component="div">
          Name: {departmentName}
        </Typography>
        <Typography sx={{ mb: "1.5rem", mt: "1.5rem" }} color={theme.palette.secondary[400]} variant="h4">
          Average Pay Rate: ${avgPayRate}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{ color: theme.palette.neutral[300] }}
      >
        <CardContent>
          <Typography color={theme.palette.secondary[400]}>
            Total Number of Employees: {totalEmployees}
          </Typography>
          <Typography color={theme.palette.secondary[400]}>
            Total Number of Males: {males}
          </Typography>
          <Typography color={theme.palette.secondary[400]}>
            Total Number of Females: {females}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Overview = () => {
  const { data, isLoading } = useGetDeptQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  // console.log("data:", data)

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="DEPARTMENT OVERVIEW"
        subtitle="Go through your Department Stats"
      />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(2, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.map(
            ({
              _id,
              departmentName,
              avgPayRate,
              totalEmployees,
              males,
              females,
            }) => (
              <DepartmentCard
                key={_id}
                _id={_id}
                departmentName={departmentName}
                avgPayRate={avgPayRate}
                totalEmployees={totalEmployees}
                males={males}
                females={females}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Overview;
