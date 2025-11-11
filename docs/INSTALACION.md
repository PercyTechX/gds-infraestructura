# Guía de Instalación

Esta guía te ayudará a instalar y configurar el proyecto GDS INFRAESTRUCTURA desde cero.

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

### Software Requerido

1. **Node.js** (v14.0.0 o superior)
   - Descarga: https://nodejs.org/
   - Verifica la instalación:
     ```bash
     node --version
     npm --version
     ```

2. **MongoDB** (v4.4 o superior)
   - Opción 1: MongoDB Local
     - Descarga: https://www.mongodb.com/try/download/community
     - Instalación: Sigue las instrucciones para tu sistema operativo
   - Opción 2: MongoDB Atlas (Cloud - Recomendado)
     - Registro gratuito: https://www.mongodb.com/cloud/atlas
     - No requiere instalación local

3. **Git** (opcional, para clonar el repositorio)
   - Descarga: https://git-scm.com/

### Sistema Operativo

- ✅ Windows 10/11
- ✅ macOS (10.15 o superior)
- ✅ Linux (Ubuntu 20.04+, Debian 10+, etc.)

---

## 🚀 Instalación Paso a Paso

### Paso 1: Clonar o Descargar el Proyecto

**Opción A: Clonar con Git**
```bash
git clone <url-del-repositorio>
cd gds-infraestructura
```

**Opción B: Descargar ZIP**
- Descarga el archivo ZIP del repositorio
- Extrae el contenido
- Abre una terminal en la carpeta extraída

### Paso 2: Instalar Dependencias

```bash
npm install
```

Esto instalará todas las dependencias necesarias:
- `express` - Framework web
- `mongoose` - ODM para MongoDB
- `cors` - Middleware para CORS
- `dotenv` - Manejo de variables de entorno
- `nodemon` - Para desarrollo (devDependency)

**Tiempo estimado:** 1-2 minutos

### Paso 3: Configurar MongoDB

#### Opción A: MongoDB Local

1. **Iniciar MongoDB:**
   
   **Windows:**
   ```bash
   # Si MongoDB está instalado como servicio, ya está corriendo
   # Si no, ejecuta:
   "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe"
   ```
   
   **macOS/Linux:**
   ```bash
   sudo systemctl start mongod
   # O manualmente:
   mongod --dbpath /ruta/a/tus/datos
   ```

2. **Verificar que MongoDB está corriendo:**
   ```bash
   mongosh
   # O en versiones antiguas:
   mongo
   ```

#### Opción B: MongoDB Atlas (Recomendado)

1. **Crear cuenta en MongoDB Atlas:**
   - Ve a https://www.mongodb.com/cloud/atlas
   - Regístrate (cuenta gratuita disponible)

2. **Crear un cluster:**
   - Selecciona el plan gratuito (M0)
   - Elige una región cercana
   - Crea el cluster (toma 3-5 minutos)

3. **Configurar acceso:**
   - Ve a "Database Access" → "Add New Database User"
   - Crea un usuario y contraseña (guárdalos)
   - Ve a "Network Access" → "Add IP Address"
   - Permite acceso desde cualquier IP (0.0.0.0/0) o tu IP específica

4. **Obtener la cadena de conexión:**
   - Ve a "Database" → "Connect"
   - Selecciona "Connect your application"
   - Copia la cadena de conexión (URI)

### Paso 4: Configurar Variables de Entorno

1. **Crear archivo `.env`:**
   
   En la raíz del proyecto, crea un archivo llamado `.env`:

   ```bash
   # Windows PowerShell
   New-Item -ItemType File -Path .env
   
   # macOS/Linux
   touch .env
   ```

