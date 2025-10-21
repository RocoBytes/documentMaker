import mongoose from "mongoose";

/**
 * Schema para manejar contadores autoincrementales
 * Se usa para generar números de secuencia únicos (ej: docNumber)
 */
const counterSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  seq: {
    type: Number,
    default: 0
  }
});

const Counter = mongoose.model("Counter", counterSchema);

export default Counter;
