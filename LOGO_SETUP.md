# 📄 Configuración de Logo y Empresa

## 🖼️ Subir Logo

### Ubicación del archivo

El logo debe estar en formato **PNG** y ubicado en:

```
server/uploads/logo.png
```

### Requisitos

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