2. **Editar el archivo `.env`:**

   **Para MongoDB Local:**
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/gds-infraestructura
   NODE_ENV=development
   ```

   **Para MongoDB Atlas:**
   ```env
   PORT=3000
   MONGODB_URI=mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/gds-infraestructura?retryWrites=true&w=majority
   NODE_ENV=development
   ```
   
   ⚠️ **Importante:** Reemplaza `usuario` y `password` con tus credenciales de MongoDB Atlas.

### Paso 5: Verificar la Instalación

1. **Iniciar el servidor en modo desarrollo:**
   ```bash
   npm run dev
   ```

2. **Deberías ver:**
   ```
   ✅ Conectado a MongoDB
   🚀 Servidor corriendo en http://localhost:3000
   📝 Entorno: development
   ```

3. **Abrir en el navegador:**
   - Ve a: http://localhost:3000
   - Deberías ver la página principal de GDS INFRAESTRUCTURA

### Paso 6: Probar el Formulario

1. **Scroll hasta la sección "Cotiza tu Trabajo"**
2. **Completa el formulario con datos de prueba**
3. **Envía el formulario**
4. **Verifica en la consola del servidor** que se guardó correctamente

---

## 🔧 Solución de Problemas

### Error: "Cannot find module"

**Solución:**
```bash
# Eliminar node_modules y reinstalar
rm -rf node_modules  # macOS/Linux
# o
Remove-Item -Recurse -Force node_modules  # Windows PowerShell

npm install
```

### Error: "MongoServerError: Authentication failed"

**Causa:** Credenciales incorrectas en MongoDB Atlas

**Solución:**
1. Verifica el usuario y contraseña en MongoDB Atlas
2. Asegúrate de que la contraseña no tenga caracteres especiales sin codificar
3. Si tiene caracteres especiales, codifica la URL:
   - `@` → `%40`
   - `:` → `%3A`
   - `#` → `%23`
   - etc.

### Error: "ECONNREFUSED" o "MongooseServerSelectionError"

**Causa:** MongoDB no está corriendo o la URI es incorrecta

**Solución:**
1. **MongoDB Local:**
   - Verifica que MongoDB esté corriendo:
     ```bash
     mongosh
     ```
   - Si no corre, inícialo manualmente

2. **MongoDB Atlas:**
   - Verifica que tu IP esté en la lista de IPs permitidas
   - Verifica que la URI de conexión sea correcta
   - Asegúrate de reemplazar `<password>` en la URI

### Error: "Port 3000 is already in use"

**Solución:**
1. Cambia el puerto en `.env`:
   ```env
   PORT=3001
   ```
2. O cierra el proceso que está usando el puerto:
   ```bash
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   
   # macOS/Linux
   lsof -ti:3000 | xargs kill -9
   ```

### El formulario no envía datos

**Causa:** El servidor no está corriendo o hay error de CORS

**Solución:**
1. Verifica que el servidor esté corriendo
2. Abre la consola del navegador (F12) y revisa los errores
3. Verifica que la URL en `fetch()` coincida con tu servidor

---

## 📦 Instalación en Producción

### Usando PM2 (Recomendado)

1. **Instalar PM2 globalmente:**
   ```bash
   npm install -g pm2
   ```

2. **Iniciar la aplicación:**
   ```bash
   NODE_ENV=production pm2 start server/server.js --name gds-infraestructura
   ```

3. **Configurar PM2 para iniciar al arrancar:**
   ```bash
   pm2 startup
   pm2 save
   ```

### Usando Docker (Opcional)

1. **Crear Dockerfile:**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install --production
   COPY . .
   EXPOSE 3000
   CMD ["node", "server/server.js"]
   ```

2. **Construir y ejecutar:**
   ```bash
   docker build -t gds-infraestructura .
   docker run -p 3000:3000 --env-file .env gds-infraestructura
   ```

---

## ✅ Verificación Final

Después de la instalación, verifica:

- [ ] El servidor inicia sin errores
- [ ] MongoDB está conectado
- [ ] La página carga en el navegador
- [ ] El formulario de cotización funciona
- [ ] Los datos se guardan en MongoDB

---

## 📚 Recursos Adicionales

- [Documentación de Node.js](https://nodejs.org/docs/)
- [Documentación de Express](https://expressjs.com/)
- [Documentación de MongoDB](https://docs.mongodb.com/)
- [Documentación de Mongoose](https://mongoosejs.com/docs/)

---

## 🆘 Obtener Ayuda

Si encuentras problemas que no están cubiertos aquí:

1. Revisa la consola del servidor para errores
2. Revisa la consola del navegador (F12)
3. Verifica los logs de MongoDB
4. Consulta la documentación de las tecnologías utilizadas

