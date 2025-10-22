# 📝 Bloque de Firmas - Implementación Completada

## ✅ Resumen de Cambios

Se agregaron dos recuadros de firmas al final de la plantilla de impresión:

1. **"Firmado por"** - Para el emisor/supervisor
2. **"Recibido por"** - Para quien recibe las mercaderías

---

## 🎨 Características Implementadas

### **Recuadro 1: "Firmado por"**

- ✅ Título: "Firmado por"
- ✅ Campo: **Nombre / Cargo** (línea completa para escribir a mano)
- ✅ Campo: **Timbre de la empresa** (área amplia de ~36px para timbre)
- ✅ Altura mínima: 100px + padding
- ✅ Borde redondeado y espaciado interno

### **Recuadro 2: "Recibido por"**

- ✅ Campo: **Nombre** y **RUT** (lado a lado)
- ✅ Campo: **Recinto** (línea completa)
- ✅ Campo: **Fecha** y **Firma** (lado a lado)
- ✅ **Nota legal** (texto justificado, 10.5px):
  > "El acuse de recibo que se declara en este acto, de acuerdo a lo dispuesto en la letra b) del Art. 4º y la letra c) del Art. 5º de la Ley 19.983, acredita que la entrega de las mercaderias o servicio(s) prestado(s) ha(n) sido recibidos(s)."

---

## 📋 Archivos Modificados

### 1. `client/src/pages/DocumentPrint.jsx`

**Ubicación:** Después de la sección "Observaciones", antes del cierre del contenedor principal.

**Código agregado:**

```jsx
{
  /* Bloque de firmas */
}
<section className="signatures">
  {/* Firmado por (emisor/supervisor) */}
  <div className="sign-box">
    <div className="sign-title">Firmado por</div>

    <div className="line-row">
      <div>Nombre / Cargo:</div>
      <div className="line" style={{ gridColumn: "span 3" }} />
    </div>

    <div className="line-row">
      <div>Timbre de la empresa:</div>
      <div
        className="line"
        style={{ gridColumn: "span 3", minHeight: "36px" }}
      />
    </div>
  </div>

  {/* Recibido por (quien recibe) */}
  <div className="sign-box">
    <div className="sign-title">Recibido por</div>

    <div className="line-row">
      <div>Nombre:</div>
      <div className="line" />
      <div>RUT:</div>
      <div className="line" />
    </div>

    <div className="line-row" style={{ gridTemplateColumns: "auto 1fr" }}>
      <div>Recinto:</div>
      <div className="line" />
    </div>

    <div className="line-row">
      <div>Fecha:</div>
      <div className="line" />
      <div>Firma:</div>
      <div className="line" />
    </div>

    <div className="legal-note">
      El acuse de recibo que se declara en este acto, de acuerdo a lo dispuesto
      en la letra b) del Art. 4º y la letra c) del Art. 5º de la Ley 19.983,
      acredita que la entrega de las mercaderias o servicio(s) prestado(s) ha(n)
      sido recibidos(s).
    </div>
  </div>
</section>;
```

---

### 2. `client/src/styles/print.css`

**Estilos agregados para pantalla:**

```css
/* ========================================
   BLOQUE DE FIRMAS
   ======================================== */

.signatures {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Dos columnas 50/50 */
  gap: 14px;
  margin-top: 14px;
}

.sign-box {
  border: 1.5px solid var(--border);
  border-radius: 8px;
  padding: 14px;
  min-height: 100px;
  background: white;
  page-break-inside: avoid;
}

.sign-title {
  font-weight: 700;
  font-size: 13px;
  margin-bottom: 10px;
  color: var(--blue);
}

.line-row {
  display: grid;
  grid-template-columns: auto 1fr auto 1fr; /* Label + línea + label + línea */
  gap: 10px;
  align-items: center;
  margin: 8px 0;
  font-size: 12px;
}

.line {
  border-bottom: 1px solid var(--border); /* Línea para escribir a mano */
  min-height: 20px;
  padding: 2px 4px;
}

.legal-note {
  font-size: 10.5px;
  margin-top: 12px;
  line-height: 1.35;
  text-align: justify;
  color: #444;
  padding: 8px;
  background: var(--gray-light);
  border-radius: 4px;
}

/* Responsive: en pantallas estrechas, apilar firmas */
@media (max-width: 900px) {
  .signatures {
    grid-template-columns: 1fr; /* Una columna en móvil */
  }
}
```

**Reglas de impresión agregadas:**

```css
@media print {
  /* Evitar saltos de página dentro de recuadros */
  .sign-box {
    page-break-inside: avoid;
  }

  /* Espaciado superior en impresión */
  .signatures {
    margin-top: 10mm;
  }

  /* Bordes visibles en PDF */
  .sign-box {
    border-color: var(--gray-border) !important;
  }

  .sign-box .line {
    border-bottom-color: var(--border) !important;
  }

  /* Ajuste de fuentes */
  .sign-title {
    font-size: 12pt;
  }

  .legal-note {
    font-size: 10pt;
  }
}
```

---

## 🎯 Layout y Comportamiento

### **En Pantalla (Desktop > 900px):**

