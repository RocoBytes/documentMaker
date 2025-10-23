# ⚡ Solución Rápida: 2 Variables Faltantes

## 🎯 El Problema

Tu aplicación NO funciona en producción porque faltan **2 variables de entorno**:

```
❌ FRONTEND_URL  → Falta en Render (backend)
❌ VITE_API_ORIGIN → Falta en Vercel (frontend)
```

---

## ✅ Solución en 5 Pasos (10 minutos)

### 1️⃣ Render: Agregar FRONTEND_URL

```
🔗 https://dashboard.render.com
→ guia-despacho-backend
→ Environment
→ Add Environment Variable

Key:   FRONTEND_URL
Value: https://guia-despacho.vercel.app

→ Save
→ Esperar 2-3 minutos (auto re-deploy)
```

---

### 2️⃣ Vercel: Agregar VITE_API_ORIGIN

```
🔗 https://vercel.com/dashboard
→ guia-despacho
→ Settings
→ Environment Variables
→ Add New

Key:   VITE_API_ORIGIN
Value: https://guia-despacho-backend.onrender.com

Environment: ✅ Production ✅ Preview ✅ Development

→ Save
```

---

### 3️⃣ Vercel: Re-desplegar

```
→ Deployments (pestaña)
→ Último deployment (el más reciente)
→ Click en "⋯" (tres puntos)
→ Redeploy
→ ❌ Desmarcar "Use existing Build Cache"
→ Redeploy
→ Esperar 2-3 minutos
```

---

### 4️⃣ Verificar Backend

Terminal:
```bash
curl https://guia-despacho-backend.onrender.com/api/health
```

Debe responder:
```json
{"ok":true,"status":"healthy","database":"connected"}
```

---

### 5️⃣ Probar Frontend

Navegador:
```
🔗 https://guia-despacho.vercel.app/documents

F12 → Console
❌ NO debe haber errores de CORS
✅ Lista de documentos debe cargar
```

---

## 📊 Checklist Visual

```
┌──────────────────────────────────────────┐
│ RENDER (Backend)                         │
├──────────────────────────────────────────┤
│ [ ] FRONTEND_URL agregada                │
│ [ ] Valor sin "/" al final               │
│ [ ] Logs: "Your service is live 🎉"      │
│ [ ] Health check responde OK             │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ VERCEL (Frontend)                        │
├──────────────────────────────────────────┤
│ [ ] VITE_API_ORIGIN agregada             │
│ [ ] Valor sin "/" al final               │
│ [ ] Re-desplegado SIN cache              │
│ [ ] Build completado sin errores         │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ PRUEBAS                                  │
├──────────────────────────────────────────┤
│ [ ] curl al health check funciona        │
│ [ ] NO hay errores CORS en console       │
│ [ ] Lista de documentos carga            │
│ [ ] Puedo crear documentos               │
│ [ ] Puedo ver e imprimir documentos      │
└──────────────────────────────────────────┘
```

---

## ⚠️ IMPORTANTE

### URLs sin barra al final:

✅ `https://guia-despacho.vercel.app`  
✅ `https://guia-despacho-backend.onrender.com`

❌ `https://guia-despacho.vercel.app/`  
❌ `https://guia-despacho-backend.onrender.com/`

---

## 🆘 Si Algo Sale Mal

1. **Todavía hay error de CORS:**
   - Espera 5 minutos más
   - Limpia cache: Ctrl+Shift+R (Win) o Cmd+Shift+R (Mac)
   - Prueba en modo incógnito

2. **Failed to fetch:**
   - Verifica que re-desplegaste Vercel SIN cache
   - Verifica que la variable tenga el nombre exacto: `VITE_API_ORIGIN`

3. **Backend no responde:**
   - Ve a Render → Logs
   - Busca errores en rojo
   - Verifica que `MONGODB_URI` esté configurado

---

## 📖 Documentación Completa

Si necesitas más detalles, consulta:

- **FIX_PRODUCTION_ERRORS.md** → Guía completa paso a paso
- **DEPLOYMENT_GUIDE.md** → Guía de despliegue completa
- **FIX_CORS_ERROR.md** → Solución detallada de CORS
- **FIX_FAILED_TO_FETCH.md** → Solución detallada de fetch

---

**Tiempo estimado:** 10 minutos  
**Última actualización:** 23 de octubre de 2025
