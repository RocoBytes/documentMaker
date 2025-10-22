# 🚀 Inicio Rápido - MongoDB Atlas

## ✅ Todo está configurado. Solo sigue estos pasos:

### 1️⃣ Iniciar el servidor

```bash
cd server
npm run dev
```

### 2️⃣ Verificar en consola que aparezca:

```
✅ Conectado exitosamente a MongoDB Atlas
📊 Base de datos: 
🌐 Host: 
🚀 Servidor corriendo en http://localhost:4000
```

### 3️⃣ Probar la API

Abre en tu navegador:

```
http://localhost:4000/api/health
```

Debe responder:

```json
{
  "ok": true,
  "status": "healthy",
  "message": "Servidor activo y conectado a MongoDB Atlas",
  "database": "connected"
}
```

---

## 🧭 Conectar con MongoDB Compass

1. Abre **MongoDB Compass 1.47.1**
2. Pega esta URI:
   ```
   ```
3. Haz clic en **"Connect"**
4. Explora tu base de datos **guiaDespacho** y sus colecciones

---

## 📁 Archivos modificados:

- ✅ `server/.env` - URI actualizada a MongoDB Atlas
- ✅ `server/src/config/db.js` - Configuración optimizada para Atlas
- ✅ `server/src/index.js` - Health check mejorado

---

## 📖 Documentación completa:

Ver `MONGODB_ATLAS_SETUP.md` para más detalles, troubleshooting y migración de datos.

---

**🎉 ¡Ya puedes usar tu aplicación con MongoDB Atlas!**
