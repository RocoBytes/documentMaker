import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  chofer: { type: String, required: true, trim: true },
  rutChofer: { type: String, required: true, trim: true, unique: true },
}, { timestamps: true });

export default mongoose.model("Driver", driverSchema);
