import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { connectDB } from "./config/db.js";
import documentsRouter from "./routes/documents.js";
import assetsRouter from "./routes/assets.js";
import settingsRouter from "./routes/settings.js";

// Cargar variables de entorno
dotenv.config();

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear aplicación Express
const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));

// Crear carpeta uploads si no existe
const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("📁 Carpeta uploads creada:", uploadsDir);
}

// Servir archivos estáticos de uploads
app.use("/uploads", express.static(uploadsDir));

// Ruta de health check
app.get("/api/health", (req, res) => {
  const dbStatus = app.locals.mongoose?.connection?.readyState === 1 ? "connected" : "disconnected";
  res.json({ 
    ok: true, 
    status: "healthy",
    message: "Servidor activo y conectado a MongoDB Atlas",
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// Rutas de la API
app.use("/api/documents", documentsRouter);
app.use("/api/assets", assetsRouter);
app.use("/api/settings", settingsRouter);

// Aquí puedes agregar más rutas en el futuro
// app.use("/api/users", userRoutes);
// app.use("/api/products", productRoutes);

// Conectar a MongoDB Atlas y arrancar servidor
connectDB().then(() => {
  app.locals.mongoose = { connection: { readyState: 1 } };
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  });
});
