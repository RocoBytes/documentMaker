# 🔧 Solución al Error de CORS en Producción

## 🚨 Error Detectado

```
Access to fetch at 'https://guia-despacho-backend.onrender.com/api/documents?page=1&limit=10&sort=-docNumber'
from origin 'https://guia-despacho.vercel.app' has been blocked by CORS policy:
The 'Access-Control-Allow-Origin' header has a value 'http://localhost:5173'
that is not equal to the supplied origin.
```

## 🔍 Causa del Problema

El backend en Render **NO** tiene configurada la variable de entorno `FRONTEND_URL`, por lo que solo acepta requests desde `localhost:5173` (desarrollo). Necesita aceptar requests desde tu frontend de Vercel.

---

## ✅ Solución: Configurar FRONTEND_URL en Render

### Paso 1: Ir al Dashboard de Render

1. Abre tu navegador y ve a: https://dashboard.render.com
2. Inicia sesión con tu cuenta
3. Busca y haz clic en el servicio **"guia-despacho-backend"**

---

### Paso 2: Acceder a Variables de Entorno

1. En la página del servicio, busca la pestaña **"Environment"** en el menú lateral izquierdo
2. Haz clic en **"Environment Variables"** o **"Environment"**
3. Verás la lista de variables de entorno actuales

---

### Paso 3: Agregar Variable FRONTEND_URL

1. Busca el botón **"Add Environment Variable"** o **"+ Add"**
2. Llena los campos:
   - **Key**: `FRONTEND_URL`
   - **Value**: `https://guia-despacho.vercel.app`
3. Haz clic en **"Save"** o **"Add"**

**IMPORTANTE**: Asegúrate de que la URL NO tenga `/` al final.

✅ Correcto: `https://guia-despacho.vercel.app`  
❌ Incorrecto: `https://guia-despacho.vercel.app/`

---

### Paso 4: Re-desplegar el Servicio

Render automáticamente re-desplegará tu servicio cuando agregues una variable de entorno nueva.

**Puedes verificar el progreso:**

1. Ve a la pestaña **"Logs"** o **"Events"**
2. Espera a ver el mensaje: `Your service is live 🎉`
3. Esto toma aproximadamente **2-3 minutos**

---

### Paso 5: Verificar la Configuración

Una vez que el servicio esté activo nuevamente, verifica que todo funcione:

#### 5.1 Verificar Health Check

Abre una nueva terminal y ejecuta:

```bash
curl https://guia-despacho-backend.onrender.com/api/health
```

Deberías ver:

```json
{
  "ok": true,
  "status": "healthy",
  "message": "Servidor activo y conectado a MongoDB Atlas",
  "database": "connected",
  "timestamp": "2025-10-23T..."
}
```

#### 5.2 Probar desde el Frontend

1. Abre tu navegador
2. Ve a: https://guia-despacho.vercel.app/documents
3. Abre la **Consola del Navegador** (F12 → Console)
4. **NO** deberías ver errores de CORS
5. La lista de documentos debería cargarse correctamente

---

## 📋 Variables de Entorno en Render (Resumen)

Después de completar los pasos, deberías tener estas variables configuradas:

| Variable       | Valor                              | Descripción                |
| -------------- | ---------------------------------- | -------------------------- |
| `NODE_ENV`     | `production`                       | Entorno de ejecución       |
| `PORT`         | `4000`                             | Puerto del servidor        |
| `MONGODB_URI`  | `mongodb+srv://usuario:...`        | Conexión a MongoDB Atlas   |
| `FRONTEND_URL` | `https://guia-despacho.vercel.app` | URL del frontend para CORS |

---

## 🔄 Verificación Completa de CORS

### Cómo funciona ahora:

El código en `server/src/index.js` acepta requests de estos orígenes:

```javascript
const allowedOrigins = [
  "http://localhost:5173", // Desarrollo local
  "http://localhost:5174", // Desarrollo alternativo
  process.env.FRONTEND_URL, // Producción (Vercel)
];
```

Cuando el usuario accede desde:

- **Localhost** → ✅ Permitido (desarrollo)
- **Vercel** → ✅ Permitido (producción con FRONTEND_URL configurado)
- **Otro dominio** → ❌ Bloqueado por CORS

---

## 🐛 Solución de Problemas Comunes

### Error 1: "Still seeing CORS error after adding variable"

**Solución:**

1. Verifica que la variable `FRONTEND_URL` esté escrita exactamente igual (mayúsculas/minúsculas)
2. Verifica que la URL **NO** tenga `/` al final
3. Espera a que el re-despliegue termine completamente (2-3 minutos)
4. Limpia el caché del navegador (Ctrl+Shift+R o Cmd+Shift+R)

---

### Error 2: "Service won't start after adding variable"

**Solución:**

1. Ve a la pestaña **"Logs"** en Render
2. Busca mensajes de error en rojo
3. Si ves errores de MongoDB, verifica la variable `MONGODB_URI`
4. Si el error persiste, contacta a soporte de Render

---

### Error 3: "Cannot read environment variables"

**Solución:**

1. Verifica que el archivo `server/src/index.js` tenga esta línea al inicio:
   ```javascript
   dotenv.config();
   ```
2. Verifica que `dotenv` esté instalado:
   ```bash
   npm list dotenv
   ```

---

## 📸 Capturas de Pantalla de Referencia

### Ubicación de Environment Variables en Render:

```
Dashboard → Tu Servicio → Environment (menú lateral) → Add Environment Variable
```

### Formulario para agregar variable:

```
┌─────────────────────────────────────┐
│ Add Environment Variable            │
├─────────────────────────────────────┤
│ Key:   FRONTEND_URL                 │
│ Value: https://guia-despacho.vercel.app │
│                                     │
│ [ Add ] [ Cancel ]                  │
└─────────────────────────────────────┘
```

---

## ✅ Checklist Final

Después de configurar `FRONTEND_URL`, verifica:

- [ ] Variable `FRONTEND_URL` agregada en Render
- [ ] Valor: `https://guia-despacho.vercel.app` (sin `/` al final)
- [ ] Servicio re-desplegado automáticamente
- [ ] Logs muestran "Your service is live 🎉"
- [ ] Health check responde: `curl https://guia-despacho-backend.onrender.com/api/health`
- [ ] Frontend carga sin errores de CORS
- [ ] Puedes crear, editar y ver documentos

---

## 🎯 Resultado Esperado

Después de completar estos pasos:

1. ✅ El backend acepta requests desde Vercel
2. ✅ No hay errores de CORS en la consola
3. ✅ La aplicación funciona completamente en producción
4. ✅ Puedes crear y visualizar guías de despacho

---

## 📚 Archivos Relacionados

- **Código de CORS**: `server/src/index.js` (líneas 24-41)
- **Configuración de Render**: `server/render.yaml`
- **Guía de Despliegue**: `DEPLOYMENT_GUIDE.md`
- **Guía de Variables Vercel**: `FIX_FAILED_TO_FETCH.md`

---

## 🆘 ¿Necesitas Ayuda?

Si después de seguir esta guía sigues teniendo problemas:

1. Verifica los logs de Render (pestaña "Logs")
2. Verifica la consola del navegador (F12)
3. Verifica la pestaña Network en DevTools
4. Contacta al desarrollador con capturas de pantalla de los errores

---

**Última actualización**: 23 de octubre de 2025  
**Autor**: GitHub Copilot  
**Proyecto**: Sistema de Guías de Despacho 2.0
