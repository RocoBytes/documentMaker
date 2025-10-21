import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db.js";

// Cargar variables de entorno
dotenv.config();

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

// Ruta de health check
app.get("/api/health", (req, res) => {
  res.json({ 
    ok: true, 
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

// Aquí puedes agregar más rutas en el futuro
// app.use("/api/users", userRoutes);
// app.use("/api/products", productRoutes);

// Conectar a MongoDB y arrancar servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
});
