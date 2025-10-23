# 🚀 MERN Starter - Document Maker

Aplicación MERN para crear y gestionar guías de despacho con **MongoDB + Express + React + Node.js**

---

## 📋 ¿Qué incluye este proyecto?

- ✅ **Backend**: Express + Mongoose (ES Modules)
- ✅ **Frontend**: React + Vite
- ✅ **CORS** configurado entre frontend y backend
- ✅ **Proxy** de Vite para peticiones a `/api`
- ✅ **Scripts unificados** con `concurrently`
- ✅ **Health check** endpoint: `/api/health`
- ✅ **Document Maker**: Formulario completo para crear guías de despacho
- ✅ **API REST**: Endpoints para crear y consultar documentos

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
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/mernstarter
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
- Esto significa que desde React puedes hacer `fetch("/api/documents")` directamente

---

## �️ Rutas del Frontend (React Router)

El proyecto utiliza **React Router DOM** con las siguientes rutas:

| Ruta             | Componente              | Descripción                                                           |
| ---------------- | ----------------------- | --------------------------------------------------------------------- |
| `/`              | Redirect → `/documents` | Página principal redirige al listado                                  |
| `/documents`     | `DocumentsList`         | Lista de todos los documentos con búsqueda, ordenamiento y paginación |
| `/documents/new` | `DocumentMaker`         | Formulario para crear nueva guía de despacho                          |
| `/documents/:id` | `DocumentDetail`        | Vista de detalle de un documento específico                           |

### 🔗 Navegación

- Desde el **listado** (`/documents`) puedes:
  - Hacer clic en un **docNumber** para ver el detalle
  - Usar el botón **"+ Crear Documento"** para ir al formulario
- Desde el **detalle** (`/documents/:id`) puedes:
  - Usar el botón **"← Volver"** para regresar al listado
- Desde el **formulario** (`/documents/new`) puedes:
  - Después de crear con éxito, serás redirigido al listado automáticamente

---

## �📄 Document Maker - Guías de Despacho

### ✨ Características

El proyecto incluye un **Document Maker** completo para crear guías de despacho con los siguientes campos:

#### Información del Destinatario

- **Destinatario** \* (requerido)
- **RUT** \* (requerido)
- **Dirección** \* (requerido)
- **Ciudad** \* (requerido)
- **Giro** (opcional)

#### Información del Transporte

- **Chofer** (opcional)
- **RUT Chofer** (opcional)

#### Información del Destino

- **Destino** \* (requerido)
- **Ciudad** \* (requerido)
- **Centro de Negocios** (opcional)

### 🌐 Endpoints de la API

| Método | Endpoint             | Descripción                  |
| ------ | -------------------- | ---------------------------- |
| GET    | `/api/documents`     | Listar guías con paginación  |
| POST   | `/api/documents`     | Crear nueva guía de despacho |
| GET    | `/api/documents/:id` | Obtener guía por ID          |

#### Parámetros de consulta para GET /api/documents

- `page` - Número de página (default: 1)
- `limit` - Documentos por página (default: 10)
- `sort` - Ordenamiento (default: "-createdAt", opciones: "-docNumber", "docNumber", "-createdAt", "createdAt")
- `q` - Búsqueda por destinatario o RUT (opcional)

### 📝 Ejemplos de uso de la API

**Listar documentos (básico):**

```bash
curl http://localhost:4000/api/documents
```

**Listar documentos con paginación:**

```bash
# Página 1, 10 resultados por página
curl http://localhost:4000/api/documents?page=1&limit=10

# Página 2, 5 resultados por página
curl http://localhost:4000/api/documents?page=2&limit=5
```

**Listar documentos ordenados por número:**

```bash
# Orden descendente (más reciente primero)
curl http://localhost:4000/api/documents?sort=-docNumber

# Orden ascendente
curl http://localhost:4000/api/documents?sort=docNumber
```

**Buscar documentos:**

```bash
# Buscar por destinatario o RUT
curl "http://localhost:4000/api/documents?q=Sociedad%20Comercial"

# Combinar búsqueda con paginación y ordenamiento
curl "http://localhost:4000/api/documents?q=12.345&sort=-docNumber&page=1&limit=5"
```

**Crear un documento:**

```bash
curl -X POST http://localhost:4000/api/documents \
  -H "Content-Type: application/json" \
  -d '{
    "destinatario": "Empresa ABC",
    "rut": "12.345.678-9",
    "direccion": "Av. Principal 123",
    "ciudadDestinatario": "Santiago",
    "giro": "Comercio",
    "chofer": "Juan Pérez",
    "rutChofer": "98.765.432-1",
    "destino": "Bodega Central",
    "ciudadDestino": "Valparaíso",
    "centroDeNegocios": "Centro Logístico"
  }'
```

**Obtener un documento:**

```bash
curl http://localhost:4000/api/documents/<ID>
```

### 🧪 Probar la Aplicación

#### 📋 Ver listado de documentos

1. Asegúrate de que MongoDB esté corriendo
2. Ejecuta `npm run dev` desde la raíz del proyecto
3. Abre http://localhost:5173 en tu navegador (redirige automáticamente a `/documents`)
4. Verás el listado de documentos con:
   - **Búsqueda**: Escribe en el campo de búsqueda para filtrar por destinatario o RUT
   - **Ordenamiento**: Cambia el orden por número de documento o fecha de creación
   - **Paginación**: Navega entre páginas con los botones Anterior/Siguiente
   - **Límite**: Ajusta cuántos documentos ver por página (5, 10 o 20)

#### ➕ Crear nuevo documento

1. Desde el listado, haz clic en "➕ Nuevo Documento"
2. Completa el formulario con los datos requeridos (\*)
3. Haz clic en "💾 Guardar Documento"
4. Verás un mensaje de éxito con el ID y serás redirigido automáticamente

#### 👁️ Ver detalle de un documento

1. En el listado, haz clic en cualquier número de documento (columna "N°")
2. Verás todos los detalles organizados por secciones:
   - Información del destinatario
   - Información del transporte (si aplica)
   - Información del destino
   - Metadata (ID, fechas de creación y actualización)

### 🗄️ Ver documentos en MongoDB Compass

1. Abre **MongoDB Compass**
2. Conecta a: `mongodb://127.0.0.1:27017`
3. Selecciona la base de datos: `mernstarter`
4. Abre la colección: `documents`
5. Verás todos los documentos guardados con sus timestamps

### 📊 Estructura de un Documento en MongoDB

```javascript
{
  "_id": "ObjectId(...)",
  "docNumber": 1,                    // ✨ Número autoincremental único
  "destinatario": "Empresa ABC",
  "rut": "12.345.678-9",
  "direccion": "Av. Principal 123",
  "ciudadDestinatario": "Santiago",
  "giro": "Comercio",
  "chofer": "Juan Pérez",
  "rutChofer": "98.765.432-1",
  "destino": "Bodega Central",
  "ciudadDestino": "Valparaíso",
  "centroDeNegocios": "Centro Logístico",
  "createdAt": "2025-10-21T...",
  "updatedAt": "2025-10-21T..."
}
```

**Nota:** El campo `docNumber` se asigna automáticamente al crear cada documento, comenzando desde 1 y aumentando de forma secuencial (1, 2, 3, ...). Es único e inmutable.

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

### Error al guardar documentos

- Verifica que MongoDB esté corriendo
- Revisa que `MONGODB_URI` en `server/.env` sea correcta
- Asegúrate de completar todos los campos requeridos (\*)

---

## 📄 Licencia

ISC

---

**¡Tu Document Maker está listo! 🎉 Crea tus guías de despacho de forma fácil y rápida.**
