# 📄 Configuración de Logo y Empresa

## ✅ Estado Actual

- ✅ Logo configurado en `DocumentPrint.jsx`
- ✅ Estilos de impresión actualizados en `print.css`
- ✅ Logo funciona en desarrollo local
- ⚠️ **Logo necesita verificarse en producción (Render)**

---

## 🖼️ Cómo Funciona el Logo

### En Desarrollo (Local)

```
Logo ubicado en: server/uploads/logo.png
Servido en: http://localhost:4000/uploads/logo.png
```

### En Producción (Render)

```
Logo debe estar en: server/uploads/logo.png
Servido en: https://guia-despacho-backend.onrender.com/uploads/logo.png
```

---

## 🔍 Verificar si el Logo Está Funcionando

### En Desarrollo

Abre en tu navegador:

```
http://localhost:4000/uploads/logo.png
```

### En Producción

Abre en tu navegador:

```
https://guia-despacho-backend.onrender.com/uploads/logo.png
```

**Resultado esperado:**

- ✅ Se muestra la imagen del logo
- ❌ Error 404 = Logo no está disponible

---

## 📤 Subir Logo a Producción

### Método 1: Via Git (Recomendado)

1. Verifica que el logo existe localmente:

   ```bash
   ls -lh server/uploads/logo.png
   ```

2. Agregar al repositorio (si no está):

   ```bash
   git add -f server/uploads/logo.png
   git commit -m "Agregar logo de empresa para producción"
   git push origin main
   ```

3. Espera 2-3 minutos a que Render re-despliegue

4. Verifica:
   ```
   https://guia-despacho-backend.onrender.com/uploads/logo.png
   ```

---

### Método 2: Via Interfaz Web

1. Abre: https://guia-despacho.vercel.app/logo
2. Sube el logo desde tu computadora
3. El logo se guardará automáticamente en Render

---

## 🎨 Cambios Realizados para Impresión

### 1. CSS de Impresión Actualizado

Se agregaron reglas en `client/src/styles/print.css`:

```css
/* Asegurar que el logo se imprima correctamente */
.company-logo {
  display: block !important;
  visibility: visible !important;
  max-height: 60px !important;
  width: auto !important;
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
}
```

**Esto asegura que:**

- El logo sea visible en impresión
- Los colores se mantengan exactos
- El tamaño sea apropiado

---

### 2. Manejo de Errores Mejorado

Se actualizó `DocumentPrint.jsx` para mejor manejo del logo:

```jsx
<img
  src={logoSrc}
  alt="Logo empresa"
  className="company-logo"
  onLoad={() => setLogoLoaded(true)}
  onError={(e) => {
    console.warn("⚠️ Logo no pudo cargarse");
    e.currentTarget.style.visibility = "hidden";
  }}
/>
```

---

## 🧪 Probar la Impresión del Logo

### Test 1: Vista en Pantalla

1. Abre: http://localhost:5173/documents (desarrollo)
   O: https://guia-despacho.vercel.app/documents (producción)
2. Haz clic en un documento → "Ver Impresión"
3. **Deberías ver** el logo en la parte superior izquierda

---

### Test 2: Generar PDF

1. En la vista de impresión, clic en **"🖨️ Imprimir / Guardar PDF"**
2. En la vista previa:
   - ✅ El logo **DEBE** aparecer
   - ✅ Debe tener colores correctos
   - ✅ Debe estar bien alineado

---

## 📋 Requisitos del Logo

### Ubicación del archivo

El logo debe estar en:

```
server/uploads/logo.png
```

### Requisitos Técnicos

- ✅ **Formato**: PNG (recomendado), JPG, WebP, o SVG
- ✅ **Tamaño máximo**: 2 MB
- ✅ **Dimensiones recomendadas**: 300px ancho x 100px alto
- ✅ **Fondo**: Transparente (PNG) o blanco
- ✅ **Resolución**: 150 DPI o superior para impresión nítida

