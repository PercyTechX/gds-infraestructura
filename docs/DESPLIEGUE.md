# Guía de Despliegue

Esta guía explica cómo desplegar GDS INFRAESTRUCTURA en diferentes plataformas.

## 📋 Pre-requisitos para Producción

Antes de desplegar, asegúrate de:

- [ ] Cambiar `NODE_ENV=production` en `.env`
- [ ] Configurar MongoDB Atlas (o servidor de producción)
- [ ] Configurar variables de entorno de producción
- [ ] Revisar y actualizar configuración de seguridad
- [ ] Probar la aplicación localmente en modo producción

---

## 🚀 Opción 1: Heroku

### Paso 1: Preparar el Proyecto

1. **Crear archivo `Procfile`:**
   ```
   web: node server/server.js
   ```

2. **Actualizar `package.json`:**
   ```json
   {
     "scripts": {
       "start": "node server/server.js"
     },
     "engines": {
       "node": "18.x",
       "npm": "9.x"
     }
   }
   ```

### Paso 2: Instalar Heroku CLI

```bash
# Windows
# Descargar desde: https://devcenter.heroku.com/articles/heroku-cli

# macOS
brew tap heroku/brew && brew install heroku

# Linux
curl https://cli-assets.heroku.com/install.sh | sh
```

### Paso 3: Desplegar

```bash
# Login
heroku login

# Crear aplicación
heroku create gds-infraestructura

# Agregar MongoDB Atlas
# Ve a: https://www.mongodb.com/cloud/atlas
# Crea un cluster y obtén la URI de conexión

# Configurar variables de entorno
heroku config:set MONGODB_URI=mongodb+srv://...
heroku config:set NODE_ENV=production

# Desplegar
git push heroku main

# Abrir aplicación
heroku open
```

### Paso 4: Ver Logs

```bash
heroku logs --tail
```

---

## 🌐 Opción 2: Vercel (Frontend) + MongoDB Atlas

### Frontend en Vercel

1. **Instalar Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Crear `vercel.json`:**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server/server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/api/(.*)",
         "dest": "server/server.js"
       },
       {
         "src": "/(.*)",
         "dest": "index.html"
       }
     ]
   }
   ```

3. **Desplegar:**
   ```bash
   vercel
   ```

4. **Configurar variables de entorno en Vercel Dashboard:**
   - `MONGODB_URI`
   - `NODE_ENV=production`

### Base de Datos

Usa MongoDB Atlas (gratuito hasta 512MB):
- https://www.mongodb.com/cloud/atlas

---

## 🐳 Opción 3: Docker

### Crear Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar código fuente
COPY . .

# Exponer puerto
EXPOSE 3000

# Variables de entorno
ENV NODE_ENV=production

# Comando para iniciar
CMD ["node", "server/server.js"]
```

### Crear .dockerignore

```
node_modules
npm-debug.log
.env
.git
.gitignore
README.md
docs
```

### Construir y Ejecutar

```bash
# Construir imagen
docker build -t gds-infraestructura .

# Ejecutar contenedor
docker run -d \
  -p 3000:3000 \
  --env-file .env \
  --name gds-infraestructura \
  gds-infraestructura
```

### Docker Compose

Crear `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/gds-infraestructura
    depends_on:
      - mongo

  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

Ejecutar:
```bash
docker-compose up -d
```

---

## 🖥️ Opción 4: VPS (Ubuntu/Debian)

### Paso 1: Configurar Servidor

```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar MongoDB (opcional, si no usas Atlas)
# Usar MongoDB Atlas es recomendado
```

### Paso 2: Configurar Nginx

```bash
# Instalar Nginx
sudo apt install nginx -y

