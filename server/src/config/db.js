import mongoose from "mongoose";

/**
 * Conecta a MongoDB Atlas usando la URI del .env
 */
export const connectDB = async () => {
  try {
    // Configuración para MongoDB Atlas
    mongoose.set("strictQuery", true);
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "guiaDespacho",
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    
    console.log(`✅ Conectado exitosamente a MongoDB Atlas`);
    console.log(`📊 Base de datos: ${conn.connection.name}`);
    console.log(`🌐 Host: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error al conectar con MongoDB:`, error.message);
    process.exit(1);
  }
};