---

## 🔄 Cambiar el Logo

### Via Interfaz Web (Método Fácil)

1. Abre: http://localhost:5173/logo (desarrollo)
   O: https://guia-despacho.vercel.app/logo (producción)
2. Haz clic en **"Seleccionar archivo"**
3. Elige tu logo
4. Haz clic en **"Subir Logo"**
5. El logo se actualizará automáticamente

### Via Archivo Manual

1. Reemplaza el archivo:

   ```bash
   cp /ruta/a/tu/nuevo-logo.png server/uploads/logo.png
   ```

2. Para producción, haz commit y push:
   ```bash
   git add server/uploads/logo.png
   git commit -m "Actualizar logo de empresa"
   git push origin main
   ```

---

## 🐛 Solución de Problemas

### Problema 1: "Logo no aparece en pantalla ni impresión"

**Solución:**

1. Verifica que el archivo existe:

   ```bash
   ls -lh server/uploads/logo.png
   ```

2. Verifica que es accesible:

   - Local: http://localhost:4000/uploads/logo.png
   - Producción: https://guia-despacho-backend.onrender.com/uploads/logo.png

3. Si da 404, sube el logo usando uno de los métodos arriba

---

### Problema 2: "Logo aparece en pantalla pero NO en PDF"

**Solución:** Ya está resuelto con los cambios en CSS. Si persiste:

1. Abre DevTools (F12) → Console
2. Busca errores o warnings sobre el logo
3. Verifica que el navegador soporte `print-color-adjust: exact`

---

### Problema 3: "Error CORS al cargar logo"

**Solución:**

1. Verifica que `FRONTEND_URL` esté configurado en Render
2. El servidor ya tiene CORS configurado correctamente
3. Limpia cache del navegador: Ctrl+Shift+R (Win) o Cmd+Shift+R (Mac)

---

## ✅ Checklist de Verificación

### Desarrollo Local

- [ ] Logo existe en `server/uploads/logo.png`
- [ ] Logo accesible en `http://localhost:4000/uploads/logo.png`
- [ ] Logo aparece en vista de impresión
- [ ] Logo aparece en PDF generado

### Producción

- [ ] Logo accesible en `https://guia-despacho-backend.onrender.com/uploads/logo.png`
- [ ] Logo aparece en `https://guia-despacho.vercel.app/print/[id]`
- [ ] Logo aparece en PDF generado desde producción
- [ ] Logo mantiene colores correctos en impresión

--- Técnicos

- ✅ Formato: **PNG**
- ✅ Tamaño recomendado: máximo 2MB
- ✅ Dimensiones recomendadas: 200-300px de ancho, altura automática
- ✅ Fondo transparente (opcional pero recomendado)

### Cómo subir el logo

#### Opción 1: Subir manualmente

1. Coloca el archivo `logo.png` en la carpeta `server/uploads/`
2. Reinicia el servidor si está corriendo
3. El logo estará disponible en: `http://localhost:4000/uploads/logo.png`

#### Opción 2: Usar la interfaz web (recomendado)

1. Navega a: `http://localhost:5173/admin/logo`
2. Selecciona el archivo PNG desde tu computadora
3. Haz clic en "Subir Logo"
4. El sistema automáticamente reemplazará el logo anterior

### Verificar que el logo funciona

- Abre en el navegador: `http://localhost:4000/uploads/logo.png`
- Si ves el logo, está correctamente configurado
- Si no aparece, revisa que el archivo exista en `server/uploads/logo.png`

---

## 🏢 Configuración de Información de Empresa

### Variables de entorno

Puedes personalizar la información de la empresa creando un archivo `.env` en la raíz del backend (`server/.env`):

```env
# Información de la Empresa
COMPANY_NAME=Cablex Latam SPA
COMPANY_RUT=77.967.372-3
COMPANY_ADDRESS=Av. Lo Espejo 1221
COMPANY_CITY=Santiago
COMPANY_ACTIVITY=Servicios / Telecomunicaciones
```

