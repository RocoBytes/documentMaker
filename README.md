# 🚀 MERN Starter - Proyecto Base

Plantilla limpia y lista para usar con **MongoDB + Express + React + Node.js**

---

## 📋 ¿Qué incluye este starter?

- ✅ **Backend**: Express + Mongoose (ES Modules)
- ✅ **Frontend**: React + Vite
- ✅ **CORS** configurado entre frontend y backend
- ✅ **Proxy** de Vite para peticiones a `/api`
- ✅ **Scripts unificados** con `concurrently`
- ✅ **Health check** endpoint: `/api/health`
- ✅ **Estructura preparada** para modelos, controladores y rutas
- ❌ **Sin ejemplos de CRUD** (comienza desde cero)

---

## 🛠️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** v16 o superior
- **MongoDB** (local o MongoDB Atlas)
- **npm** o **yarn**

---

## 📦 Instalación

### 1. Clonar o descargar el proyecto

```bash
cd guiaDespacho2.0
```

### 2. Instalar dependencias

Desde la **raíz del proyecto**:

```bash
# Instalar dependencias del servidor
cd server
npm install

# Instalar dependencias del cliente
cd ../client
npm install

# Instalar dependencias raíz (concurrently)
cd ..
npm install
```

---

## ⚙️ Configuración

### Variables de Entorno

El archivo `server/.env` ya está configurado por defecto:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/mernstarter
PORT=4000
```

#### 🔄 Cambiar a MongoDB Atlas

Si prefieres usar **MongoDB Atlas** en lugar de MongoDB local:

1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un cluster gratuito
3. Obtén tu **Connection String**
4. Reemplaza en `server/.env`:

```env
MONGODB_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/mernstarter
PORT=4000
```

---

## ▶️ Ejecutar el Proyecto

### Opción 1: Todo desde la raíz (Recomendado)

```bash
npm run dev
```

Este comando ejecuta simultáneamente:

- **Backend** en `http://localhost:4000`
- **Frontend** en `http://localhost:5173`

### Opción 2: Por separado

**Terminal 1 - Backend:**

```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd client
npm run dev
```

---

## 🌐 URLs de Acceso

| Servicio             | URL                              |
| -------------------- | -------------------------------- |
| **Frontend (React)** | http://localhost:5173            |
| **Backend (API)**    | http://localhost:4000            |
| **Health Check**     | http://localhost:4000/api/health |

---

## 📁 Estructura del Proyecto

```
guiaDespacho2.0/
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # Conexión a MongoDB
│   │   ├── models/                # Modelos de Mongoose (vacío)
│   │   ├── controllers/           # Lógica de negocio (vacío)
│   │   ├── routes/                # Rutas de API (vacío)
│   │   └── index.js               # Servidor Express
│   ├── .env                       # Variables de entorno
│   ├── .gitignore
│   └── package.json
├── client/
│   ├── src/
│   │   ├── App.jsx                # Componente principal
│   │   └── main.jsx               # Punto de entrada
│   ├── index.html
│   ├── vite.config.js             # Configuración con proxy
│   ├── .gitignore
│   └── package.json
├── .gitignore
├── package.json                   # Scripts raíz
└── README.md
```

---

## 🧪 Probar el Proyecto

### 1. Asegúrate de que MongoDB esté corriendo

**macOS (con Homebrew):**

```bash
brew services start mongodb-community
```

**Linux:**

```bash
sudo systemctl start mongod
```

**Windows:**
Ejecuta `mongod.exe` desde tu instalación de MongoDB.

### 2. Inicia el proyecto

```bash
npm run dev
```

### 3. Verifica el health check

Abre en tu navegador o usa `curl`:

```bash
curl http://localhost:4000/api/health
```

Deberías ver:

```json
{
  "ok": true,
  "status": "healthy",
  "timestamp": "2025-10-21T..."
}
```

### 4. Ver datos en MongoDB Compass

1. Abre **MongoDB Compass**
2. Conecta a: `mongodb://127.0.0.1:27017`
3. Busca la base de datos: `mernstarter`

---

## 📝 Scripts Disponibles

### Raíz del proyecto

```bash
npm run dev           # Ejecuta servidor y cliente simultáneamente
npm run dev:server    # Solo servidor backend
npm run dev:client    # Solo cliente frontend
```

### Servidor (`server/`)

```bash
npm run dev           # Modo desarrollo con nodemon (auto-reload)
npm start             # Modo producción
```

### Cliente (`client/`)

```bash
npm run dev           # Servidor de desarrollo Vite
npm run build         # Build para producción
npm run preview       # Preview del build de producción
```

---

## 🔨 Próximos Pasos

Ahora que tienes el proyecto base, puedes:

### 1. Crear tu primer modelo

**`server/src/models/User.js`:**

```javascript
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
```

### 2. Crear un controlador

**`server/src/controllers/userController.js`:**

```javascript
import { User } from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

### 3. Crear rutas

**`server/src/routes/users.js`:**

```javascript
import express from "express";
import { getUsers } from "../controllers/userController.js";

const router = express.Router();
router.get("/", getUsers);

export default router;
```

### 4. Registrar rutas en `index.js`

**`server/src/index.js`:**

```javascript
import userRoutes from "./routes/users.js";

// ... resto del código ...

app.use("/api/users", userRoutes);
```

---

## 🔒 CORS y Proxy

- **CORS** está configurado en el backend para permitir peticiones desde `http://localhost:5173`
- **Proxy** en Vite redirige todas las peticiones a `/api/*` hacia `http://localhost:4000`
- Esto significa que desde React puedes hacer `fetch("/api/users")` directamente

---

## 🐛 Solución de Problemas

### MongoDB no conecta

```bash
# Verifica que MongoDB esté corriendo
brew services list          # macOS
sudo systemctl status mongod # Linux
```

### Puerto ocupado

Si los puertos 4000 o 5173 están en uso:

- Cambia `PORT` en `server/.env`
- Cambia `server.port` en `client/vite.config.js`

### Error de CORS

Verifica que en `server/src/index.js` el origin sea:

```javascript
cors({ origin: "http://localhost:5173" });
```

---

## 📄 Licencia

ISC

---

**¡Tu proyecto MERN está listo! 🎉 Comienza a construir tu aplicación.**
