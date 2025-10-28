# 🔧 Solución: Timeout en Deploy de Render

## 🚨 Error

```
==> Deploying...
==> Timed Out
==> Common ways to troubleshoot your deploy: https://render.com/docs/troubleshooting-deploys
```

---

## ✅ Cambios Realizados

### 1. Actualizado `render.yaml`

**Problema:** Puerto hardcoded a 4000, pero Render asigna dinámicamente

**Solución:**

- ❌ Eliminado `PORT: 4000` de envVars
- ✅ Agregado `healthCheckPath: /api/health`
- ✅ Render ahora usa su puerto dinámico

### 2. Mejorado `server/src/index.js`

**Cambios:**

- ✅ Escucha en `0.0.0.0` en lugar de solo localhost
- ✅ Manejo de errores de conexión a MongoDB
- ✅ Manejo de señales SIGTERM/SIGINT para cierre graceful
- ✅ Logs más informativos para debugging

---

## 🔍 Diagnóstico del Problema

### Causas Comunes de Timeout en Render:

1. **Puerto incorrecto** ✅ (Solucionado)

   - Render asigna `process.env.PORT` dinámicamente
   - NO debe hardcodearse a 4000

2. **MongoDB no conecta** (Posible causa)

   - URI incorrecta
   - IP no whitelisted en Atlas
   - Credenciales incorrectas

3. **Health check falla**

   - Endpoint `/api/health` no responde
   - Timeout antes de estar listo

4. **Build falla**
   - Dependencias no instaladas
   - Errores de sintaxis

---

## 🔧 Pasos para Solucionar

### Paso 1: Verificar Variables de Entorno en Render

1. Ve a: https://dashboard.render.com
2. Selecciona: **guia-despacho-backend**
3. Ve a: **Environment**
4. Verifica que tengas:

```
MONGODB_URI = mongodb+srv://usuario:contraseña@cluster.mongodb.net/guiaDespacho
FRONTEND_URL = https://guia-despacho.vercel.app
NODE_ENV = production
```

**⚠️ IMPORTANTE:**

- `MONGODB_URI` debe ser tu string completo de conexión de Atlas
- NO debe tener espacios al inicio o final
- La contraseña debe estar URL-encoded si tiene caracteres especiales

---

### Paso 2: Verificar IP Whitelist en MongoDB Atlas

1. Ve a: https://cloud.mongodb.com
2. Selecciona tu cluster
3. **Network Access** → IP Access List
4. Asegúrate de tener una de estas opciones:

**Opción A: Permitir todas las IPs (Recomendado para Render)**

```
IP Address: 0.0.0.0/0
Description: Allow from anywhere
```

**Opción B: IPs específicas de Render**

- Ve a Render docs para IPs estáticas (plan pagado)

---

### Paso 3: Push de Cambios a GitHub

Los cambios ya están listos para commit:

```bash
git add .
git commit -m "Fix: Corregir timeout en Render - puerto dinámico y health check"
git push origin main
```

Render detectará el push y **automáticamente re-desplegará**.

---

### Paso 4: Monitorear Logs en Render

1. Ve a Render Dashboard
2. Selecciona tu servicio
3. Ve a la pestaña **"Logs"**
4. Observa el proceso de deploy

**Logs esperados (éxito):**

```
🔧 Configuración:
   - PORT: 10000
   - NODE_ENV: production
   - FRONTEND_URL: https://guia-despacho.vercel.app
🗄️  Conectando a MongoDB Atlas...
✅ MongoDB Atlas conectado exitosamente
✅ Base de datos: guiaDespacho
📁 Carpeta uploads lista
🚀 Servidor corriendo en puerto 10000
🔗 Health check: http://localhost:10000/api/health
✅ Listo para recibir conexiones
==> Your service is live 🎉
```

**Logs de error (si hay problema):**

```
❌ Error al conectar a MongoDB: ...
El servidor no puede arrancar sin conexión a la base de datos
```

---

## 🐛 Troubleshooting Específico

### Error 1: "MongoServerError: bad auth"

**Causa:** Credenciales incorrectas en MONGODB_URI

**Solución:**

1. Ve a MongoDB Atlas → Database Access
2. Verifica usuario y contraseña
3. Si olvidaste la contraseña, **cambia la contraseña**:
   - Edit User → Update Password
