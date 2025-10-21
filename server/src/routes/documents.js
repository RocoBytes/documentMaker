import express from "express";
import { 
  listDocuments, 
  createDocument, 
  getDocumentById 
} from "../controllers/documentController.js";

const router = express.Router();

// GET /api/documents - Listar documentos con paginación
router.get("/", listDocuments);

// POST /api/documents - Crear nuevo documento
router.post("/", createDocument);

// GET /api/documents/:id - Obtener documento por ID
router.get("/:id", getDocumentById);

export default router;
