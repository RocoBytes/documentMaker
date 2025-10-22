import express from "express";

const router = express.Router();

/**
 * GET /api/settings/company
 * Retorna información de la empresa (razón social, RUT, dirección, ciudad, actividad)
 * Lee de variables de entorno si existen, sino usa valores por defecto
 */
router.get("/company", (req, res) => {
  try {
    const companySettings = {
      name: process.env.COMPANY_NAME || "Cablex Latam SPA",
      rut: process.env.COMPANY_RUT || "77.967.372-3",
      address: process.env.COMPANY_ADDRESS || "Av. Lo Espejo 1221",
      city: process.env.COMPANY_CITY || "Santiago",
      activity: process.env.COMPANY_ACTIVITY || "Servicios / Telecomunicaciones"
    };

    res.json(companySettings);
  } catch (error) {
    console.error("Error al obtener configuración de empresa:", error);
    res.status(500).json({ error: "Error al obtener configuración de empresa" });
  }
});

export default router;
