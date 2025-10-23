# 🔍 Diagnóstico: Logo no aparece en impresión

## ✅ Cambios Realizados

### 1. CSS de Impresión Mejorado

Se agregaron reglas **CRÍTICAS** en `client/src/styles/print.css`:

```css
/* CRÍTICO: Asegurar que las imágenes se muestren en impresión */
.print-root img,
.company-logo,
img.company-logo {
  visibility: visible !important;
  display: block !important;
  opacity: 1 !important;
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
}

/* Asegurar que el header y brand sean visibles */
.print-header,
.print-header .brand,
.print-header .brand img {
  visibility: visible !important;
  display: block !important;
}
```

**Por qué era necesario:**
- Las reglas de `@media print` ocultan TODO con `visibility: hidden !important`
- Luego solo muestran `.print-root` y sus hijos
- Las **imágenes necesitan reglas EXPLÍCITAS** para mostrarse en impresión

---

### 2. Mejor Debug en DocumentPrint.jsx

Se agregaron logs más descriptivos:

```jsx
onLoad={() => {
  console.log("✅ Logo cargado exitosamente desde:", logoSrc);
  setLogoLoaded(true);
}}
onError={(e) => { 
  console.error("❌ Error al cargar logo desde:", logoSrc);
  console.error("Verifica que el archivo exista en el servidor");
  // Solo ocultar después de confirmar el error
  setTimeout(() => {
    e.currentTarget.style.visibility = "hidden";
  }, 100);
}}
```

---

## 🧪 Cómo Probar

### Paso 1: Verificar que el logo esté disponible

**En terminal:**
```bash
curl -I http://localhost:4000/uploads/logo.png
```

**Resultado esperado:**
```
HTTP/1.1 200 OK
```

✅ Si ves 200 → Logo disponible  
❌ Si ves 404 → Logo no existe en el servidor

---

### Paso 2: Abrir vista de impresión

1. Ve a: http://localhost:5173/documents
2. Haz clic en cualquier documento
3. Haz clic en el botón de **impresión** (🖨️)
4. **Abre la consola** del navegador (F12 → Console)

---

### Paso 3: Verificar los logs

**En la consola deberías ver:**

✅ **Si todo está bien:**
```
✅ Logo cargado exitosamente desde: http://localhost:4000/uploads/logo.png?v=1234567890
```

❌ **Si hay problema:**
```
❌ Error al cargar logo desde: http://localhost:4000/uploads/logo.png?v=1234567890
Verifica que el archivo exista en el servidor
```

---

### Paso 4: Inspeccionar el elemento del logo

1. En la vista de impresión, haz clic derecho en donde debería estar el logo
2. Selecciona **"Inspeccionar elemento"**
3. Busca el tag `<img class="company-logo">`
4. Verifica los estilos aplicados:

**Debe tener:**
```css
display: block !important;
visibility: visible !important;
opacity: 1 !important;
max-height: 60px !important;
```

---

### Paso 5: Probar impresión real

1. En la vista de impresión, haz clic en **"🖨️ Imprimir / Guardar PDF"**
2. En el diálogo de impresión:
   - **Chrome/Edge**: Activa "Gráficos de fondo"
   - **Firefox**: Activa "Imprimir fondos"
3. Vista previa → El logo **DEBE** aparecer

---

## 🐛 Solución de Problemas

### Problema 1: "Logo NO aparece en pantalla"

**Diagnóstico:**
- Abre consola (F12)
- Busca mensaje de error del logo

**Solución A: Logo no existe**
```bash
# Verifica que existe
ls -lh server/uploads/logo.png

# Si no existe, cópialo
cp /ruta/a/tu/logo.png server/uploads/logo.png
```

**Solución B: Servidor no está corriendo**
```bash
# En la carpeta server
cd server
npm start
```

**Solución C: CORS bloqueando**
- Verifica que el backend acepte localhost:5173
- Revisa la configuración CORS en `server/src/index.js`

---

### Problema 2: "Logo aparece en pantalla pero NO en PDF"

**Causa:** Configuración del navegador

**Solución:**

