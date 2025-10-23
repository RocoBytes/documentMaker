# 🔧 Solución: Error "Failed to fetch" en Vercel

## ❌ Error

```
❌ Error: Failed to fetch
```

En: https://guia-despacho.vercel.app/documents

---

## 🎯 Causa Principal

La variable de entorno `VITE_API_ORIGIN` **NO está configurada en Vercel** o tiene un valor incorrecto.

---

## ✅ Solución Paso a Paso

### 1. Verificar Variable en Vercel

1. **Ir a:** https://vercel.com/dashboard
2. **Seleccionar** tu proyecto: `guia-despacho`
3. **Ir a:** Settings → Environment Variables
4. **Buscar:** `VITE_API_ORIGIN`

### 2. Configurar la Variable

Si **NO existe** o tiene un valor incorrecto:

1. Click en **"Add New"** (o "Edit" si existe)
2. **Variable Name:**
   ```
   VITE_API_ORIGIN
   ```
3. **Value:**
   ```
   https://guia-despacho-backend.onrender.com
   ```
   ⚠️ **SIN barra diagonal al final**
4. **Environment:** Seleccionar todas

   - ✅ Production
   - ✅ Preview
   - ✅ Development

5. Click **"Save"**

### 3. Re-desplegar en Vercel

Después de guardar la variable:

**Opción A: Redeploy desde Dashboard**

1. Ir a: **Deployments**
2. Click en el último deployment
3. Click en **"Redeploy"** (botón con 3 puntos)
4. Seleccionar: **"Use existing Build Cache: NO"**
5. Click **"Redeploy"**

**Opción B: Redeploy desde Git**

```bash
# Hacer un cambio mínimo para forzar redeploy
git commit --allow-empty -m "Trigger Vercel redeploy"
git push origin main
```

### 4. Esperar el Deploy

- Vercel tarda 2-3 minutos
- Ver progreso en: https://vercel.com/dashboard
- Esperar que aparezca ✅ "Ready"

---

## 🧪 Verificación

### Paso 1: Verificar en la Consola del Navegador

1. Abrir: https://guia-despacho.vercel.app
2. Abrir **DevTools**: `F12` o `Cmd+Option+I` (Mac)
3. Ir a la pestaña **Console**
4. Escribir:
   ```javascript
   console.log(import.meta.env.VITE_API_ORIGIN);
   ```
5. Debe mostrar:

   ```
   "https://guia-despacho-backend.onrender.com"
   ```

   Si muestra `undefined` → La variable NO está configurada

### Paso 2: Verificar Peticiones

1. Ir a la pestaña **Network** en DevTools
2. Filtrar por **Fetch/XHR**
3. Ir a: https://guia-despacho.vercel.app/documents
4. Las peticiones deben ir a:

   ```
   ✅ https://guia-despacho-backend.onrender.com/api/documents
   ```

   Si van a:

   ```
   ❌ https://guia-despacho.vercel.app/api/documents
   ```

   → La variable NO está funcionando

### Paso 3: Verificar Respuesta

1. Click en una petición en Network tab
2. Ver la pestaña **Response**
3. Debe mostrar JSON con datos:
   ```json
   {
     "data": [...],
     "total": 10,
     "page": 1
   }
   ```

---

## 🔄 Plan B: Si Persiste el Error

### Verificar CORS en Backend

1. **Ir a:** https://dashboard.render.com/
2. **Seleccionar:** guia-despacho-backend
3. **Ir a:** Environment
4. **Verificar que existe:**
   ```
   FRONTEND_URL = https://guia-despacho.vercel.app
   ```
5. Si no existe, **agregarla**
6. El servicio se re-desplegará automáticamente

### Verificar Backend Activo

El backend en Render (plan gratuito) se duerme después de 15 minutos.

1. **Primera petición:** Tarda ~50 segundos en despertar
2. **Solución:** Esperar y recargar la página
3. **Verificar:** https://guia-despacho-backend.onrender.com/api/health

