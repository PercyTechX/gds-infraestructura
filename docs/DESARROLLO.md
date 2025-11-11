# Guía de Desarrollo

Esta guía contiene información sobre cómo desarrollar y contribuir al proyecto GDS INFRAESTRUCTURA.

## 🏗️ Arquitectura del Proyecto

### Estructura de Carpetas

```
gds-infraestructura/
├── css/                    # Estilos CSS
│   └── styles.css
├── js/                     # JavaScript del frontend
│   └── main.js
├── server/                 # Backend
│   ├── models/            # Modelos de MongoDB
│   │   └── Cotizacion.js
│   └── server.js          # Servidor Express
├── docs/                   # Documentación
│   ├── API.md
│   ├── INSTALACION.md
│   └── DESARROLLO.md
├── img/                    # Imágenes estáticas
├── index.html              # Página principal
├── package.json            # Dependencias
├── .env.example            # Ejemplo de variables de entorno
└── README.md               # Documentación principal
```

### Flujo de Datos

```
Frontend (HTML/CSS/JS)
    ↓
Formulario de Cotización
    ↓
JavaScript (Validación)
    ↓
Fetch API → POST /api/cotizaciones
    ↓
Express Server
    ↓
Mongoose (Validación)
    ↓
MongoDB (Almacenamiento)
```

---

## 🎨 Frontend

### Estilos CSS

El archivo `css/styles.css` utiliza:

- **Variables CSS** para colores y valores reutilizables
- **CSS Grid** y **Flexbox** para layouts
- **Media Queries** para responsive design
- **Animaciones** con `@keyframes`

#### Paleta de Colores

```css
:root {
  --primary-color: #FF6B35;      /* Naranja principal */
  --secondary-color: #004E89;     /* Azul oscuro */
  --accent-color: #1A659E;        /* Azul medio */
  --text-dark: #2C3E50;           /* Texto oscuro */
  --bg-light: #F8F9FA;            /* Fondo claro */
}
```

#### Breakpoints Responsive

- **Mobile:** `< 480px`
- **Tablet:** `480px - 768px`
- **Desktop:** `> 768px`

### JavaScript

El archivo `js/main.js` maneja:

1. **Navegación móvil** (menú hamburguesa)
2. **Smooth scroll** para enlaces de navegación
3. **Validación de formulario** antes de enviar
4. **Envío de datos** via Fetch API
5. **Animaciones al scroll** usando Intersection Observer

#### Funciones Principales

```javascript
// Validación de email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Envío de formulario
async function submitForm(data) {
  const response = await fetch('/api/cotizaciones', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await response.json();
}
```

---

## 🔧 Backend

### Servidor Express

El archivo `server/server.js` contiene:

1. **Configuración del servidor**
2. **Middleware** (CORS, JSON parser, static files)
3. **Rutas API** (`/api/*`)
4. **Manejo de errores**

### Modelo de Datos

El archivo `server/models/Cotizacion.js` define:

- **Schema** de Mongoose
- **Validaciones** de campos
- **Índices** para búsquedas eficientes
- **Timestamps** automáticos

#### Campos del Schema

```javascript
{
  nombre: String (requerido),
  email: String (requerido, validado),
  telefono: String (requerido),
  tipoProyecto: String (enum),
  ubicacion: String (requerido),
  presupuesto: String (opcional),
  mensaje: String (requerido),
  aceptaTerminos: Boolean (requerido),
  fecha: Date (automático),
  estado: String (enum, default: 'pendiente'),
  notas: String (opcional)
}
```

---

## 🛠️ Herramientas de Desarrollo

### Scripts NPM

```bash
# Desarrollo (con nodemon - auto-reload)
npm run dev

# Producción
npm start
```

### Herramientas Recomendadas

1. **VS Code** con extensiones:
   - ESLint
   - Prettier
   - MongoDB for VS Code
   - Live Server (para testing frontend)

2. **Postman** o **Insomnia** para probar la API

3. **MongoDB Compass** para visualizar la base de datos

---

## 🔍 Debugging

