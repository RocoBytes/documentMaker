# 🚀 Inicio Rápido - Deployment

## Opción Recomendada: Vercel + Render

### ⏱️ Tiempo estimado: 15 minutos

---

## 📦 PASO 1: Backend en Render (5 min)

1. **Ir a:** https://dashboard.render.com/
2. **Crear cuenta** o hacer login
3. Click en **"New +" → "Web Service"**
4. Conectar repositorio: **RocoBytes/documentMaker**
5. **Configurar:**
   ```
   Name: guia-despacho-backend
   Root Directory: server
   Build Command: npm install
   Start Command: npm start
   ```
6. **Variables de entorno** (Click en "Advanced"):
   ```
   MONGODB_URI = mongodb+srv://user:password@cablexlatam.uuzhzdx.mongodb.net/guiaDespacho
   PORT = 4000
   NODE_ENV = production
   ```
7. Click **"Create Web Service"**
8. **Copiar la URL** que te da Render (ejemplo: `https://guia-despacho-backend.onrender.com`)
9. **Probar:** Abrir `https://TU-URL.onrender.com/api/health`

---

## 🌐 PASO 2: Frontend en Vercel (5 min)

1. **Ir a:** https://vercel.com/new
2. **Importar** repositorio: **RocoBytes/documentMaker**
3. **Configurar:**
   ```
   Project Name: guia-despacho
   Framework: Vite
   Root Directory: client
   Build Command: npm run build
   Output Directory: dist
   ```
4. **Variables de entorno:**
   ```
   VITE_API_ORIGIN = https://guia-despacho-backend.onrender.com
   ```
   ⚠️ **Usar la URL que copiaste en PASO 1**
   
5. Click **"Deploy"**
6. **Copiar la URL** de Vercel (ejemplo: `https://guia-despacho.vercel.app`)

---

## 🔧 PASO 3: Actualizar CORS (3 min)

1. **Ir a Render Dashboard** → Tu servicio backend
2. **Environment** → Add **FRONTEND_URL**:
   ```
   FRONTEND_URL = https://guia-despacho.vercel.app
   ```
   ⚠️ **Usar la URL que copiaste en PASO 2**

3. El servicio se **re-desplegará automáticamente**

---

## ✅ PASO 4: Verificar (2 min)

1. **Abrir tu app:** `https://guia-despacho.vercel.app`
2. **Crear una guía de despacho de prueba**
3. **Verificar que se guarda correctamente**
4. **Imprimir y verificar que funciona el PDF**

---

## 🎯 URLs Finales

```
✅ Frontend: https://guia-despacho.vercel.app
✅ Backend:  https://guia-despacho-backend.onrender.com
✅ Database: MongoDB Atlas (ya configurado)
```

---

## 🔄 Deploys Automáticos

Cada vez que hagas **push a main**, se despliegan automáticamente:
- ✅ Frontend en Vercel
- ✅ Backend en Render

---

## ⚠️ Importante: MongoDB Atlas

Asegúrate de que MongoDB Atlas permite conexiones desde cualquier IP:

1. Ir a: https://cloud.mongodb.com/
2. **Network Access** → **Add IP Address**
3. Seleccionar: **"Allow access from anywhere" (0.0.0.0/0)**
4. Click **"Confirm"**

---

## 🐛 Problemas Comunes

### "Failed to fetch" o error CORS
- ✅ Verificar que `FRONTEND_URL` en Render sea correcto
- ✅ Verificar que `VITE_API_ORIGIN` en Vercel sea correcto

### Backend tarda mucho en responder (primera carga)
- ⚠️ Normal en plan gratuito de Render (se duerme después de 15 min)
- Primera carga tarda ~50 segundos
- Después funciona normal

### MongoDB no conecta
- ✅ Verificar whitelist en Atlas (0.0.0.0/0)
- ✅ Verificar `MONGODB_URI` en Render

---

## 📖 Documentación Completa

Ver **DEPLOYMENT_GUIDE.md** para:
- Despliegue manual
- Opciones avanzadas
- Troubleshooting detallado
- Opción alternativa (todo en Render)

---

## 🎉 ¡Listo!

Tu aplicación está en producción y lista para usar.
