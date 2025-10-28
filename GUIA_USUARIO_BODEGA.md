# 📦 Guía Rápida - Sistema de Guías de Despacho

## 🎯 Bienvenido al nuevo sistema

Esta guía te ayudará a crear guías de despacho de forma fácil y rápida desde cualquier computador o tablet con internet.

---

## 🌐 Cómo entrar al sistema

### Paso 1: Abrir el navegador

- Abre **Google Chrome**, **Firefox** o **Safari**
- En la barra de dirección (donde dice www.) escribe:
  ```
  https://guia-despacho.vercel.app
  ```
- Presiona **Enter**

### Paso 2: Guardar en favoritos (recomendado)

- Presiona **Ctrl + D** (Windows) o **⌘ + D** (Mac)
- Dale un nombre como "Guías Cablex"
- Así la próxima vez solo haces clic en favoritos

---

## 📋 Ver todas las guías creadas

Al entrar, verás una **lista con todas las guías** que se han creado:

### ¿Qué puedes hacer aquí?

1. **🔍 Buscar guías**

   - Escribe el nombre del destinatario o el RUT en el cuadro de búsqueda
   - Ejemplo: "Empresa ABC" o "12.345.678-9"
   - El sistema busca automáticamente mientras escribes

2. **🔢 Ver el número de guía**

   - En la primera columna verás el número (1, 2, 3, etc.)
   - Ese número es único y no se repite nunca

3. **📊 Ordenar las guías**

   - Puedes ordenar por número (más nuevo primero o más antiguo)
   - O por fecha de creación
   - Usa el menú desplegable "Ordenar por"

4. **👁️ Ver el detalle**
   - Haz clic en el **número azul** de cualquier guía
   - Se abrirá toda la información completa

---

## ➕ Crear una nueva guía de despacho

### Paso 1: Hacer clic en "➕ Nuevo Documento"

- Botón morado en la esquina superior derecha
- Te llevará al formulario

### Paso 2: Llenar la información del DESTINATARIO

Los campos con **asterisco (\*)** son OBLIGATORIOS:

```
📍 Información del Destinatario
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Destinatario *
┌─────────────────────────────────────┐
│ Ejemplo: Empresa ABC Ltda.          │
└─────────────────────────────────────┘

RUT *                           Giro
┌──────────────────────┐ ┌──────────────────────┐
│ 12.345.678-9         │ │ Comercio             │
└──────────────────────┘ └──────────────────────┘

Dirección *
┌─────────────────────────────────────┐
│ Av. Principal 123, Depto 4-B        │
└─────────────────────────────────────┘

Ciudad *
┌─────────────────────────────────────┐
│ Santiago                            │
└─────────────────────────────────────┘
```

**💡 Consejos:**

- Escribe el RUT con puntos y guión: `12.345.678-9`
- La dirección debe ser completa (incluye número, depto si aplica)
- El "Giro" es opcional (comercio, servicios, construcción, etc.)

### Paso 3: Llenar información del TRANSPORTE (opcional)

```
🚚 Información del Transporte
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Chofer                          RUT Chofer
┌──────────────────────┐ ┌──────────────────────┐
│ Juan Pérez          │ │ 98.765.432-1         │
└──────────────────────┘ └──────────────────────┘
```

**💡 Importante:** Si no hay chofer asignado, puedes dejar estos campos vacíos.

### Paso 4: Llenar información del DESTINO

```
🎯 Información del Destino
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Destino *
┌─────────────────────────────────────┐
│ Bodega Central - Sector B          │
└─────────────────────────────────────┘

Ciudad *                        Proyecto
┌──────────────────────┐ ┌──────────────────────┐
│ Valparaíso          │ │ Proyecto Norte 2025  │
└──────────────────────┘ └──────────────────────┘
```

**💡 Consejos:**

- "Destino" es DÓNDE van los materiales
- "Proyecto" es el nombre del trabajo (opcional)

### Paso 5: Documentos de Referencia (opcional)

Si tienes facturas, órdenes de compra u otros documentos relacionados:

```
📋 Documentos de Referencia
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌────────────┬────────────┬────────────┬────────────┐
│ Documento  │ N° Docto   │ Fecha      │ Nro. SAP   │
├────────────┼────────────┼────────────┼────────────┤
│ Factura    │ 12345      │ 20/10/2025 │ F-001      │
│ Orden      │ OC-789     │ 18/10/2025 │ OC-001     │
│            │            │            │            │
└────────────┴────────────┴────────────┴────────────┘
```

**💡 Importante:** Puedes dejar filas vacías, no hay problema.

### Paso 6: Agregar los ITEMS (materiales)

```
📦 Detalle
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────┬──────────────────────────────┬──────────┬────┐
│ Código ITEM │ Detalle                      │ Cantidad │    │
├─────────────┼──────────────────────────────┼──────────┼────┤
│ ITM-001     │ Cable UTP Cat 6              │ 100      │ 🗑️ │
│ CON-045     │ Conectores RJ45              │ 200      │ 🗑️ │
│             │                              │          │ 🗑️ │
└─────────────┴──────────────────────────────┴──────────┴────┘

         Total cantidad: 300

         [➕ Agregar fila]  [➖ Eliminar última]
```

