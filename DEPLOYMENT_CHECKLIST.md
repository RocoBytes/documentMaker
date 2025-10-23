# ✅ Checklist de Deployment - Guía Visual

## 📦 PARTE 1: Backend en Render

### Paso 1: Crear servicio en Render

```
1. Ir a: https://dashboard.render.com/
2. Click en "New +"
3. Seleccionar "Web Service"
4. Conectar GitHub: RocoBytes/documentMaker
5. Click "Connect"
```

### Paso 2: Configurar el servicio

```
┌─────────────────────────────────────────┐
│ Configuración del Servicio              │
├─────────────────────────────────────────┤
│ Name:          guia-despacho-backend    │
│ Region:        Oregon (US West)         │
│ Branch:        main                     │
│ Root Dir:      server                   │
│ Environment:   Node                     │
│ Build Command: npm install              │
│ Start Command: npm start                │
│ Plan:          Free                     │
└─────────────────────────────────────────┘
```

### Paso 3: Variables de Entorno

```
Click en "Advanced" → "Add Environment Variable"

┌────────────────┬─────────────────────────────────────────────────────┐
│ Variable       │ Valor                                               │
├────────────────┼─────────────────────────────────────────────────────┤
│ MONGODB_URI    │ mongodb+srv://user:password@...             │
│ PORT           │ 4000                                                │
│ NODE_ENV       │ production                                          │
└────────────────┴─────────────────────────────────────────────────────┘
```

### Paso 4: Deploy

```
1. Click "Create Web Service"
2. Esperar 3-5 minutos
3. Ver logs en tiempo real
4. Copiar URL: https://guia-despacho-backend.onrender.com
```

### Paso 5: Verificar

```
Abrir en navegador:
https://guia-despacho-backend.onrender.com/api/health

✅ Debe responder:
{
  "ok": true,
  "status": "healthy",
  "message": "Servidor activo y conectado a MongoDB Atlas",
  "database": "connected"
}
```

---

## 🌐 PARTE 2: Frontend en Vercel

### Paso 1: Importar proyecto

```
1. Ir a: https://vercel.com/new
2. Click "Import Git Repository"
3. Buscar: RocoBytes/documentMaker
4. Click "Import"
```

### Paso 2: Configurar el proyecto

```
┌─────────────────────────────────────────┐
│ Configuración del Proyecto              │
├─────────────────────────────────────────┤
│ Project Name:  guia-despacho            │
│ Framework:     Vite                     │
│ Root Dir:      client                   │
│ Build Command: npm run build            │
│ Output Dir:    dist                     │
│ Install Cmd:   npm install              │
└─────────────────────────────────────────┘
```

### Paso 3: Variables de Entorno

```
Click en "Environment Variables"

┌─────────────────┬───────────────────────────────────────────────┐
│ Variable        │ Valor                                         │
├─────────────────┼───────────────────────────────────────────────┤
│ VITE_API_ORIGIN │ https://guia-despacho-backend.onrender.com   │
└─────────────────┴───────────────────────────────────────────────┘

⚠️ Usar la URL que copiaste en PARTE 1, Paso 4
```

### Paso 4: Deploy

```
1. Click "Deploy"
2. Esperar 2-3 minutos
3. Ver logs de build
4. Copiar URL: https://guia-despacho.vercel.app
```

### Paso 5: Verificar

```
Abrir en navegador:
https://guia-despacho.vercel.app

✅ La aplicación debe cargar
✅ Probar crear una guía de despacho
✅ Probar imprimir
```

---

## 🔧 PARTE 3: Actualizar CORS

### Paso 1: Volver a Render

```
1. Ir a: https://dashboard.render.com/
2. Click en tu servicio: guia-despacho-backend
3. Click en "Environment" (menú izquierdo)
4. Click "Add Environment Variable"
```

### Paso 2: Agregar FRONTEND_URL

```
┌──────────────┬──────────────────────────────────────────┐
│ Variable     │ Valor                                    │
├──────────────┼──────────────────────────────────────────┤
│ FRONTEND_URL │ https://guia-despacho.vercel.app        │
└──────────────┴──────────────────────────────────────────┘

⚠️ Usar la URL que copiaste en PARTE 2, Paso 4
```

### Paso 3: Re-deploy automático

```
El servicio se re-desplegará automáticamente
Esperar 2-3 minutos
```

---

## ✅ PARTE 4: Verificación Final

### Checklist Completo