### Frontend

1. **Consola del navegador:**
   - Abre DevTools (F12)
   - Revisa la pestaña "Console"
   - Revisa la pestaña "Network" para ver peticiones

2. **Logs en JavaScript:**
   ```javascript
   console.log('Datos:', data);
   console.error('Error:', error);
   ```

### Backend

1. **Logs del servidor:**
   - Los logs aparecen en la terminal donde corre el servidor
   - Usa `console.log()` para debugging

2. **MongoDB:**
   ```bash
   # Conectar a MongoDB
   mongosh
   
   # Seleccionar base de datos
   use gds-infraestructura
   
   # Ver cotizaciones
   db.cotizaciones.find().pretty()
   ```

---

## 🧪 Testing

### Testing Manual

1. **Formulario:**
   - Completa todos los campos
   - Prueba validaciones (email inválido, campos vacíos)
   - Verifica que los datos se guarden en MongoDB

2. **API:**
   - Usa Postman o cURL para probar endpoints
   - Verifica respuestas de éxito y error

### Testing Automatizado (Futuro)

Se puede agregar:
- **Jest** para unit tests
- **Supertest** para testing de API
- **Cypress** para testing E2E

---

## 📝 Convenciones de Código

### Nombres de Variables

- **camelCase** para variables y funciones
- **PascalCase** para clases y componentes
- **UPPER_CASE** para constantes

### Comentarios

```javascript
// Comentario de una línea

/**
 * Comentario de bloque
 * para funciones complejas
 */
```

### Formato

- Usa 2 espacios para indentación
- Máximo 80-100 caracteres por línea
- Agrega punto y coma al final de cada línea

---

## 🚀 Agregar Nuevas Funcionalidades

### Ejemplo: Agregar un nuevo campo al formulario

1. **Frontend - HTML:**
   ```html
   <div class="form-group">
     <label for="nuevo-campo">Nuevo Campo</label>
     <input type="text" id="nuevo-campo" name="nuevoCampo">
   </div>
   ```

2. **Frontend - JavaScript:**
   ```javascript
   const nuevoCampo = formData.get('nuevoCampo');
   ```

3. **Backend - Modelo:**
   ```javascript
   nuevoCampo: {
     type: String,
     trim: true
   }
   ```

4. **Backend - Validación (si es requerido):**
   ```javascript
   if (!req.body.nuevoCampo) {
     return res.status(400).json({ message: 'Campo requerido' });
   }
   ```

---

## 🔐 Seguridad

### Buenas Prácticas

1. **Validación:**
   - ✅ Validar en frontend (UX)
   - ✅ Validar en backend (Seguridad)

2. **Sanitización:**
   - Usar `trim()` en strings
   - Validar tipos de datos
   - Escapar caracteres especiales

3. **Producción:**
   - Agregar autenticación
   - Implementar rate limiting
   - Usar HTTPS
   - Validar tokens CSRF

---

## 📦 Dependencias

### Producción

- `express` - Framework web
- `mongoose` - ODM para MongoDB
- `cors` - Middleware CORS
- `dotenv` - Variables de entorno

### Desarrollo

- `nodemon` - Auto-reload del servidor

---

## 🐛 Issues Conocidos

1. **CORS:** Configurado para desarrollo. En producción, restringir orígenes permitidos.

2. **Autenticación:** No implementada. Los endpoints de lectura están abiertos.

3. **Rate Limiting:** No implementado. Se recomienda agregar en producción.

---

## 📚 Recursos de Aprendizaje

- [MDN Web Docs](https://developer.mozilla.org/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Mongoose Documentation](https://mongoosejs.com/docs/guide.html)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [JavaScript.info](https://javascript.info/)

---

## 🤝 Contribuir

1. Crea una rama para tu feature
2. Desarrolla tu funcionalidad
3. Prueba exhaustivamente
4. Crea un Pull Request con descripción clara

---

## 📞 Soporte

Para preguntas sobre desarrollo:
- Revisa la documentación
- Consulta los logs de error
- Revisa issues similares en GitHub