### Valores por defecto

Si no defines las variables de entorno, el sistema usará estos valores:

| Variable         | Valor por defecto              |
| ---------------- | ------------------------------ |
| COMPANY_NAME     | Cablex Latam SPA               |
| COMPANY_RUT      | 77.967.372-3                   |
| COMPANY_ADDRESS  | Av. Lo Espejo 1221             |
| COMPANY_CITY     | Santiago                       |
| COMPANY_ACTIVITY | Servicios / Telecomunicaciones |

### Verificar configuración

Puedes consultar la configuración actual de la empresa con:

```bash
curl http://localhost:4000/api/settings/company
```

Respuesta esperada:

```json
{
  "name": "Cablex Latam SPA",
  "rut": "77.967.372-3",
  "address": "Av. Lo Espejo 1221",
  "city": "Santiago",
  "activity": "Servicios / Telecomunicaciones"
}
```

---

## 🖨️ Vista de Impresión

### Cómo funciona

1. La vista de impresión (`/documents/:id/print`) obtiene automáticamente:

   - ✅ Logo desde `http://localhost:4000/uploads/logo.png`
   - ✅ Información de empresa desde `/api/settings/company`

2. El header del documento incluye:

   - Logo de la empresa (lado izquierdo)
   - Información de la empresa (nombre, RUT, dirección, ciudad, actividad)
   - Badge con datos del documento (lado derecho)

3. Auto-impresión:
   - Si navegas con `?auto=1`, el sistema espera a que:
     - El documento esté cargado ✓
     - La información de empresa esté disponible ✓
     - El logo termine de cargar ✓
   - Luego dispara automáticamente `window.print()`

### Probar la vista de impresión

```
http://localhost:5173/documents/DOCUMENT_ID/print
http://localhost:5173/documents/DOCUMENT_ID/print?auto=1  # Auto-imprime
```

---

## 🌐 Cambiar URL del Backend

Si tu backend NO está en `http://localhost:4000`, configura la variable de entorno en el frontend:

**Archivo:** `client/.env`

```env
VITE_API_ORIGIN=https://tu-api.com
```

Esto actualizará automáticamente:

- URL del logo: `https://tu-api.com/uploads/logo.png`
- URL de la API: `https://tu-api.com/api/settings/company`

---

## ✅ Checklist de Configuración

- [ ] Logo subido en `server/uploads/logo.png`
- [ ] Logo accesible en `http://localhost:4000/uploads/logo.png`
- [ ] Variables de entorno configuradas en `server/.env` (opcional)
- [ ] Endpoint `/api/settings/company` responde correctamente
- [ ] Vista de impresión muestra logo y empresa: `/documents/:id/print`
- [ ] PDF generado incluye logo y colores correctamente

---

## 🐛 Troubleshooting

### El logo no aparece en la vista de impresión

1. Verifica que el archivo existe: `ls server/uploads/logo.png`
2. Verifica que el backend está sirviendo archivos estáticos
3. Abre en el navegador: `http://localhost:4000/uploads/logo.png`
4. Revisa la consola del navegador por errores CORS

### La información de empresa no se actualiza

1. Reinicia el servidor backend después de cambiar `.env`
2. Verifica que las variables están correctamente escritas (sin espacios extra)
3. Consulta el endpoint: `curl http://localhost:4000/api/settings/company`

### El PDF no preserva los colores

- Los estilos CSS ya incluyen `print-color-adjust: exact`
- Asegúrate de usar Chrome/Edge (mejor soporte de impresión)
- En el diálogo de impresión, activa "Gráficos de fondo"

### Auto-print no funciona

- Verifica que la URL incluye `?auto=1`
- Abre la consola del navegador y busca errores
- El navegador puede bloquear window.print() si no hay interacción del usuario
