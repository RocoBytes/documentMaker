import mongoose from "mongoose";

const recipientSchema = new mongoose.Schema({
  destinatario: { type: String, required: true, trim: true },
  rut: { type: String, required: true, trim: true, unique: true },
  giro: { type: String, required: true, trim: true },
  direccion: { type: String, required: true, trim: true },
  ciudad: { type: String, required: true, trim: true },
}, { timestamps: true });

export default mongoose.model("Recipient", recipientSchema);
