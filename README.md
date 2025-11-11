# GDS INFRAESTRUCTURA

Sitio web corporativo para GDS INFRAESTRUCTURA con sistema de cotizaciones en línea.

## 📚 Documentación Completa

Para documentación detallada, consulta la carpeta [`docs/`](./docs/):
- [📖 Índice de Documentación](./docs/README.md)
- [🔌 Documentación de la API](./docs/API.md)
- [📦 Guía de Instalación](./docs/INSTALACION.md)
- [🛠️ Guía de Desarrollo](./docs/DESARROLLO.md)
- [🚀 Guía de Despliegue](./docs/DESPLIEGUE.md)

## 🚀 Stack Tecnológico

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con variables CSS y diseño responsive
- **JavaScript (Vanilla)** - Interactividad y manejo de formularios

### Backend
- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web minimalista
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB

## 📋 Características

- ✅ Diseño moderno y responsive
- ✅ Secciones: Inicio, Nosotros, Servicios, Proyectos
- ✅ Formulario de cotización funcional
- ✅ Validación de formularios (frontend y backend)
- ✅ API REST para gestión de cotizaciones
- ✅ Base de datos MongoDB para almacenamiento
- ✅ Paleta de colores profesional para construcción

## 🎨 Paleta de Colores

- **Primario**: #FF6B35 (Naranja vibrante)
- **Secundario**: #004E89 (Azul oscuro)
- **Acento**: #1A659E (Azul medio)
- **Texto**: #2C3E50 (Gris oscuro)

## 📦 Instalación

### Prerrequisitos

- Node.js (v14 o superior)
- npm (v6 o superior)
- MongoDB (local o MongoDB Atlas)

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd gds-infraestructura
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   
   Crear un archivo `.env` en la raíz del proyecto:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/gds-infraestructura
   NODE_ENV=development
   ```

   Para MongoDB Atlas, usar:
   ```env
   MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/gds-infraestructura
   ```

4. **Iniciar MongoDB**
   
   Si usas MongoDB local:
   ```bash
   mongod
   ```

5. **Iniciar el servidor**
   ```bash
   # Modo desarrollo (con nodemon)
   npm run dev
   
   # Modo producción
   npm start
   ```

6. **Abrir en el navegador**
   
   Visita: `http://localhost:3000`

## 📁 Estructura del Proyecto

```
gds-infraestructura/
├── css/
│   └── styles.css          # Estilos principales
├── js/
│   └── main.js             # JavaScript del frontend
├── server/
│   ├── models/
│   │   └── Cotizacion.js   # Modelo de MongoDB
│   └── server.js            # Servidor Express
├── img/                     # Imágenes
├── index.html               # Página principal
├── package.json             # Dependencias
├── .env.example             # Ejemplo de variables de entorno
└── README.md               # Este archivo
```

## 🔌 API Endpoints

### `GET /api/health`
Verifica el estado del servidor.

**Respuesta:**
```json
{
  "status": "OK",
  "message": "Servidor funcionando correctamente"
}
```

### `POST /api/cotizaciones`
Crea una nueva cotización.

**Body:**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "telefono": "987654321",
  "tipoProyecto": "construccion-civil",
  "ubicacion": "Lima, Perú",
  "presupuesto": "100k-500k",
  "mensaje": "Necesito cotización para...",
  "aceptaTerminos": true
}
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "Cotización guardada exitosamente",
  "data": { ... }
}
```

### `GET /api/cotizaciones`
Obtiene todas las cotizaciones (requiere autenticación en producción).

### `GET /api/cotizaciones/:id`
Obtiene una cotización específica por ID.

## 🗄️ Modelo de Datos

### Cotizacion

```javascript
{
  nombre: String (requerido),
  email: String (requerido, válido),
  telefono: String (requerido),
  tipoProyecto: String (requerido, enum),
  ubicacion: String (requerido),
  presupuesto: String (opcional),
  mensaje: String (requerido),
  aceptaTerminos: Boolean (requerido),
  fecha: Date,
  estado: String (pendiente/en-revision/contactado/cerrado),
  notas: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Seguridad

- ✅ Validación de datos en frontend y backend
- ✅ Sanitización de entradas
- ✅ CORS configurado
- ⚠️ **Importante**: En producción, agregar:
  - Autenticación para endpoints de administración
  - Rate limiting
  - HTTPS
  - Validación de tokens CSRF

## 📱 Responsive Design

El sitio es completamente responsive y se adapta a:
- 📱 Móviles (< 480px)
- 📱 Tablets (< 768px)
- 💻 Desktop (> 768px)

## 🚀 Despliegue

### Opciones de despliegue:

1. **Heroku**
   - Agregar MongoDB Atlas
   - Configurar variables de entorno
   - Deploy desde Git

2. **Vercel/Netlify** (Frontend) + **MongoDB Atlas** (Base de datos)
   - Separar frontend y backend
   - Usar funciones serverless para API

3. **VPS tradicional**
   - Instalar Node.js y MongoDB
   - Usar PM2 para gestión de procesos
   - Configurar Nginx como proxy reverso

## 📝 Notas de Desarrollo

- El formulario de cotización valida todos los campos antes de enviar
- Los datos se guardan en MongoDB con timestamps automáticos
- El diseño usa CSS Grid y Flexbox para layouts modernos
- Las animaciones se activan al hacer scroll (Intersection Observer)

## 🤝 Contribuciones

Para contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es propiedad de GDS INFRAESTRUCTURA.

## 📧 Contacto

Para más información, contacta a: contacto@gds.pe

---

Desarrollado con ❤️ para GDS INFRAESTRUCTURA