4. Actualiza `MONGODB_URI` en Render con la nueva contraseña
5. Redeploy (botón "Manual Deploy" o push a GitHub)

---

### Error 2: "MongoServerError: IP not whitelisted"

**Causa:** IP de Render no permitida en Atlas

**Solución:**

1. MongoDB Atlas → Network Access
2. **Add IP Address**
3. **Allow Access from Anywhere:** `0.0.0.0/0`
4. Click **Confirm**
5. Espera 1-2 minutos a que se aplique
6. Redeploy en Render

---

### Error 3: "EADDRINUSE: Address already in use"

**Causa:** Proceso anterior no se cerró correctamente

**Solución:**

- Render maneja esto automáticamente
- Si persiste, elimina el servicio y créalo de nuevo

---

### Error 4: Health check timeout después de 10 minutos

**Causa:** El servidor no responde en `/api/health`

**Solución:**

1. Verifica que MongoDB esté conectado (logs)
2. Verifica que el puerto sea correcto
3. Test manual:
   ```bash
   curl https://guia-despacho-backend.onrender.com/api/health
   ```

---

## 📋 Checklist de Verificación

Completa estos pasos antes de redeploy:

### Configuración Local

- [ ] Código actualizado con cambios de render.yaml
- [ ] Código actualizado con cambios de index.js
- [ ] Cambios commiteados a Git
- [ ] Push a GitHub completado

### Configuración Render

- [ ] Variable `MONGODB_URI` configurada y correcta
- [ ] Variable `FRONTEND_URL` configurada
- [ ] Variable `NODE_ENV` = production
- [ ] NO hay variable `PORT` (debe ser dinámica)
- [ ] Health check path: `/api/health` configurado

### Configuración MongoDB Atlas

- [ ] IP `0.0.0.0/0` whitelisted
- [ ] Usuario y contraseña correctos
- [ ] Cluster activo (no pausado)
- [ ] String de conexión copiado correctamente

### Verificación Post-Deploy

- [ ] Logs muestran "MongoDB Atlas conectado exitosamente"
- [ ] Logs muestran "Your service is live 🎉"
- [ ] Health check responde: `curl https://guia-despacho-backend.onrender.com/api/health`
- [ ] Frontend puede conectarse al backend

---

## 🚀 Re-desplegar Ahora

### Método 1: Push a GitHub (Automático)

```bash
git add .
git commit -m "Fix Render deployment timeout"
git push origin main
```

Render detectará el push y desplegará automáticamente.

---

### Método 2: Manual Deploy (Render Dashboard)

1. Ve a: https://dashboard.render.com
2. Selecciona: **guia-despacho-backend**
3. Click en **"Manual Deploy"** (botón azul)
4. Selecciona branch: **main**
5. Click **"Deploy"**

---

## 🎯 Resultado Esperado

Después de fix y redeploy, deberías ver:

1. **En Render Logs:**

   ```
   🚀 Servidor corriendo en puerto 10000
   ✅ Listo para recibir conexiones
   ==> Your service is live 🎉
   ```

2. **Test Health Check:**

   ```bash
   curl https://guia-despacho-backend.onrender.com/api/health
   ```

   Respuesta:

   ```json
   {
     "ok": true,
     "status": "healthy",
     "database": "connected",
     "timestamp": "2025-10-23T..."
   }
   ```

3. **Frontend Funciona:**
   - https://guia-despacho.vercel.app/documents
   - Carga lista de documentos sin errores

---

## 📞 Si el Problema Persiste

Si después de todos estos pasos sigue fallando:

1. **Captura los logs completos de Render:**

   - Dashboard → Logs → Copia todo el output

2. **Verifica el string de MongoDB:**

   ```bash
   # En tu terminal local
   echo $MONGODB_URI
   ```

   Debería verse así:

   ```
   mongodb+srv://usuario:contraseña@cluster.mongodb.net/guiaDespacho?retryWrites=true&w=majority
   ```

3. **Test de conexión local:**

   ```bash
   cd server
   MONGODB_URI="tu-string-de-atlas" npm start
   ```

   Si funciona local pero no en Render → problema de configuración en Render

4. **Contacta soporte de Render:**
   - https://render.com/docs/support

---

**Última actualización:** 23 de octubre de 2025  
**Autor:** GitHub Copilot  
**Tiempo estimado de fix:** 10-15 minutos
