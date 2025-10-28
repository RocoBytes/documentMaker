# 🎯 GUÍA ULTRA RÁPIDA - Sistema de Guías de Despacho

---

## 📱 PASO 1: ENTRAR AL SISTEMA

```
╔═══════════════════════════════════════════════╗
║  🌐 Abre tu navegador                        ║
║  ┌────────────────────────────────────────┐  ║
║  │ https://guia-despacho.vercel.app       │  ║
║  └────────────────────────────────────────┘  ║
║                                              ║
║  💡 Guarda en favoritos (Ctrl + D)          ║
╚═══════════════════════════════════════════════╝
```

---

## 📋 PASO 2: VER GUÍAS EXISTENTES

```
╔═══════════════════════════════════════════════════╗
║  📋 Listado de Documentos                        ║
║  ┌──────────────────────┐  [➕ Nuevo Documento] ║
║  │ 🔍 Buscar...         │  [📊 Exportar CSV]    ║
║  └──────────────────────┘                        ║
║                                                  ║
║  N°  │ Destinatario    │ RUT         │ Ciudad   ║
║  ────┼─────────────────┼─────────────┼────────  ║
║  5   │ Empresa ABC     │ 12.345.678-9│ Santiago ║
║  4   │ Sociedad XYZ    │ 98.765.432-1│ Valpo    ║
║  3   │ Comercial 123   │ 11.222.333-4│ Coquimbo ║
║                                                  ║
║  ⬅️ Anterior  |  Página 1 de 1  |  Siguiente ➡️  ║
╚═══════════════════════════════════════════════════╝

👉 Haz clic en el número azul para ver el detalle
👉 Usa el buscador para encontrar guías rápido
👉 Exporta a Excel con el botón verde
```

---

## ➕ PASO 3: CREAR NUEVA GUÍA

### 3.1 INFORMACIÓN DEL DESTINATARIO ⭐ OBLIGATORIO

```
╔════════════════════════════════════════════╗
║  📍 Información del Destinatario          ║
╠════════════════════════════════════════════╣
║                                            ║
║  Destinatario * (quién recibe)            ║
║  ┌────────────────────────────────────┐   ║
║  │ Empresa ABC Ltda.                  │   ║
║  └────────────────────────────────────┘   ║
║                                            ║
║  RUT *              Giro                  ║
║  ┌────────────┐    ┌──────────────────┐   ║
║  │12.345.678-9│    │ Comercio         │   ║
║  └────────────┘    └──────────────────┘   ║
║                                            ║
║  Dirección * (completa)                   ║
║  ┌────────────────────────────────────┐   ║
║  │ Av. Principal 123, Depto 4-B       │   ║
║  └────────────────────────────────────┘   ║
║                                            ║
║  Ciudad *                                 ║
║  ┌────────────────────────────────────┐   ║
║  │ Santiago                           │   ║
║  └────────────────────────────────────┘   ║
╚════════════════════════════════════════════╝
```

### 3.2 INFORMACIÓN DEL TRANSPORTE (opcional)

```
╔════════════════════════════════════════════╗
║  🚚 Información del Transporte            ║
╠════════════════════════════════════════════╣
║                                            ║
║  Chofer               RUT Chofer          ║
║  ┌─────────────┐     ┌────────────┐       ║
║  │ Juan Pérez  │     │98.765.432-1│       ║
║  └─────────────┘     └────────────┘       ║
║                                            ║
║  💡 Puedes dejar vacío si no hay chofer   ║
╚════════════════════════════════════════════╝
```

### 3.3 INFORMACIÓN DEL DESTINO ⭐ OBLIGATORIO

```
╔════════════════════════════════════════════╗
║  🎯 Información del Destino               ║
╠════════════════════════════════════════════╣
║                                            ║
║  Destino * (dónde van los materiales)     ║
║  ┌────────────────────────────────────┐   ║
║  │ Bodega Central - Sector B          │   ║
║  └────────────────────────────────────┘   ║
║                                            ║
║  Ciudad *           Proyecto              ║
║  ┌─────────────┐   ┌──────────────────┐   ║
║  │ Valparaíso  │   │ Proyecto Norte   │   ║
║  └─────────────┘   └──────────────────┘   ║
╚════════════════════════════════════════════╝
```

### 3.4 DOCUMENTOS DE REFERENCIA (opcional)

```
╔═══════════════════════════════════════════════════════════╗
║  📋 Documentos de Referencia                             ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║  Doc. Referencia │ N° Docto │ Fecha      │ Nro. SAP     ║
║  ────────────────┼──────────┼────────────┼──────────     ║
║  Factura         │ 12345    │ 20/10/2025 │ F-001        ║
║  Orden Compra    │ OC-789   │ 18/10/2025 │ OC-001       ║
║                  │          │            │              ║
║                                                           ║
║  💡 Máximo 3 documentos (puedes dejar filas vacías)      ║
╚═══════════════════════════════════════════════════════════╝
```

### 3.5 DETALLE DE MATERIALES ⭐ OBLIGATORIO

```
╔═══════════════════════════════════════════════════════════╗
║  📦 Detalle                                              ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║  Código ITEM │ Detalle              │ Cantidad │         ║
║  ────────────┼──────────────────────┼──────────┼───      ║
║  ITM-001     │ Cable UTP Cat 6      │   100    │ 🗑️     ║
║  CON-045     │ Conectores RJ45      │   200    │ 🗑️     ║
║              │                      │          │ 🗑️     ║
║                                                           ║
║                          Total cantidad: 300             ║
║                                                           ║
║           [➕ Agregar fila]  [➖ Eliminar última]         ║
║                                                           ║
║  💡 El total se calcula automáticamente                  ║
╚═══════════════════════════════════════════════════════════╝
```

