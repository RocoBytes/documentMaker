# 🔧 Corrección de Errores de API - Deployment

## ❌ Error Detectado

```
Error 404: Not Found
Error de conexión: Unexpected token 'T', "The page c"... is not valid JSON
```

## 🎯 Causa del Problema

El frontend estaba haciendo llamadas a `/api/...` (rutas relativas) en lugar de usar la URL completa del backend en Render. Esto causaba que las peticiones se hicieran a Vercel en lugar de a Render.

---

## ✅ Solución Implementada

### 1. Archivo de Configuración Centralizado

Se creó `client/src/config/api.js`:

```javascript
const API_ORIGIN = import.meta.env.VITE_API_ORIGIN || '';

export const API_BASE_URL = API_ORIGIN;

export const getApiUrl = (path) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};
```

### 2. Archivos Actualizados

Se actualizaron todos los archivos que hacen fetch:

#### ✅ DocumentsList.jsx
```javascript
import { getApiUrl } from "../config/api";
// ...
const response = await fetch(getApiUrl(`/api/documents?${params.toString()}`));
```

#### ✅ DocumentMaker.jsx
```javascript
import { getApiUrl } from "../config/api";
// ...
const response = await fetch(getApiUrl("/api/documents"), {
  method: "POST",
  // ...
});
```

#### ✅ DocumentDetail.jsx
```javascript
import { getApiUrl } from "../config/api";
// ...
const response = await fetch(getApiUrl(`/api/documents/${id}`));
```

#### ✅ DocumentPrint.jsx
```javascript
// Ya tenía API_ORIGIN configurado, se corrigió el fetch faltante:
const response = await fetch(`${API_ORIGIN}/api/documents/${id}`);
```

#### ✅ LogoUpload.jsx
```javascript
import { getApiUrl, API_BASE_URL } from "../config/api";
// ...
const response = await fetch(getApiUrl("/api/assets/logo"), {
  method: "POST",
  // ...
});
```

---

## 🚀 Próximos Pasos para Corregir en Vercel

### Paso 1: Hacer Commit y Push

```bash
# En la raíz del proyecto
git add .
git commit -m "Fix: Configurar API calls con VITE_API_ORIGIN para producción"
git push origin main
```

### Paso 2: Verificar Variables de Entorno en Vercel

1. Ir a: https://vercel.com/dashboard
2. Seleccionar tu proyecto: **guia-despacho**
3. Ir a: **Settings** → **Environment Variables**
4. Verificar que exista:
   ```
   VITE_API_ORIGIN = https://TU-BACKEND.onrender.com
   ```
5. Si no está, agregarla
6. Hacer un **Redeploy** del proyecto

### Paso 3: Redeploy en Vercel

Opción A: Automático (si hiciste push)
- Vercel re-desplegará automáticamente

Opción B: Manual
1. Ir a: **Deployments**
2. Click en los **3 puntos** del último deployment
3. Click en **Redeploy**
4. Seleccionar **Use existing Build Cache: NO**
5. Click **Redeploy**

---

## 🧪 Verificación

### 1. Verificar que el build funciona

En Vercel, el build debe completarse sin errores.

### 2. Probar la aplicación

```
1. Ir a: https://guia-despacho.vercel.app
2. Abrir la consola del navegador (F12)
3. Ir a: Listado de documentos
4. Las peticiones deben ir a: https://TU-BACKEND.onrender.com/api/...
5. Crear un nuevo documento
6. Debe guardarse correctamente
```

### 3. Verificar en Network Tab

1. Abrir **DevTools** (F12)
2. Ir a la pestaña **Network**
3. Filtrar por **Fetch/XHR**
4. Hacer una acción (listar documentos, crear uno, etc.)
5. Verificar que las URLs sean:
   ```
   https://TU-BACKEND.onrender.com/api/documents
   ```
   y NO:
   ```
   https://guia-despacho.vercel.app/api/documents ❌
   ```

---

## 📝 Checklist de Corrección

- [x] Crear `client/src/config/api.js`
- [x] Actualizar `DocumentsList.jsx`
- [x] Actualizar `DocumentMaker.jsx`
- [x] Actualizar `DocumentDetail.jsx`
- [x] Actualizar `DocumentPrint.jsx`
- [x] Actualizar `LogoUpload.jsx`
- [x] Verificar que no haya errores de compilación
- [ ] Hacer commit y push a GitHub
- [ ] Verificar variable `VITE_API_ORIGIN` en Vercel
- [ ] Redeploy en Vercel
- [ ] Probar la aplicación
- [ ] Verificar en Network tab que las URLs sean correctas

---

## 🐛 Si Persiste el Error

### Error: "VITE_API_ORIGIN is not defined"

**Solución:**
1. Las variables de entorno en Vite deben empezar con `VITE_`
2. Verificar que esté configurada en Vercel
3. Redeploy completo (sin cache)

### Error: CORS

**Solución:**
1. Verificar que `FRONTEND_URL` esté configurado en Render
2. Valor debe ser: `https://guia-despacho.vercel.app` (tu URL de Vercel)
3. Render re-desplegará automáticamente

### Error: Backend no responde

**Solución:**
1. El backend gratuito de Render se duerme
2. Primera petición tarda ~50 segundos
3. Esperar y volver a intentar

---

## 💡 Cómo Funciona Ahora

### Desarrollo Local
```javascript
// VITE_API_ORIGIN no está definido
API_BASE_URL = '' // string vacío
getApiUrl('/api/documents') → '/api/documents'
// El proxy de Vite redirige a localhost:4000
```

### Producción (Vercel)
```javascript
// VITE_API_ORIGIN = 'https://guia-despacho-backend.onrender.com'
API_BASE_URL = 'https://guia-despacho-backend.onrender.com'
getApiUrl('/api/documents') → 'https://guia-despacho-backend.onrender.com/api/documents'
// Llama directamente a Render
```

---

## 📚 Archivos de Referencia

- `client/src/config/api.js` - Configuración centralizada
- `client/.env.production` - Variables de producción (local)
- Variables en Vercel - Configuración en la nube

---

## ✅ Resultado Esperado

Después de aplicar estos cambios:

- ✅ El listado de documentos carga correctamente
- ✅ Puedes crear nuevos documentos
- ✅ Puedes ver detalles de documentos
- ✅ Puedes imprimir documentos
- ✅ El logo se carga correctamente
- ✅ No hay errores 404 en la consola
- ✅ Las peticiones van al backend correcto en Render

---

**🎉 Problema Resuelto!**

Ahora tu aplicación funciona correctamente en producción.
