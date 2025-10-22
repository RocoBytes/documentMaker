import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const router = express.Router();

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar carpeta de uploads
const uploadsDir = path.join(__dirname, "..", "..", "uploads");

// Crear carpeta uploads si no existe
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("📁 Carpeta uploads creada:", uploadsDir);
}

// Configurar multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Siempre guardar como logo.png (sobrescribe el anterior)
    cb(null, "logo.png");
  }
});

// Filtro para validar solo archivos PNG
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten archivos PNG"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024 // Límite de 2MB
  }
});

/**
 * POST /api/assets/logo
 * Sube un logo en formato PNG
 */
router.post("/logo", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "No se recibió ningún archivo"
      });
    }

    res.status(200).json({
      message: "Logo subido exitosamente",
      url: "/uploads/logo.png",
      filename: req.file.filename,
      size: req.file.size
    });
  } catch (error) {
    console.error("Error al subir logo:", error);
    res.status(500).json({
      error: "Error al subir el logo",
      details: error.message
    });
  }
});

// Manejo de errores de multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        error: "El archivo es demasiado grande. Máximo 2MB."
      });
    }
    return res.status(400).json({
      error: "Error al procesar el archivo",
      details: error.message
    });
  }
  
  if (error) {
    return res.status(400).json({
      error: error.message
    });
  }
  
  next();
});

export default router;
