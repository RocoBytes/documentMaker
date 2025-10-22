# 🗄️ Configuración MongoDB Atlas

## ✅ Configuración Completada

Tu proyecto MERN ya está configurado para conectarse a **MongoDB Atlas**.

---

## 📋 Archivos Actualizados

### 1. `server/.env`

```env
MONGODB_URI=mongodb+srv://usuario:password@cablexlatam.uuzhzdx.mongodb.net/guiaDespacho
PORT=4000
```

**Base de datos:** `guiaDespacho`

---

### 2. `server/src/config/db.js`

Configurado con:

- ✅ `mongoose.set("strictQuery", true)`
- ✅ `maxPoolSize: 10`
- ✅ `serverSelectionTimeoutMS: 10000`
- ✅ `socketTimeoutMS: 45000`
- ✅ Mensajes claros de conexión exitosa o error

---

### 3. `server/src/index.js`

- ✅ Ruta `/api/health` actualizada para mostrar estado de la conexión a MongoDB
- ✅ Mensajes de consola mejorados

---

## 🚀 Cómo Iniciar el Servidor

### 1. Instalar dependencias (si aún no lo hiciste)

```bash
cd server
npm install
```

### 2. Iniciar el servidor en modo desarrollo

```bash
npm run dev
```

### 3. Verificar la conexión en consola

Deberías ver:

```
✅ Conectado exitosamente a MongoDB Atlas
📊 Base de datos: guiaDespacho
🌐 Host: cablexlatam-shard-00-02.uuzhzdx.mongodb.net
🚀 Servidor corriendo en http://localhost:4000
🔗 Health check: http://localhost:4000/api/health
```

---

## 🧪 Probar la Conexión

### Opción 1: Navegador

Abre en tu navegador:

```
http://localhost:4000/api/health
```

**Respuesta esperada:**

```json
{
  "ok": true,
  "status": "healthy",
  "message": "Servidor activo y conectado a MongoDB Atlas",
  "database": "connected",
  "timestamp": "2025-10-22T..."
}
```

### Opción 2: Terminal (curl)

```bash
curl http://localhost:4000/api/health
```

### Opción 3: Thunder Client / Postman

```
GET http://localhost:4000/api/health
```

---

## 🧭 Conectarse con MongoDB Compass

### 1. Abrir MongoDB Compass 1.47.1

### 2. Pegar la cadena de conexión completa:

```
mongodb+srv://usuario:password@cablexlatam.uuzhzdx.mongodb.net/guiaDespacho
```

### 3. Hacer clic en **"Connect"**

### 4. Navegar por tu base de datos

- En la barra lateral izquierda, verás la base de datos **`guiaDespacho`**
- Dentro encontrarás las colecciones:
  - ✅ `documents` (Guías de despacho)
  - ✅ `counters` (Contadores de números correlativos)
  - Y otras que tu aplicación vaya creando

### 5. Explorar colecciones

- Haz clic en cualquier colección para ver los documentos
- Puedes crear, editar y eliminar documentos directamente desde Compass
- Útil para debugging y administración

---

## 📦 Colecciones Actuales del Proyecto

| Colección   | Descripción                                      |
| ----------- | ------------------------------------------------ |
| `documents` | Guías de despacho creadas                        |
| `counters`  | Contador para números correlativos de documentos |

---

## 🔐 Credenciales de Conexión

**⚠️ IMPORTANTE:** Las credenciales están en el archivo `.env`:

```env
Usuario: usuario
Password: password
Cluster: cluster
Base de datos: db
```

**🛡️ Seguridad:**

- Nunca subas el archivo `.env` a GitHub
- El archivo `.gitignore` ya lo excluye
- Si necesitas compartir el proyecto, crea un archivo `.env.example` sin las credenciales reales

---

## 🔄 Migración desde MongoDB Local

Si tenías datos en tu MongoDB local (`mongodb://127.0.0.1:27017`), puedes migrarlos:

### Opción 1: Exportar e Importar con MongoDB Compass

1. Conecta a tu MongoDB local
2. Selecciona la colección
3. Exporta a JSON
4. Conecta a MongoDB Atlas
5. Importa el JSON

### Opción 2: Usar mongodump y mongorestore

```bash
# Exportar desde local
mongodump --uri="mongodb://127.0.0.1:27017/mernstarter" --out=./backup

# Importar a Atlas
mongorestore --uri="mongodb+srv://usuario:password@cablexlatam.uuzhzdx.mongodb.net/guiaDespacho" ./backup/mernstarter
```

---

## 🐛 Troubleshooting

### Error: "MongoServerSelectionError"

**Causa:** No se puede conectar al cluster de Atlas

**Soluciones:**

1. Verifica que tu IP esté en la whitelist de MongoDB Atlas
2. Ve a Atlas → Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)
3. Verifica que las credenciales en `.env` sean correctas

### Error: "Authentication failed"

**Causa:** Usuario o contraseña incorrectos

**Solución:**

1. Ve a MongoDB Atlas → Database Access
2. Verifica que el usuario `root` exista
3. Verifica que la contraseña sea `CablexLatam2025`
4. Si es necesario, crea un nuevo usuario o resetea la contraseña

### Error: "ECONNREFUSED"

**Causa:** El servidor no está corriendo

**Solución:**

```bash
cd server
npm run dev
```

---

## 📚 Recursos Adicionales

- [MongoDB Atlas Documentation](https://www.mongodb.com/docs/atlas/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [MongoDB Compass Guide](https://www.mongodb.com/docs/compass/)

---

## ✅ Checklist de Verificación

- [x] `.env` actualizado con URI de Atlas
- [x] `db.js` configurado con opciones de Atlas
- [x] Dependencias instaladas (`mongoose`, `dotenv`, etc.)
- [x] Servidor inicia sin errores
- [x] Consola muestra "✅ Conectado exitosamente a MongoDB Atlas"
- [x] `/api/health` responde correctamente
- [x] MongoDB Compass se conecta exitosamente
- [x] Colecciones visibles en Compass

---

**🎉 ¡Listo! Tu aplicación MERN ahora usa MongoDB Atlas.**
