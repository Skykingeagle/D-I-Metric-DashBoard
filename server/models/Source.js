import mongoose from "mongoose";

const SourceSchema = new mongoose.Schema({
  RecruitmentSourceID: {
    type: Number,
    required: true,
  },
  RecruitmentSource: {
    type: String,
    required: true,
  },
});

const Source = mongoose.model("Source", SourceSchema);

export default Source;