### 3.6 OBSERVACIONES (opcional)

```
╔════════════════════════════════════════════╗
║  📝 Observaciones                         ║
╠════════════════════════════════════════════╣
║  ┌────────────────────────────────────┐   ║
║  │ Material frágil - Manejar con      │   ║
║  │ cuidado. Entregar en horario       │   ║
║  │ de mañana (antes de las 12:00)     │   ║
║  │                                    │   ║
║  └────────────────────────────────────┘   ║
╚════════════════════════════════════════════╝
```

---

## 💾 PASO 4: GUARDAR

```
╔═══════════════════════════════════════════╗
║                                           ║
║       ┌─────────────────────────────┐     ║
║       │  💾 Guardar Documento       │     ║
║       └─────────────────────────────┘     ║
║                                           ║
║  ✅ Documento guardado correctamente     ║
║  Redirigiendo a impresión...             ║
╚═══════════════════════════════════════════╝
```

---

## 🖨️ PASO 5: IMPRIMIR O GUARDAR PDF

```
╔══════════════════════════════════════════════════════════╗
║  [← Volver]              [🖨️ Imprimir / Guardar PDF]   ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  ┌────────────────────────────────────────────────┐     ║
║  │  🏢 Cablex Latam SPA                           │     ║
║  │  RUT: 77.967.372-3                   GUÍA DE   │     ║
║  │  Av. Lo Espejo 01565...           DESPACHO     │     ║
║  │                                       N° 5      │     ║
║  ├────────────────────────────────────────────────┤     ║
║  │  Fecha emisión: 23-10-2025                     │     ║
║  ├────────────────────────────────────────────────┤     ║
║  │  Información destinatario...                   │     ║
║  │  Información de traslado...                    │     ║
║  │  Detalle...                                    │     ║
║  │                                                │     ║
║  │  [Firma recibido por]    [Firma emisor]       │     ║
║  └────────────────────────────────────────────────┘     ║
╚══════════════════════════════════════════════════════════╝

PARA IMPRIMIR EN PAPEL:
1. Clic en "🖨️ Imprimir / Guardar PDF"
2. Selecciona tu impresora
3. Clic en "Imprimir"

PARA GUARDAR COMO PDF:
1. Clic en "🖨️ Imprimir / Guardar PDF"
2. En "Destino", elige "Guardar como PDF"
3. Elige dónde guardarlo
4. Clic en "Guardar"
```

---

## 🎯 RESUMEN EN 7 PASOS

```
1️⃣  Entra → https://guia-despacho.vercel.app

2️⃣  Clic en → "➕ Nuevo Documento"

3️⃣  Llena → Destinatario (obligatorio)

4️⃣  Llena → Destino (obligatorio)

5️⃣  Agrega → Materiales/Items (obligatorio)

6️⃣  Clic en → "💾 Guardar Documento"

7️⃣  Clic en → "🖨️ Imprimir / Guardar PDF"

✅ ¡LISTO!
```

---

## ❓ PREGUNTAS FRECUENTES

### 🤔 ¿Funciona sin internet?

❌ No, necesitas estar conectado.

### 🤔 ¿Se puede usar desde el celular?

✅ Sí, pero es mejor en computador/tablet.

### 🤔 ¿Necesito usuario y contraseña?

❌ No, solo entra al link.

### 🤔 ¿Se guarda automáticamente?

✅ Sí, al hacer clic en "Guardar".

### 🤔 ¿Puedo editar una guía?

❌ No por ahora. Si hay error, crea una nueva.

### 🤔 ¿El número lo pongo yo?

❌ No, el sistema lo asigna solo (1, 2, 3...).

### 🤔 ¿Puedo exportar a Excel?

✅ Sí, botón "📊 Exportar CSV" (verde).

### 🤔 ¿Hay límite de guías?

♾️ No, puedes crear todas las que necesites.

---

## 🆘 SI TIENES PROBLEMAS

```
1. 🔄 Recarga la página (F5)

2. 🌐 Verifica tu conexión a internet

3. 📧 Contacta soporte:
   intercambio.cablexlatam@docele.cl

4. 👨‍💼 Habla con tu supervisor
```

---

## ✅ CHECKLIST ANTES DE GUARDAR

```
□ ¿Destinatario correcto?
□ ¿RUT con puntos y guión? (12.345.678-9)
□ ¿Dirección completa?
□ ¿Ciudad correcta?
□ ¿Destino claro?
□ ¿Todos los materiales agregados?
□ ¿Cantidades correctas?
□ ¿Observaciones importantes agregadas?
```

---

## 💡 CONSEJOS ÚTILES

```
✅ Guarda la página en favoritos
✅ Usa el buscador para encontrar guías rápido
✅ Exporta a Excel regularmente para respaldo
✅ Imprime el PDF antes de enviar materiales
✅ Revisa 2 veces antes de guardar
✅ Si tienes dudas, pregunta sin miedo
```

---

## 📞 CONTACTO DE SOPORTE

```
📧 Email: intercambio.cablexlatam@docele.cl
🏢 Empresa: Cablex Latam SPA
🌐 Sistema: https://guia-despacho.vercel.app
```

---

**¡Gracias por usar el sistema!** 🎉

_Versión Simplificada 1.0 - Octubre 2025_