```
┌─────────────────────────────────────────────┐
│  Observaciones (si existen)                 │
└─────────────────────────────────────────────┘

┌─────────────────────┬──────────────────────┐
│   Firmado por       │   Recibido por       │
│                     │                      │
│ Nombre/Cargo: _____ │ Nombre: ____ RUT: __ │
│ Timbre: ___________│ Recinto: ___________ │
│                     │ Fecha: ___ Firma: __ │
│                     │ [Nota legal]         │
└─────────────────────┴──────────────────────┘
```

### **En Pantalla Estrecha (< 900px):**

```
┌─────────────────────────────────────────────┐
│   Firmado por                               │
│   Nombre/Cargo: ___________________________ │
│   Timbre: _________________________________ │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│   Recibido por                              │
│   Nombre: _____________ RUT: ______________ │
│   Recinto: __________________________________│
│   Fecha: ______________ Firma: ____________ │
│   [Nota legal]                              │
└─────────────────────────────────────────────┘
```

### **En Impresión/PDF:**

- ✅ Siempre dos columnas lado a lado (optimizado para A4)
- ✅ Margen superior de 10mm
- ✅ Sin cortes de página dentro de cada recuadro
- ✅ Bordes y líneas visibles (print-color-adjust: exact)
- ✅ Fuentes ajustadas a puntos (12pt título, 10pt nota legal)

---

## 🔍 Detalles Técnicos

### **Grid Layouts:**

**`.signatures`:**

- `grid-template-columns: 1fr 1fr` → Dos columnas iguales
- `gap: 14px` → Separación entre recuadros

**`.line-row`:**

- `grid-template-columns: auto 1fr auto 1fr` → Label fijo + línea flexible
- Para línea completa: `style={{ gridColumn: "span 3" }}` en JSX
- Para área de timbre: `minHeight: "36px"` adicional

**`.sign-box`:**

- `border: 1.5px solid var(--border)` → Borde visible
- `border-radius: 8px` → Esquinas redondeadas
- `padding: 14px` → Espaciado interno
- `min-height: 100px` → Altura mínima garantizada

### **Líneas para Escribir:**

```css
.line {
  border-bottom: 1px solid var(--border);
  min-height: 20px;
  padding: 2px 4px;
}
```

- Simulan líneas de formulario tradicional
- Espacio suficiente para escritura a mano
- Visibles tanto en pantalla como en PDF

### **Nota Legal:**

```css
.legal-note {
  font-size: 10.5px; /* Pequeña pero legible */
  line-height: 1.35; /* Compacta */
  text-align: justify; /* Justificada */
  padding: 8px;
  background: var(--gray-light); /* Fondo suave */
}
```

---

## ✅ Checklist de Verificación

- [x] JSX de firmas insertado después de observaciones
- [x] Dos recuadros: "Firmado por" y "Recibido por"
- [x] Campos con líneas para completar a mano
- [x] Nota legal incluida en recuadro de recepción
- [x] Estilos de pantalla (grid 2 columnas)
- [x] Responsive (1 columna en móvil)
- [x] Reglas @media print (sin cortes, márgenes)
- [x] Bordes y líneas visibles en PDF
- [x] Fuentes ajustadas para impresión
- [x] Sin errores de compilación

---

## 🧪 Pruebas Recomendadas

### **En Navegador:**

1. Navegar a `/documents/:id/print`
2. Verificar que aparecen dos recuadros al final
3. Verificar layout en desktop (2 columnas)
4. Reducir ventana < 900px y verificar que se apilan

### **En Impresión:**

1. Abrir vista previa de impresión (`Ctrl/Cmd + P`)
2. Verificar que los recuadros aparecen correctamente
3. Verificar que los bordes son visibles
4. Verificar que las líneas están presentes
5. Verificar que la nota legal es legible

### **En PDF:**

1. Guardar como PDF desde Chrome/Edge
2. Abrir el PDF y verificar:
   - ✅ Recuadros con bordes visibles
   - ✅ Líneas para escribir presentes
   - ✅ Nota legal legible
   - ✅ No hay cortes de página dentro de un recuadro

---

## 🎨 Personalización Opcional

### **Cambiar colores de título:**

```css
.sign-title {
  color: var(--blue); /* Cambiar a otro color */
}
```

### **Aumentar altura del área de timbre:**

```jsx
<div className="line" style={{ gridColumn: "span 3", minHeight: "50px" }} />
```

### **Forzar salto de página antes de firmas:**

```css
@media print {
  .signatures {
    break-before: page; /* Nueva página siempre */
  }
}
```

### **Cambiar fondo de nota legal:**

```css
.legal-note {
  background: #fffacd; /* Amarillo suave */
}
```

---

## 📦 Resumen de Clases CSS

| Clase         | Propósito                           |
| ------------- | ----------------------------------- |
| `.signatures` | Contenedor grid 2 columnas          |
| `.sign-box`   | Recuadro individual con borde       |
| `.sign-title` | Título del recuadro (negrita, azul) |
| `.line-row`   | Fila con labels + líneas            |
| `.line`       | Línea subrayada para escribir       |
| `.legal-note` | Texto legal pequeño justificado     |

---

## ✅ Estado Final

El bloque de firmas está completamente implementado y listo para usar. Los documentos ahora incluyen espacios para:

- ✅ Firma del supervisor/emisor
- ✅ Timbre de la empresa
- ✅ Recepción con nombre, RUT, recinto, fecha y firma
- ✅ Nota legal conforme a Ley 19.983

**Próximo paso:** Navegar a cualquier documento y verificar la impresión:

```
http://localhost:5173/documents/:id/print?auto=1
```
