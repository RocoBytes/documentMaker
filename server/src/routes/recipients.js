import express from "express";
import { 
  getRecipients, 
  createRecipient, 
  updateRecipient,
  deleteRecipient,
  getRecipientById 
} from "../controllers/recipientController.js";

const router = express.Router();

// GET /api/recipients - Obtener todos los destinatarios
router.get("/", getRecipients);

// GET /api/recipients/:id - Obtener un destinatario por ID
router.get("/:id", getRecipientById);

// POST /api/recipients - Crear nuevo destinatario
router.post("/", createRecipient);

// PUT /api/recipients/:id - Actualizar destinatario
router.put("/:id", updateRecipient);

// DELETE /api/recipients/:id - Eliminar destinatario
router.delete("/:id", deleteRecipient);

export default router;
