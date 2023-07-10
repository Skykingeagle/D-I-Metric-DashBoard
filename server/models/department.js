import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema({
  DeptID: {
    type: Number,
    required: true,
  },
  Department: {
    type: String,
    required: true,
  },
  ManagerID: {
    type: Number,
    required: true,
  },
});

const Department = mongoose.model("Department", DepartmentSchema);

export default Department;