# Crear configuración
sudo nano /etc/nginx/sites-available/gds-infraestructura
```

Configuración de Nginx:
```nginx
server {
    listen 80;
    server_name tu-dominio.com www.tu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Activar sitio:
```bash
sudo ln -s /etc/nginx/sites-available/gds-infraestructura /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Paso 3: Desplegar Aplicación

```bash
# Clonar repositorio
git clone <url-repositorio> /var/www/gds-infraestructura
cd /var/www/gds-infraestructura

# Instalar dependencias
npm install --production

# Crear archivo .env
nano .env
```

### Paso 4: Configurar PM2

```bash
# Instalar PM2
sudo npm install -g pm2

# Iniciar aplicación
pm2 start server/server.js --name gds-infraestructura

# Configurar para iniciar al arrancar
pm2 startup
pm2 save
```

### Paso 5: Configurar SSL (Let's Encrypt)

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtener certificado
sudo certbot --nginx -d tu-dominio.com -d www.tu-dominio.com

# Renovación automática
sudo certbot renew --dry-run
```

---

## 🔒 Seguridad en Producción

### 1. Variables de Entorno

Nunca commits archivos `.env`:
```bash
# Asegúrate de que .env está en .gitignore
```

### 2. Autenticación

Agregar autenticación para endpoints de administración:

```javascript
// Ejemplo con JWT
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Usar en rutas protegidas
app.get('/api/cotizaciones', authenticateToken, async (req, res) => {
  // ...
});
```

### 3. Rate Limiting

```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // máximo 100 requests
});

app.use('/api/', limiter);
```

### 4. Helmet (Seguridad HTTP)

```bash
npm install helmet
```

```javascript
const helmet = require('helmet');
app.use(helmet());
```

### 5. CORS Restringido

```javascript
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['https://tu-dominio.com'],
  credentials: true
};

app.use(cors(corsOptions));
```

---

## 📊 Monitoreo

### Opción 1: PM2 Monitoring

```bash
pm2 monit
```

### Opción 2: Logs

```bash
# Ver logs
pm2 logs gds-infraestructura

# Ver últimas 100 líneas
pm2 logs gds-infraestructura --lines 100
```

### Opción 3: Uptime Monitoring

- **UptimeRobot** (gratuito): https://uptimerobot.com/
- **Pingdom**: https://www.pingdom.com/

---

## 🔄 Actualización

### Proceso de Actualización

```bash
# 1. Hacer backup de la base de datos
mongodump --uri="mongodb+srv://..." --out=backup/

# 2. Actualizar código
git pull origin main

# 3. Instalar nuevas dependencias
npm install --production

# 4. Reiniciar aplicación
pm2 restart gds-infraestructura

# 5. Verificar logs
pm2 logs gds-infraestructura
```

---

## 📈 Escalabilidad

### Horizontal Scaling

1. **Usar Load Balancer** (Nginx, AWS ELB)
2. **Múltiples instancias** de la aplicación
3. **MongoDB Replica Set** para alta disponibilidad

### Vertical Scaling

1. **Aumentar recursos** del servidor (CPU, RAM)
2. **Optimizar consultas** MongoDB
3. **Usar índices** en campos frecuentemente consultados

---

## 🐛 Troubleshooting

### La aplicación no inicia

```bash
# Verificar logs
pm2 logs gds-infraestructura

# Verificar variables de entorno
pm2 env gds-infraestructura

# Verificar conexión a MongoDB
node -e "require('mongoose').connect(process.env.MONGODB_URI).then(() => console.log('OK')).catch(e => console.error(e))"
```

### Alto uso de memoria

```bash
# Verificar uso de recursos
pm2 monit

# Reiniciar aplicación
pm2 restart gds-infraestructura

# Si persiste, considerar aumentar recursos o optimizar código
```

---

## 📝 Checklist de Despliegue

- [ ] Variables de entorno configuradas
- [ ] MongoDB conectado y accesible
- [ ] SSL/HTTPS configurado
- [ ] Autenticación implementada (si aplica)
- [ ] Rate limiting configurado
- [ ] Logs configurados
- [ ] Monitoreo activo
- [ ] Backup de base de datos configurado
- [ ] Documentación actualizada
- [ ] Testing realizado en producción

---

## 🌍 URLs de Referencia

- **Heroku**: https://www.heroku.com/
- **Vercel**: https://vercel.com/
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
- **Let's Encrypt**: https://letsencrypt.org/
- **PM2**: https://pm2.keymetrics.io/

---

¡Buena suerte con tu despliegue! 🚀

