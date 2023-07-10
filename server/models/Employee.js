import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
  {
    Employee_Name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    EmpID: {
      type: Number,
      required: true,
      unique: true,
    },
    MarriedID: {
      type: Boolean,
    },
    MaritalStatusID: {
      type: Number,
    },
    GenderID: {
      type: Boolean,
      required: true,
    },
    EmpStatusID: {
      type: Number,
    },
    DeptID: {
      type: Number,
      required: true,
    },
    PerfScoreID: {
      type: Number,
    },
    PayRate: {
      type: Number,
      required: true,
    },
    PositionID: {
      type: Number,
      required: true,
    },
    RecruitmentSourceID: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    DOB: {
      type: Date,
    },
    Sex: {
      type: String,
    },
    MaritalDesc: {
      type: String,
    },
    DateofHire: {
      type: Date,
    },
    EmploymentStatus: {
      type: String,
    },
    ManagerID: {
      type: Number,
    },
    PerformanceScore: {
      type: String,
    },
    EngagementSurvey: {
      type: Number,
    },
    EmpSatisfaction: {
      type: Number,
    },
    SpecialProjectsCount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", EmployeeSchema);
export default Employee;
