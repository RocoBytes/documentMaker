# 🚀 Guía de Despliegue - Guía de Despacho 2.0

Esta guía te muestra cómo desplegar tu aplicación MERN a producción.

---

## 📋 Tabla de Contenidos

1. [Opción 1: Frontend en Vercel + Backend en Render](#opción-1-frontend-en-vercel--backend-en-render-recomendado)
2. [Opción 2: Todo en Render](#opción-2-todo-en-render)
3. [Preparación Previa](#preparación-previa)
4. [Variables de Entorno](#variables-de-entorno)
5. [Troubleshooting](#troubleshooting)

---

## ✅ Preparación Previa

Antes de desplegar, asegúrate de tener:

- [x] MongoDB Atlas configurado y funcionando
- [x] Repositorio Git creado (ya lo tienes en GitHub)
- [x] Cuenta en [Vercel](https://vercel.com) (gratis)
- [x] Cuenta en [Render](https://render.com) (gratis)

---

## 🎯 Opción 1: Frontend en Vercel + Backend en Render (Recomendado)

Esta es la opción **MÁS POPULAR** y **FÁCIL DE MANTENER**.

### ✨ Ventajas:

- ✅ Vercel es el mejor hosting para React/Vite
- ✅ Render es excelente para Node.js/Express
- ✅ Ambos tienen planes gratuitos generosos
- ✅ Deploys automáticos desde Git
- ✅ SSL/HTTPS incluido gratis

---

## 🔷 PASO 1: Desplegar Backend en Render

### 1.1 Preparar el Backend

Primero, vamos a crear un archivo de configuración para Render:

**Crear `server/render.yaml`:**

```yaml
services:
  - type: web
    name: guia-despacho-backend
    env: node
    region: oregon
    plan: free
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: MONGODB_URI
        sync: false
      - key: PORT
        value: 4000
```

### 1.2 Actualizar server/src/index.js para CORS

El backend debe aceptar peticiones desde el dominio de Vercel:

```javascript
// Actualizar la configuración de CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://tu-app.vercel.app", // Añadir después del deploy de Vercel
    ],
    credentials: true,
  })
);
```

### 1.3 Desplegar en Render

1. **Ve a [Render Dashboard](https://dashboard.render.com/)**

2. **Haz clic en "New +" → "Web Service"**

3. **Conecta tu repositorio de GitHub:**

   - Selecciona `documentMaker` (RocoBytes/documentMaker)
   - Haz clic en "Connect"

4. **Configuración del servicio:**

   ```
   Name: guia-despacho-backend
   Region: Oregon (US West)
   Branch: main
   Root Directory: server
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   Plan: Free
   ```

5. **Variables de Entorno:**
   Haz clic en "Advanced" → "Add Environment Variable":

   ```
   MONGODB_URI=mongodb+srv://user:password@cablexlatam.uuzhzdx.mongodb.net/guiaDespacho
   PORT=4000
   NODE_ENV=production
   ```

6. **Haz clic en "Create Web Service"**

7. **Espera a que termine el deploy** (3-5 minutos)

8. **Copia la URL de tu backend:**

   ```
   https://guia-despacho-backend.onrender.com
   ```

9. **Prueba tu backend:**

   ```
   https://guia-despacho-backend.onrender.com/api/health
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

## 🔷 PASO 2: Desplegar Frontend en Vercel

### 2.1 Preparar el Frontend

**Crear `client/.env.production`:**

```env
VITE_API_ORIGIN=https://guia-despacho-backend.onrender.com
```

### 2.2 Actualizar vite.config.js

El proxy solo funciona en desarrollo, en producción usaremos VITE_API_ORIGIN:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:4000",
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
```

### 2.3 Actualizar código para usar VITE_API_ORIGIN en producción

En los archivos donde haces fetch, asegúrate de usar la variable de entorno:

**Ejemplo en `client/src/pages/DocumentsList.jsx`:**

```javascript
const API_BASE = import.meta.env.VITE_API_ORIGIN || "";

// Usar en tus llamadas:
const response = await fetch(`${API_BASE}/api/documents`);
```

**Ya tienes esto configurado en `DocumentPrint.jsx`**, ahora asegúrate de usarlo en todos los fetch.

### 2.4 Desplegar en Vercel

#### Opción A: Desde la Web (Más Fácil)

1. **Ve a [Vercel Dashboard](https://vercel.com/new)**

2. **Importa tu proyecto:**

   - Haz clic en "Import Git Repository"
   - Selecciona `RocoBytes/documentMaker`
   - Haz clic en "Import"

3. **Configuración del proyecto:**

   ```
   Project Name: guia-despacho
   Framework Preset: Vite
   Root Directory: client
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Variables de Entorno:**
   Haz clic en "Environment Variables" y añade:

   ```
   VITE_API_ORIGIN=https://guia-despacho-backend.onrender.com
   ```

5. **Haz clic en "Deploy"**

6. **Espera a que termine el deploy** (2-3 minutos)

7. **Copia la URL de tu frontend:**
   ```
   https://guia-despacho.vercel.app
   ```

#### Opción B: Desde la Terminal

```bash
# Instalar Vercel CLI
npm install -g vercel

# Ir al directorio del cliente
cd client

# Login en Vercel
vercel login

# Desplegar
vercel

# Seguir las instrucciones:
# - Set up and deploy? Yes
# - Which scope? Tu usuario
# - Link to existing project? No
# - Project name? guia-despacho
# - In which directory? ./
# - Override settings? No

# Para producción:
vercel --prod
```

### 2.5 Actualizar CORS en el Backend

Ahora que tienes la URL de Vercel, actualiza el CORS en `server/src/index.js`:

```javascript
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://guia-despacho.vercel.app", // Tu URL real de Vercel
    ],
    credentials: true,
  })
);
```

Haz commit y push, Render se re-desplegará automáticamente.

---

## 🎯 Opción 2: Todo en Render

Si prefieres tener todo en una sola plataforma, puedes desplegar ambos en Render.

### Ventajas:

- ✅ Todo en un solo lugar
- ✅ Fácil de administrar
- ✅ Variables de entorno centralizadas

### Desventajas:

- ⚠️ El plan gratuito tiene límites de 750 horas/mes
- ⚠️ Los servicios se duermen después de 15 min de inactividad
- ⚠️ Vercel es más rápido para el frontend

---

### PASO 1: Crear Static Site para el Frontend

1. **Ve a [Render Dashboard](https://dashboard.render.com/)**

2. **Haz clic en "New +" → "Static Site"**

3. **Conecta tu repositorio y configura:**

   ```
   Name: guia-despacho-frontend
   Branch: main
   Root Directory: client
   Build Command: npm install && npm run build
   Publish Directory: client/dist
   ```

4. **Variables de Entorno:**

   ```
   VITE_API_ORIGIN=https://guia-despacho-backend.onrender.com
   ```

5. **Haz clic en "Create Static Site"**

### PASO 2: Configurar el Backend (igual que Opción 1)

Sigue los pasos de "PASO 1: Desplegar Backend en Render" de la Opción 1.

### PASO 3: Actualizar CORS

```javascript
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://guia-despacho-frontend.onrender.com", // Tu URL de Render
    ],
    credentials: true,
  })
);
```

---

## 🔐 Variables de Entorno

### Backend (Render):

```env
MONGODB_URI=mongodb+srv://root:CablexLatam2025@cablexlatam.uuzhzdx.mongodb.net/guiaDespacho
PORT=4000
NODE_ENV=production
```

### Frontend (Vercel o Render):

```env
VITE_API_ORIGIN=https://guia-despacho-backend.onrender.com
```

---

## 📝 Checklist de Deployment

### Antes del Deploy:

- [ ] MongoDB Atlas configurado y accesible
- [ ] Whitelist de IPs en Atlas: `0.0.0.0/0` (Allow from anywhere)
- [ ] Variables de entorno documentadas
- [ ] CORS configurado correctamente
- [ ] Código commiteado y pusheado a GitHub

### Después del Deploy Backend:

- [ ] Backend desplegado en Render
- [ ] URL del backend copiada
- [ ] `/api/health` responde correctamente
- [ ] MongoDB se conecta sin errores

### Después del Deploy Frontend:

- [ ] Frontend desplegado en Vercel/Render
- [ ] Variable `VITE_API_ORIGIN` configurada
- [ ] CORS actualizado con la URL del frontend
- [ ] Aplicación funciona end-to-end

---

## 🔄 Deploys Automáticos

Ambas plataformas soportan **deploys automáticos**:

### En Render:

- ✅ Cada push a `main` → deploy automático
- Ver logs en tiempo real en el dashboard

### En Vercel:

- ✅ Cada push a cualquier rama → preview deploy
- ✅ Cada push a `main` → production deploy
- Ver logs en el dashboard

---

## 🐛 Troubleshooting

### Error: "Failed to fetch" o CORS

**Problema:** El frontend no puede comunicarse con el backend.

**Solución:**

1. Verifica que `VITE_API_ORIGIN` esté configurado en Vercel
2. Verifica que el CORS en el backend incluya la URL de Vercel
3. Asegúrate de que el backend esté corriendo (visita `/api/health`)

### Error: "MongoServerSelectionError"

**Problema:** El backend no se puede conectar a MongoDB Atlas.

**Solución:**

1. Ve a MongoDB Atlas → Network Access
2. Añade `0.0.0.0/0` a la whitelist (permitir desde cualquier IP)
3. Verifica que `MONGODB_URI` en Render sea correcto

### Backend se duerme (Plan gratuito de Render)

**Problema:** El backend tarda 50 segundos en responder la primera vez.

**Solución:**

- Es normal en el plan gratuito de Render
- Opciones:
  1. Upgrade a plan de pago ($7/mes)
  2. Usar un servicio de "keep-alive" (ping cada 14 min)
  3. Avisar a los usuarios que la primera carga puede ser lenta

### Imágenes/Logo no se cargan

**Problema:** La carpeta `uploads/` no se sube a Git.

**Solución:**

1. Sube las imágenes manualmente via FTP/SSH
2. O mejor: usa un servicio de almacenamiento como:
   - Cloudinary (recomendado)
   - AWS S3
   - Google Cloud Storage

---

## 🔗 URLs Finales

Después del deploy, tendrás:

```
Frontend:  https://guia-despacho.vercel.app
Backend:   https://guia-despacho-backend.onrender.com
Database:  MongoDB Atlas (ya configurado)
```

---

## 📚 Recursos Adicionales

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [MongoDB Atlas Whitelist IPs](https://www.mongodb.com/docs/atlas/security/ip-access-list/)

---

## 💡 Recomendaciones

### Para Producción:

1. **Dominio personalizado:**

   - Vercel: Configurar dominio custom (gratis)
   - Render: Configurar dominio custom (gratis)

2. **Monitoreo:**

   - Usar Vercel Analytics
   - Usar Render Metrics
   - Configurar alertas de errores

3. **Backups:**

   - MongoDB Atlas hace backups automáticos
   - Exporta datos regularmente con `mongodump`

4. **Seguridad:**
   - Rotar contraseñas de MongoDB regularmente
   - No compartir `.env` en código
   - Usar secretos en vez de variables de entorno para datos sensibles

---

## ✅ Próximos Pasos

1. [ ] Desplegar backend en Render
2. [ ] Desplegar frontend en Vercel
3. [ ] Configurar dominio personalizado (opcional)
4. [ ] Configurar analytics (opcional)
5. [ ] Documentar las URLs en el README

---

**🎉 ¡Tu aplicación está lista para producción!**

Cualquier push a `main` desplegará automáticamente los cambios.