**💡 Cómo usar:**

1. **Código ITEM**: El código del material (si lo tienes)
2. **Detalle**: Descripción clara del material
3. **Cantidad**: Número de unidades
4. **🗑️**: Elimina esa fila específica
5. **➕ Agregar fila**: Agrega más líneas si necesitas
6. **Total**: Se calcula automáticamente

### Paso 7: Observaciones (opcional)

```
📝 Observaciones
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────────────┐
│ Material frágil - Manejar con cuidado          │
│ Entregar en horario de mañana                  │
│                                                 │
└─────────────────────────────────────────────────┘
```

**💡 Usa este espacio para:** Instrucciones especiales, cuidados, horarios de entrega, etc.

### Paso 8: Guardar

```
┌─────────────────────────────────────┐
│      💾 Guardar Documento           │
└─────────────────────────────────────┘
```

1. Haz clic en el botón **"💾 Guardar Documento"**
2. Verás un mensaje verde: **"✅ Documento guardado correctamente"**
3. Te llevará automáticamente a la **vista de impresión**

---

## 🖨️ Imprimir o guardar como PDF

Después de guardar, verás dos botones:

```
[← Volver]  [🖨️ Imprimir / Guardar PDF]
```

### Para imprimir en papel:

1. Clic en **"🖨️ Imprimir / Guardar PDF"**
2. Selecciona tu impresora
3. Clic en **"Imprimir"**

### Para guardar como PDF:

1. Clic en **"🖨️ Imprimir / Guardar PDF"**
2. En "Destino" o "Impresora", selecciona **"Guardar como PDF"** o **"Microsoft Print to PDF"**
3. Elige dónde guardar el archivo
4. Clic en **"Guardar"**

**💡 El PDF incluye:**

- Logo de Cablex
- Información completa de la empresa
- Todos los datos que ingresaste
- Número de guía único
- Espacios para firmas

---

## 📊 Exportar todas las guías a Excel

Si necesitas un respaldo o análisis de todas las guías:

```
[📊 Exportar CSV]
```

1. Haz clic en **"📊 Exportar CSV"** (botón verde)
2. Se descargará un archivo llamado: `documentos_2025-10-23.csv`
3. Ábrelo con **Excel** o **Google Sheets**
4. Verás todas las guías en formato tabla

**💡 Incluye:** Número de guía, fecha, destinatario, RUT, destino, items, referencias, observaciones, etc.

---

## ❓ Preguntas Frecuentes

### ¿Se puede usar desde el celular?

✅ **Sí**, pero es mejor usar un computador o tablet para mayor comodidad.

### ¿Necesito instalar algo?

❌ **No**, solo necesitas internet y un navegador.

### ¿Se pierde la información si cierro el navegador?

❌ **No**, todo se guarda en la nube. Puedes volver cuando quieras.

### ¿Qué pasa si me equivoco al crear una guía?

💡 Por ahora no se puede editar. Si te equivocas, crea una nueva guía con los datos correctos.

### ¿El número de guía lo pongo yo?

❌ **No**, el sistema lo asigna automáticamente (1, 2, 3, etc.)

### ¿Puedo ver guías antiguas?

✅ **Sí**, todas las guías quedan guardadas en la lista. Usa el buscador para encontrarlas.

### ¿Cuántas guías puedo crear?

♾️ **Ilimitadas**, no hay límite.

---

## 🆘 ¿Necesitas Ayuda?

Si tienes problemas o dudas:

1. **Recarga la página**: Presiona **F5** o el botón de recargar
2. **Revisa tu conexión a internet**: Asegúrate de estar conectado
3. **Contacta a soporte**:
   - Email: intercambio.cablexlatam@docele.cl
   - O habla con tu supervisor

---

## 📸 Resumen Visual Rápido

```
1️⃣ Entrar → https://guia-despacho.vercel.app

2️⃣ Ver guías → Lista completa, buscar, filtrar

3️⃣ Nueva guía → Botón "➕ Nuevo Documento"

4️⃣ Llenar formulario:
   • Destinatario (obligatorio)
   • Transporte (opcional)
   • Destino (obligatorio)
   • Referencias (opcional)
   • Items/Materiales (obligatorio)
   • Observaciones (opcional)

5️⃣ Guardar → Botón "💾 Guardar Documento"

6️⃣ Imprimir → Botón "🖨️ Imprimir / Guardar PDF"

7️⃣ Listo! ✅
```

---

## ✅ Checklist Antes de Guardar

Antes de hacer clic en "Guardar", verifica:

- [ ] ¿El destinatario está bien escrito?
- [ ] ¿El RUT tiene puntos y guión?
- [ ] ¿La dirección está completa?
- [ ] ¿La ciudad es correcta?
- [ ] ¿El destino final está claro?
- [ ] ¿Agregué todos los materiales?
- [ ] ¿Las cantidades son correctas?
- [ ] ¿Hay observaciones importantes que agregar?

Si todo está OK → **💾 Guardar Documento**

---

**¡Gracias por usar el sistema!** 🎉

Si esta guía te fue útil, compártela con tus compañeros de bodega.

---

_Versión 1.0 - Octubre 2025_
_Cablex Latam SPA_
