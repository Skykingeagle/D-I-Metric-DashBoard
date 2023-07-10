import mongoose from "mongoose";

const PositionSchema = new mongoose.Schema({
  PositionID: {
    type: Number,
    required: true,
  },
  Position: {
    type: String,
    required: true,
  },
});

const Position = mongoose.model("Position", PositionSchema);

export default Position;