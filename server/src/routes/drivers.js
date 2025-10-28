import express from "express";
import { 
  getDrivers, 
  createDriver, 
  updateDriver,
  deleteDriver,
  getDriverById 
} from "../controllers/driverController.js";

const router = express.Router();

// GET /api/drivers - Obtener todos los choferes
router.get("/", getDrivers);

// GET /api/drivers/:id - Obtener un chofer por ID
router.get("/:id", getDriverById);

// POST /api/drivers - Crear nuevo chofer
router.post("/", createDriver);

// PUT /api/drivers/:id - Actualizar chofer
router.put("/:id", updateDriver);

// DELETE /api/drivers/:id - Eliminar chofer
router.delete("/:id", deleteDriver);

export default router;
