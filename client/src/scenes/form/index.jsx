import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
} from "@mui/material";
import Header from "components/Header";
import { usePushFormMutation } from "state/api";

const RecruitmentForm = () => {
  const [submit, { isLoading }] = usePushFormMutation();
  

  const [formValues, setFormValues] = useState({
    EmpID: "",
    Employee_Name: "",
    DeptID: "",
    PayRate: "",
    PerfScore: "",
    PositionID: "",
    RecruitmentSourceID: "",
    GenderID: "",
    country: "",
    SpecialProjectsCount: "",
  });

  const resetForm = () => {
    setFormValues({
      EmpID: "",
      Employee_Name: "",
      DeptID: "",
      PayRate: "",
      PerfScore: "",
      PositionID: "",
      RecruitmentSourceID: "",
      GenderID: "",
      country: "",
      SpecialProjectsCount: "",
    });
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await submit(formValues);
      console.log(response.data); // Handling the response data here
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="EMPLOYEE FORM"
        subtitle="Enter custom employee details here"
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ width: "100%", mt: 3 }}
        >
          <TextField
            id="EmpID"
            name="EmpID"
            label="Employee ID"
            value={formValues.EmpID}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />

          <TextField
            id="Employee_Name"
            name="Employee_Name"
            label="Employee Name"
            value={formValues.Employee_Name}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="dept-select-label">Department ID*</InputLabel>
            <Select
              labelId="dept-select-label"
              id="DeptID"
              name="DeptID"
              value={formValues.DeptID}
              onChange={handleChange}
              required
            >
              <MenuItem value={1}>Admin Offices</MenuItem>
              <MenuItem value={6}>Sales</MenuItem>
              <MenuItem value={3}>IT/IS</MenuItem>
              <MenuItem value={5}>Production</MenuItem>
              <MenuItem value={2}>Executive Office</MenuItem>
              <MenuItem value={4}>Software Engineering</MenuItem>
            </Select>
          </FormControl>

          <TextField
            id="PayRate"
            name="PayRate"
            label="Pay Rate"
            value={formValues.PayRate}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />

          <TextField
            id="PerformanceScore"
            name="PerformanceScore"
            label="Performance Score"
            value={formValues.PerfScore}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="position-select-label">Position ID*</InputLabel>
            <Select
              labelId="position-select-label"
              id="PositionID"
              name="PositionID"
              value={formValues.PositionID}
              onChange={handleChange}
              required
            >
              <MenuItem value={1}>Accountant I</MenuItem>
              <MenuItem value={2}>Administrative Assistant</MenuItem>
              <MenuItem value={3}>Area Sales Manager</MenuItem>
              <MenuItem value={4}>BI Developer</MenuItem>
              <MenuItem value={5}>BI Director</MenuItem>
              <MenuItem value={6}>CIO</MenuItem>
              <MenuItem value={7}>Data Architect</MenuItem>
              <MenuItem value={8}>Database Administrator</MenuItem>
              <MenuItem value={9}>Data Analyst</MenuItem>
              <MenuItem value={10}>Director of Operations</MenuItem>
              <MenuItem value={11}>Director of Sales</MenuItem>
              <MenuItem value={12}>IT Director</MenuItem>
              <MenuItem value={13}>IT Manager</MenuItem>
              <MenuItem value={14}>IT Support</MenuItem>
              <MenuItem value={15}>Network Engineer</MenuItem>
              <MenuItem value={16}>President & CEO</MenuItem>
              <MenuItem value={18}>Production Manager</MenuItem>
              <MenuItem value={19}>Production Technician I</MenuItem>
              <MenuItem value={20}>Production Technician II</MenuItem>
              <MenuItem value={21}>Sales Manager</MenuItem>
              <MenuItem value={22}>Senior BI Developer</MenuItem>
              <MenuItem value={23}>Shared Services Manager</MenuItem>
              <MenuItem value={24}>Software Engineer</MenuItem>
              <MenuItem value={25}>Software Engineering Manager</MenuItem>
              <MenuItem value={26}>Sr. Accountant</MenuItem>
              <MenuItem value={27}>Sr. DBA</MenuItem>
              <MenuItem value={30}>Enterprise Architect</MenuItem>
              <MenuItem value={29}>Principal Data Architect</MenuItem>
              <MenuItem value={28}>Sr. Network Engineer</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="recruitment-source-select-label">
              Recruitment Source ID*
            </InputLabel>
            <Select
              labelId="recruitment-source-select-label"
              id="RecruitmentSourceID"
              name="RecruitmentSourceID"
              value={formValues.RecruitmentSourceID}
              onChange={handleChange}
              required
            >
              <MenuItem value={1}>Diversity Job Fair</MenuItem>
              <MenuItem value={2}>Website Banner Ads</MenuItem>
              <MenuItem value={3}>Internet Search</MenuItem>
              <MenuItem value={4}>Pay Per Click - Google</MenuItem>
              <MenuItem value={5}>
                Social Networks - Facebook Twitter etc
              </MenuItem>
              <MenuItem value={6}>Billboard</MenuItem>
              <MenuItem value={7}>Monster.com</MenuItem>
              <MenuItem value={8}>Newspager/Magazine</MenuItem>
              <MenuItem value={9}>Professional Society</MenuItem>
              <MenuItem value={10}>Other</MenuItem>
              <MenuItem value={11}>Employee Referral</MenuItem>
              <MenuItem value={12}>Indeed</MenuItem>
              <MenuItem value={13}>Search Engine - Google Bing Yahoo</MenuItem>
              <MenuItem value={14}>Glassdoor</MenuItem>
              <MenuItem value={15}>Vendor Referral</MenuItem>
              <MenuItem value={16}>MBTA ads</MenuItem>
              <MenuItem value={17}>Information Session</MenuItem>
              <MenuItem value={18}>Word of Mouth</MenuItem>
              <MenuItem value={19}>Pay Per Click</MenuItem>
              <MenuItem value={20}>On-campus Recruiting</MenuItem>
              <MenuItem value={21}>On-line Web application</MenuItem>
              <MenuItem value={22}>Careerbuilder</MenuItem>
              <MenuItem value={23}>Company Intranet - Partner</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="gender-select-label">Gender*</InputLabel>
            <Select
              labelId="gender-select-label"
              id="GenderID"
              name="GenderID"
              value={formValues.GenderID}
              onChange={handleChange}
              required
            >
              <MenuItem value={1}>M</MenuItem>
              <MenuItem value={0}>F</MenuItem>
            </Select>
          </FormControl>

          <TextField
            id="country"
            name="country"
            label="Country"
            value={formValues.country}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />

          <TextField
            id="SpecialProjectsCount"
            name="SpecialProjectsCount"
            label="Special Projects Count"
            value={formValues.SpecialProjectsCount}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <Box mb="1rem">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Submit
          </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RecruitmentForm;