```
Backend:
[✓] Servicio creado en Render
[✓] Variables de entorno configuradas
[✓] Deploy exitoso
[✓] /api/health responde OK
[✓] Conectado a MongoDB Atlas

Frontend:
[✓] Proyecto importado en Vercel
[✓] Variables de entorno configuradas
[✓] Deploy exitoso
[✓] App carga correctamente

Integración:
[✓] FRONTEND_URL agregado en Render
[✓] CORS funcionando
[✓] Crear guía funciona
[✓] Imprimir PDF funciona
[✓] Datos se guardan en MongoDB
```

### Pruebas End-to-End

```
1. Abrir: https://guia-despacho.vercel.app
2. Click en "Nueva Guía"
3. Llenar formulario completo
4. Click "Guardar"
5. Verificar que aparece en la lista
6. Click "Ver Detalle"
7. Click "Imprimir"
8. Verificar que el PDF se genera correctamente
9. Abrir MongoDB Compass
10. Verificar que el documento está en la base de datos
```

---

## 🎯 URLs Finales

```
┌────────────┬──────────────────────────────────────────────┐
│ Servicio   │ URL                                          │
├────────────┼──────────────────────────────────────────────┤
│ Frontend   │ https://guia-despacho.vercel.app            │
│ Backend    │ https://guia-despacho-backend.onrender.com  │
│ Database   │ MongoDB Atlas ✓                             │
│ Health API │ .../api/health                              │
│ Docs API   │ .../api/documents                           │
└────────────┴──────────────────────────────────────────────┘
```

---

## 🚨 Problemas Comunes y Soluciones

### ❌ Error: "Failed to fetch"

```
Causa: CORS no configurado o URL incorrecta

Solución:
1. Verificar VITE_API_ORIGIN en Vercel
2. Verificar FRONTEND_URL en Render
3. Verificar que ambas URLs sean HTTPS
4. No incluir "/" al final de las URLs
```

### ❌ Backend tarda mucho (50+ segundos)

```
Causa: Plan gratuito de Render duerme después de 15 min

Solución:
1. Es NORMAL en plan gratuito
2. Primera carga es lenta, después funciona normal
3. Opciones:
   - Upgrade a plan de pago ($7/mes)
   - Usar servicio keep-alive
   - Informar a usuarios de la demora inicial
```

### ❌ MongoDB no conecta

```
Causa: IP no está en whitelist de Atlas

Solución:
1. Ir a: https://cloud.mongodb.com/
2. Network Access → Add IP Address
3. Seleccionar: "Allow access from anywhere" (0.0.0.0/0)
4. Click "Confirm"
5. Esperar 2-3 minutos
```

### ❌ Build falla en Vercel

```
Causa: Falta configuración o dependencias

Solución:
1. Verificar que Root Directory = "client"
2. Verificar que Build Command = "npm run build"
3. Verificar que Output Directory = "dist"
4. Ver logs de build en Vercel dashboard
```

### ❌ Logo no se muestra en producción

```
Causa: Carpeta uploads/ no se sube a Git

Solución:
1. Subir logo.png manualmente a Render:
   - Dashboard → tu servicio → Shell
   - Subir archivo via interfaz web
2. O mejor: usar Cloudinary para imágenes
```

---

## 📊 Panel de Control

### Monitoreo

```
Render Dashboard:
- Ver logs en tiempo real
- Ver uso de recursos
- Ver métricas de requests

Vercel Dashboard:
- Ver deploys
- Ver analytics
- Ver usage/limits
```

### Logs

```
Render:
https://dashboard.render.com/ → Tu servicio → Logs

Vercel:
https://vercel.com/dashboard → Tu proyecto → Deployments → Logs
```

---

## 🎉 ¡Felicitaciones!

Tu aplicación MERN está desplegada en producción y lista para usar.

### Próximos pasos opcionales:

- [ ] Configurar dominio personalizado
- [ ] Configurar analytics
- [ ] Configurar alertas de errores
- [ ] Optimizar rendimiento
- [ ] Agregar tests automatizados
- [ ] Configurar CI/CD

---

## 📞 Soporte

Si tienes problemas:

1. Ver **DEPLOYMENT_GUIDE.md** → Troubleshooting
2. Ver logs en Render/Vercel
3. Verificar MongoDB Compass
4. Revisar variables de entorno

---

**⏱️ Tiempo total: ~15 minutos**
**💰 Costo: $0 (planes gratuitos)**
**🚀 Deploy automático: ✓ activado**