Si responde, el backend está activo.

---

## 📋 Checklist de Verificación

- [ ] `VITE_API_ORIGIN` configurada en Vercel
- [ ] Valor correcto: `https://guia-despacho-backend.onrender.com`
- [ ] Sin barra diagonal al final
- [ ] Configurada para todos los environments
- [ ] Redeploy realizado
- [ ] Deploy completado (status: Ready)
- [ ] Variable visible en consola del navegador
- [ ] Peticiones van a la URL correcta
- [ ] `FRONTEND_URL` configurada en Render
- [ ] Backend responde en /api/health

---

## 🐛 Errores Comunes

### Error: Variable con barra diagonal

```
❌ https://guia-despacho-backend.onrender.com/
✅ https://guia-despacho-backend.onrender.com
```

### Error: Protocolo incorrecto

```
❌ http://guia-despacho-backend.onrender.com
✅ https://guia-despacho-backend.onrender.com
```

### Error: URL incorrecta

Verifica la URL real de tu backend en Render:

1. Ir a: https://dashboard.render.com/
2. Click en tu servicio
3. Copiar la URL que aparece arriba

---

## 💡 Cómo Verificar la URL Correcta de tu Backend

### En Render Dashboard:

```
1. Ir a: https://dashboard.render.com/
2. Click en: guia-despacho-backend
3. La URL aparece en la parte superior
4. Ejemplo: https://guia-despacho-backend.onrender.com
```

### Probar la URL:

```bash
curl https://TU-URL-BACKEND.onrender.com/api/health
```

Debe responder:

```json
{
  "ok": true,
  "status": "healthy",
  "message": "Servidor activo y conectado a MongoDB Atlas"
}
```

---

## 🎯 Resultado Esperado

Después de aplicar la solución:

1. **Abrir:** https://guia-despacho.vercel.app/documents
2. **Ver:** Listado de documentos cargando correctamente
3. **No ver:** Error "Failed to fetch"
4. **Console:** Sin errores de CORS o red
5. **Network:** Peticiones a Render exitosas (status 200)

---

## 📸 Screenshots de Referencia

### Variables de Entorno en Vercel:

```
┌─────────────────┬──────────────────────────────────────────┐
│ Name            │ Value                                    │
├─────────────────┼──────────────────────────────────────────┤
│ VITE_API_ORIGIN │ https://guia-despacho-backend.onrender   │
│                 │ .com                                     │
└─────────────────┴──────────────────────────────────────────┘
```

### Console debe mostrar:

```javascript
> import.meta.env.VITE_API_ORIGIN
< "https://guia-despacho-backend.onrender.com"
```

### Network tab debe mostrar:

```
Name: documents?page=1&limit=10&sort=-docNumber
URL: https://guia-despacho-backend.onrender.com/api/documents?...
Status: 200 OK
Type: xhr
```

---

## 🆘 Si Nada Funciona

### Opción 1: Verificar Logs en Vercel

```
1. Ir a: Vercel Dashboard → Tu proyecto
2. Click en: Deployments → Latest deployment
3. Click en: Build Logs
4. Buscar: Variables de entorno en los logs
5. Verificar que VITE_API_ORIGIN aparezca
```

### Opción 2: Verificar Logs en Render

```
1. Ir a: Render Dashboard → Tu servicio
2. Click en: Logs
3. Buscar errores de CORS
4. Buscar: "Error: Not allowed by CORS"
```

### Opción 3: Contactar Soporte

- Vercel: https://vercel.com/support
- Render: https://render.com/docs/support

---

## ✅ Resumen

**Problema:** `VITE_API_ORIGIN` no está configurada en Vercel

**Solución:**

1. Agregar variable en Vercel
2. Redeploy
3. Verificar en console del navegador
4. Probar la aplicación

**Tiempo:** 5-10 minutos (incluyendo deploy)

---

**🎉 Una vez completado, tu aplicación funcionará correctamente!**
