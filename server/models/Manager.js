import mongoose from "mongoose";

const ManagerSchema = new mongoose.Schema({
  ManagerName: {
    type: String,
    required: true,
  },
  ManagerID: {
    type: Number,
    required: true,
  },
});

const Manager = mongoose.model("Manager", ManagerSchema);

export default Manager;