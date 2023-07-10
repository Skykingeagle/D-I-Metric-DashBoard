import React from 'react';
import { Box, useTheme } from '@mui/material';
import Header from 'components/Header';
import { DataGrid } from '@mui/x-data-grid';
import { useGetEmpQuery } from 'state/api';
import DataGridCustomToolbar from 'components/DataGridCustomToolbar';

const Employees = () => {
    const theme = useTheme();
    const {data, isLoading} = useGetEmpQuery();
    console.log("data:", data)


    const columns = [
      {
          field: "EmpID",
          headerName : "ID",
          flex: 1,
      },
      {
          field: "Employee_Name",
          headerName : "Name",
          flex: 0.5,
      },
      {
          field: "DepartmentName",
          headerName : "Department Name",
          flex: 0.5,
      },
      {
        field: "Position",
        headerName : "Position",
        flex: 1,
      },
      {
          field: "PayRate",
          headerName : "Pay Rate",
          flex: 0.5,
      },
      {
          field: "PerformanceScore",
          headerName : "Performance Score",
          flex: 0.5,
      },
      {
        field: "RecruitmentSource",
        headerName : "Recruitment Source",
        flex: 1,
    },
      {
          field: "Sex",
          headerName : "Gender",
          flex: 0.5,
      },
      {
          field: "country",
          headerName : "Country",
          flex: 0.5,
      }
  ]
    
  return (
    <Box m="1.5rem 2.5rem">
        <Header title="EMPLOYEE PAGE" subtitle="List of Employees" />
        <Box mt="40px" height="75vh" sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            backgroundColor: theme.palette.primary[1000]
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.primary[800],
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.primary[800],  
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}>
            <DataGrid 
                loading={isLoading || !data}
                getRowId={(row) => row._id}
                rows={data || []}
                columns={columns}
                components={{ Toolbar: DataGridCustomToolbar }}

            />
        </Box>
    </Box>
  )
}

export default Employees