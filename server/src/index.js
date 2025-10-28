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
import recipientsRouter from "./routes/recipients.js";
import driversRouter from "./routes/drivers.js";

// Cargar variables de entorno
dotenv.config();

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear aplicación Express
const app = express();
const PORT = process.env.PORT || 4000;

console.log("🔧 Configuración:");
console.log("   - PORT:", PORT);
console.log("   - NODE_ENV:", process.env.NODE_ENV || "development");
console.log("   - FRONTEND_URL:", process.env.FRONTEND_URL || "No configurado");

// Middlewares
// CORS - Permitir múltiples orígenes (desarrollo y producción)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONTEND_URL // URL de Vercel/Render (configurar en .env)
].filter(Boolean); // Eliminar valores undefined

app.use(cors({
  origin: function(origin, callback) {
    // Permitir requests sin origin (como mobile apps o curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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
app.use("/api/recipients", recipientsRouter);
app.use("/api/drivers", driversRouter);
app.use("/api/assets", assetsRouter);
app.use("/api/settings", settingsRouter);

// Aquí puedes agregar más rutas en el futuro
// app.use("/api/users", userRoutes);
// app.use("/api/products", productRoutes);

// Conectar a MongoDB Atlas y arrancar servidor
connectDB()
  .then(() => {
    app.locals.mongoose = { connection: { readyState: 1 } };
    
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
      console.log(`✅ Listo para recibir conexiones`);
    });

    // Manejo de errores del servidor
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`❌ Error: Puerto ${PORT} ya está en uso`);
      } else {
        console.error('❌ Error del servidor:', error);
      }
      process.exit(1);
    });
  })
  .catch((error) => {
    console.error('❌ Error al conectar a MongoDB:', error);
    console.error('El servidor no puede arrancar sin conexión a la base de datos');
    process.exit(1);
  });

// Manejo de señales para cierre graceful
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM recibido. Cerrando servidor...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('👋 SIGINT recibido. Cerrando servidor...');
  process.exit(0);
});
