import mongoose from "mongoose";
import Counter from "./Counter.js";

const documentSchema = new mongoose.Schema(
  {
    docNumber: {
      type: Number,
      unique: true,
      index: true
    },
    destinatario: {
      type: String,
      required: [true, "Destinatario es requerido"],
      trim: true
    },
    rut: {
      type: String,
      required: [true, "RUT es requerido"],
      trim: true
    },
    direccion: {
      type: String,
      required: [true, "Dirección es requerida"],
      trim: true
    },
    ciudadDestinatario: {
      type: String,
      required: [true, "Ciudad del destinatario es requerida"],
      trim: true
    },
    giro: {
      type: String,
      trim: true
    },
    chofer: {
      type: String,
      trim: true
    },
    rutChofer: {
      type: String,
      trim: true
    },
    destino: {
      type: String,
      required: [true, "Destino es requerido"],
      trim: true
    },
    ciudadDestino: {
      type: String,
      required: [true, "Ciudad de destino es requerida"],
      trim: true
    },
    centroDeNegocios: {
      type: String,
      trim: true
    },
    referencias: {
      type: [{
        documentoReferencia: { type: String, trim: true, default: "" },
        nroDocto: { type: String, trim: true, default: "" },
        fecha: { type: String, trim: true, default: "" },
        nroSAP: { type: String, trim: true, default: "" }
      }],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length <= 3,
        message: "Se permiten como máximo 3 documentos de referencia."
      },
      default: [{}, {}, {}]
    },
    items: {
      type: [{
        codigoItem: { type: String, trim: true, default: "" },
        detalle: { type: String, trim: true, default: "" },
        cantidad: { type: Number, default: 0, min: 0 }
      }],
      default: []
    },
    totalCantidad: {
      type: Number,
      default: 0,
      min: 0
    },
    observaciones: {
      type: String,
      trim: true,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

// Hook pre-save para calcular totalCantidad
documentSchema.pre("save", function (next) {
  // Calcular suma de cantidades de items
  const sum = Array.isArray(this.items)
    ? this.items.reduce((acc, item) => acc + (Number(item.cantidad) || 0), 0)
    : 0;
  this.totalCantidad = sum;
  next();
});

// Hook pre-save para asignar docNumber automáticamente
documentSchema.pre("save", async function (next) {
  // Solo asignar docNumber si es un documento nuevo y no tiene docNumber
  if (this.isNew && !this.docNumber) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { _id: "documents" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.docNumber = counter.seq;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const Document = mongoose.model("Document", documentSchema);

export default Document;
