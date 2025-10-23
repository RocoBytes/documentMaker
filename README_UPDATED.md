# 📦 Guía de Despacho 2.0

Sistema de gestión de guías de despacho interno desarrollado con stack MERN (MongoDB, Express, React, Node.js).

---

## 🚀 Demo

- **Frontend:** [https://guia-despacho.vercel.app](https://guia-despacho.vercel.app) _(Actualizar después del deploy)_
- **Backend API:** [https://guia-despacho-backend.onrender.com](https://guia-despacho-backend.onrender.com) _(Actualizar después del deploy)_

---

## ✨ Características

- ✅ Crear y gestionar guías de despacho
- ✅ Numeración automática y correlativa
- ✅ Generación de PDF para impresión
- ✅ Información de destinatario y traslado
- ✅ Referencias a documentos
- ✅ Detalle de items despachados
- ✅ Firmas digitales y recibo conforme
- ✅ Logo personalizable
- ✅ Base de datos en la nube (MongoDB Atlas)
- ✅ Responsive design

---

## 🛠️ Tecnologías

### Frontend
- **React** 19.1.1
- **React Router DOM** 7.9.4
- **Vite** 7.1.7
- CSS Modules

### Backend
- **Node.js** + **Express** 5.1.0
- **MongoDB** + **Mongoose** 8.19.2
- **Multer** 2.0.2 (upload de archivos)
- **dotenv** 17.2.3
- **CORS** 2.8.5

### Base de Datos
- **MongoDB Atlas** (cloud)

---

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn
- Cuenta en MongoDB Atlas (gratis)
- Git

---

## 🚀 Instalación y Desarrollo Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/RocoBytes/documentMaker.git
cd documentMaker
```

### 2. Configurar variables de entorno

#### Backend (server/.env)
```bash
cd server
cp .env.example .env
```

Editar `server/.env`:
```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/nombreDB
PORT=4000
FRONTEND_URL=http://localhost:5173
```

#### Frontend (client/.env - opcional en desarrollo)
```bash
cd ../client
cp .env.example .env
```

Por defecto usa el proxy de Vite, no necesitas configurar nada en desarrollo.

### 3. Instalar dependencias

#### Opción A: Instalar todo desde la raíz
```bash
cd ..
npm run install:all
```

#### Opción B: Instalar manualmente
```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 4. Iniciar en modo desarrollo

#### Opción A: Ambos servidores a la vez (recomendado)
```bash
# Desde la raíz del proyecto
npm run dev
```

Esto iniciará:
- Backend en `http://localhost:4000`
- Frontend en `http://localhost:5173`

#### Opción B: Por separado
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

---

## 📦 Build para Producción

### Frontend
```bash
cd client
npm run build
```
Los archivos se generan en `client/dist/`

### Backend
```bash
cd server
npm start
```

---

## 🚀 Deployment

### Guía Rápida (15 minutos)
Ver **[DEPLOYMENT_QUICKSTART.md](./DEPLOYMENT_QUICKSTART.md)**

### Guía Completa
Ver **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**

### Opciones de Hosting

#### Opción 1: Vercel + Render (Recomendado)
- ✅ Frontend en Vercel (gratis)
- ✅ Backend en Render (gratis)
- ✅ SSL automático
- ✅ Deploys automáticos

#### Opción 2: Todo en Render
- ✅ Frontend y Backend en Render
- ✅ Una sola plataforma

---

## 🗄️ Base de Datos

### MongoDB Atlas
Ver **[MONGODB_ATLAS_SETUP.md](./MONGODB_ATLAS_SETUP.md)** para configuración completa.

### Colecciones

| Colección | Descripción |
|-----------|-------------|
| `documents` | Guías de despacho |
| `counters` | Contadores para numeración correlativa |

---

## 📁 Estructura del Proyecto

```
guiaDespacho2.0/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── pages/         # Páginas de la aplicación
│   │   │   ├── DocumentsList.jsx
│   │   │   ├── DocumentMaker.jsx
│   │   │   ├── DocumentDetail.jsx
│   │   │   └── DocumentPrint.jsx
│   │   ├── styles/        # Estilos CSS
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json        # Config para Vercel
│
├── server/                # Backend Node.js/Express
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js      # Conexión MongoDB
│   │   ├── models/
│   │   │   ├── Document.js
│   │   │   └── Counter.js
│   │   ├── routes/
│   │   │   ├── documents.js
│   │   │   ├── assets.js
│   │   │   └── settings.js
│   │   ├── controllers/
│   │   └── index.js       # Servidor Express
│   ├── uploads/           # Logo de empresa
│   ├── package.json
│   ├── render.yaml        # Config para Render
│   └── .env               # Variables de entorno
│
├── package.json           # Scripts raíz
├── DEPLOYMENT_GUIDE.md    # Guía completa de deployment
├── DEPLOYMENT_QUICKSTART.md # Guía rápida
└── MONGODB_ATLAS_SETUP.md # Setup de MongoDB Atlas
```

---

## 🔧 Scripts Disponibles

### Raíz del proyecto
```bash
npm run dev              # Iniciar frontend y backend
npm run dev:server       # Solo backend
npm run dev:client       # Solo frontend
```

### Backend (server/)
```bash
npm run dev              # Desarrollo con nodemon
npm start                # Producción
```

### Frontend (client/)
```bash
npm run dev              # Desarrollo con Vite
npm run build            # Build para producción
npm run preview          # Preview del build
```

---

## 🔐 Variables de Entorno

### Backend
```env
MONGODB_URI=mongodb+srv://...
PORT=4000
NODE_ENV=production
FRONTEND_URL=https://tu-app.vercel.app
```

### Frontend
```env
VITE_API_ORIGIN=https://tu-backend.onrender.com
```

---

## 🧪 Testing

```bash
# Backend
cd server
npm test

# Frontend
cd client
npm test
```

---

## 🐛 Troubleshooting

### Error de conexión CORS
1. Verificar `FRONTEND_URL` en backend
2. Verificar `VITE_API_ORIGIN` en frontend
3. Ver [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

### MongoDB no conecta
1. Verificar whitelist en Atlas (0.0.0.0/0)
2. Verificar credenciales en `MONGODB_URI`
3. Ver [MONGODB_ATLAS_SETUP.md](./MONGODB_ATLAS_SETUP.md)

### Backend se duerme (Render gratuito)
- Es normal, se reactiva en ~50 segundos
- Considerar plan de pago o servicio keep-alive

---

## 📖 Documentación

- [Guía de Deployment](./DEPLOYMENT_GUIDE.md)
- [Inicio Rápido Deployment](./DEPLOYMENT_QUICKSTART.md)
- [Setup MongoDB Atlas](./MONGODB_ATLAS_SETUP.md)
- [Setup de Logo](./LOGO_SETUP.md)
- [Implementación de Firmas](./SIGNATURES_IMPLEMENTATION.md)

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 📝 Licencia

ISC

---

## 👨‍💻 Autor

**Cablex Latam SPA**
- Email: intercambio.cablexlatam@docele.cl

---

## 🙏 Agradecimientos

- MongoDB Atlas por hosting de base de datos
- Vercel por hosting de frontend
- Render por hosting de backend

---

## 📈 Roadmap

- [ ] Sistema de usuarios y autenticación
- [ ] Roles y permisos
- [ ] Exportación a Excel
- [ ] Dashboard con estadísticas
- [ ] API REST documentada (Swagger)
- [ ] Tests automatizados
- [ ] CI/CD con GitHub Actions

---

**⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub!**