**Chrome/Edge:**
1. Ctrl+P (Cmd+P en Mac)
2. En "Más opciones" → Activa **"Gráficos de fondo"**
3. La vista previa debe mostrar el logo

**Firefox:**
1. Ctrl+P (Cmd+P en Mac)
2. Haz clic en "Opciones de página"
3. Activa **"Imprimir fondos"**

**Safari:**
1. Cmd+P
2. En el diálogo, busca "Imprimir fondos y colores"
3. Activa la opción

---

### Problema 3: "Logo aparece muy pequeño o muy grande"

**Solución:**

Edita `client/src/styles/print.css`:

```css
.company-logo {
  max-height: 80px !important; /* Aumentar tamaño */
  /* o */
  max-height: 40px !important; /* Reducir tamaño */
}
```

---

### Problema 4: "Logo en blanco y negro en el PDF"

**Causa:** `print-color-adjust` no aplicado

**Verificación:**
1. Inspeccionar elemento del logo
2. Verificar que tenga:
   ```css
   -webkit-print-color-adjust: exact !important;
   print-color-adjust: exact !important;
   ```

**Solución:** Ya está implementado en el CSS actualizado.

---

## 📊 Checklist de Verificación

Completa cada paso:

### En Desarrollo
- [ ] Logo existe en `server/uploads/logo.png`
- [ ] Logo accesible: `curl -I http://localhost:4000/uploads/logo.png` → 200 OK
- [ ] Servidor backend corriendo en puerto 4000
- [ ] Frontend corriendo en puerto 5173

### En Vista de Impresión
- [ ] Consola muestra: "✅ Logo cargado exitosamente"
- [ ] NO hay errores en consola
- [ ] Logo visible en la pantalla (esquina superior izquierda)
- [ ] Inspeccionar elemento muestra `visibility: visible`

### En PDF
- [ ] "Gráficos de fondo" activado en navegador
- [ ] Vista previa muestra el logo
- [ ] Logo en colores (no blanco y negro)
- [ ] Logo bien alineado con texto de empresa

---

## 🔄 Siguientes Pasos

### Si el logo ahora aparece en pantalla pero no en PDF:

1. **Limpia la cache del navegador:**
   ```
   Ctrl + Shift + R (Windows/Linux)
   Cmd + Shift + R (Mac)
   ```

2. **Prueba en modo incógnito**

3. **Verifica la configuración del navegador**
   - Chrome: chrome://settings/printing
   - Firefox: about:config → print.print_bgcolor → true

---

### Si el logo TODAVÍA no aparece:

1. **Toma capturas de pantalla:**
   - Vista de impresión sin logo
   - Consola del navegador (F12 → Console)
   - Elemento inspeccionado (F12 → Elements → img.company-logo)

2. **Verifica estos archivos:**
   - `client/src/styles/print.css` (reglas de @media print)
   - `client/src/pages/DocumentPrint.jsx` (tag <img>)
   - `server/uploads/logo.png` (existe el archivo)

3. **Comparte la información** para más ayuda

---

## 📚 Archivos Modificados

- ✅ `client/src/styles/print.css` → Reglas críticas para imágenes
- ✅ `client/src/pages/DocumentPrint.jsx` → Mejor manejo de errores
- 📄 Este documento → Guía de diagnóstico

---

## 💡 Explicación Técnica

**Por qué el logo no aparecía antes:**

1. Las reglas `@media print` ocultan TODO:
   ```css
   body * {
     visibility: hidden !important;
   }
   ```

2. Luego solo muestran `.print-root`:
   ```css
   .print-root * {
     visibility: visible !important;
   }
   ```

3. **PERO** las imágenes a veces no heredan correctamente `visibility: visible` en impresión

4. **Solución**: Reglas EXPLÍCITAS para imágenes:
   ```css
   .print-root img {
     visibility: visible !important;
     display: block !important;
     opacity: 1 !important;
   }
   ```

---

**Tiempo estimado para verificar:** 5 minutos  
**Última actualización:** 23 de octubre de 2025  
**Estado:** ✅ Cambios aplicados, listo para probar
