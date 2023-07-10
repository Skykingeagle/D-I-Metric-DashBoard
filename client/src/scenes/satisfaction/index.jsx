import React from 'react'
import { Box } from '@mui/material';
import Header from 'components/Header';
import SatisfactionBar from "components/SatisfactionBar";


const Satisfaction = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="SATISFACTION LEVELS ACCROS THE ORGANIZATION"
        subtitle="View satisfaction levels across the organization"
      />
      <Box height="75vh">
        <SatisfactionBar />
      </Box>
    </Box>
  )
}

export default Satisfaction