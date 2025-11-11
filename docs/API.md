# Documentación de la API

## Base URL

```
http://localhost:3000/api
```

## Endpoints

### 1. Health Check

Verifica el estado del servidor.

**Endpoint:** `GET /api/health`

**Respuesta Exitosa (200):**
```json
{
  "status": "OK",
  "message": "Servidor funcionando correctamente"
}
```

---

### 2. Crear Cotización

Crea una nueva solicitud de cotización en la base de datos.

**Endpoint:** `POST /api/cotizaciones`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan.perez@example.com",
  "telefono": "987654321",
  "tipoProyecto": "construccion-civil",
  "ubicacion": "Lima, Perú",
  "presupuesto": "100k-500k",
  "mensaje": "Necesito cotización para construcción de casa de 200m²",
  "aceptaTerminos": true
}
```

**Campos:**

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `nombre` | String | Sí | Nombre completo del cliente |
| `email` | String | Sí | Correo electrónico válido |
| `telefono` | String | Sí | Número de teléfono |
| `tipoProyecto` | String | Sí | Tipo de proyecto (ver valores válidos abajo) |
| `ubicacion` | String | Sí | Ubicación del proyecto |
| `presupuesto` | String | No | Rango de presupuesto estimado |
| `mensaje` | String | Sí | Descripción del proyecto |
| `aceptaTerminos` | Boolean | Sí | Debe ser `true` |

**Valores válidos para `tipoProyecto`:**
- `construccion-civil`
- `infraestructura`
- `remodelacion`
- `consultoria`
- `otro`

**Valores válidos para `presupuesto`:**
- `menos-50k`
- `50k-100k`
- `100k-500k`
- `mas-500k`

**Respuesta Exitosa (201):**
```json
{
  "success": true,
  "message": "Cotización guardada exitosamente",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "nombre": "Juan Pérez",
    "email": "juan.perez@example.com",
    "telefono": "987654321",
    "tipoProyecto": "construccion-civil",
    "ubicacion": "Lima, Perú",
    "presupuesto": "100k-500k",
    "mensaje": "Necesito cotización para construcción de casa de 200m²",
    "aceptaTerminos": true,
    "fecha": "2024-11-05T10:00:00.000Z",
    "estado": "pendiente",
    "createdAt": "2024-11-05T10:00:00.000Z",
    "updatedAt": "2024-11-05T10:00:00.000Z"
  }
}
```

**Errores Posibles:**

**400 Bad Request - Campos faltantes:**
```json
{
  "success": false,
  "message": "Todos los campos obligatorios deben ser completados"
}
```

**400 Bad Request - Términos no aceptados:**
```json
{
  "success": false,
  "message": "Debes aceptar los términos y condiciones"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Error interno del servidor",
  "error": "Mensaje de error detallado"
}
```

---

### 3. Obtener Todas las Cotizaciones

Obtiene una lista de todas las cotizaciones guardadas.

**Endpoint:** `GET /api/cotizaciones`

**⚠️ Nota de Seguridad:** Este endpoint debería estar protegido con autenticación en producción.

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "nombre": "Juan Pérez",
      "email": "juan.perez@example.com",
      "telefono": "987654321",
      "tipoProyecto": "construccion-civil",
      "ubicacion": "Lima, Perú",
      "presupuesto": "100k-500k",
      "mensaje": "Necesito cotización para construcción de casa de 200m²",
      "aceptaTerminos": true,
      "fecha": "2024-11-05T10:00:00.000Z",
      "estado": "pendiente",
      "createdAt": "2024-11-05T10:00:00.000Z",
      "updatedAt": "2024-11-05T10:00:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "nombre": "María García",
      "email": "maria.garcia@example.com",
      "telefono": "987654322",
      "tipoProyecto": "remodelacion",
      "ubicacion": "Arequipa, Perú",
      "presupuesto": "50k-100k",
      "mensaje": "Necesito remodelar mi cocina",
      "aceptaTerminos": true,
      "fecha": "2024-11-05T11:00:00.000Z",
      "estado": "pendiente",
      "createdAt": "2024-11-05T11:00:00.000Z",
      "updatedAt": "2024-11-05T11:00:00.000Z"
    }
  ]
}
```

**Errores Posibles:**

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Error obteniendo cotizaciones",
  "error": "Mensaje de error detallado"
}
```

---

### 4. Obtener Cotización por ID

Obtiene una cotización específica por su ID.

**Endpoint:** `GET /api/cotizaciones/:id`

**Parámetros de URL:**
- `id` (String, requerido): ID de la cotización (MongoDB ObjectId)

**Ejemplo:**
```
GET /api/cotizaciones/507f1f77bcf86cd799439011
```

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "nombre": "Juan Pérez",
    "email": "juan.perez@example.com",
    "telefono": "987654321",
    "tipoProyecto": "construccion-civil",
    "ubicacion": "Lima, Perú",
    "presupuesto": "100k-500k",
    "mensaje": "Necesito cotización para construcción de casa de 200m²",
    "aceptaTerminos": true,
    "fecha": "2024-11-05T10:00:00.000Z",
    "estado": "pendiente",
    "createdAt": "2024-11-05T10:00:00.000Z",
    "updatedAt": "2024-11-05T10:00:00.000Z"
  }
}
```

**Errores Posibles:**

**404 Not Found:**
```json
{
  "success": false,
  "message": "Cotización no encontrada"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Error obteniendo cotización",
  "error": "Mensaje de error detallado"
}
```

---

## Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado exitosamente |
| 400 | Bad Request - Error en los datos enviados |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error del servidor |

## Ejemplos de Uso

### cURL

**Crear cotización:**
```bash
curl -X POST http://localhost:3000/api/cotizaciones \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "telefono": "987654321",
    "tipoProyecto": "construccion-civil",
    "ubicacion": "Lima, Perú",
    "presupuesto": "100k-500k",
    "mensaje": "Necesito cotización",
    "aceptaTerminos": true
  }'
```

**Obtener todas las cotizaciones:**
```bash
curl http://localhost:3000/api/cotizaciones
```

**Obtener cotización por ID:**
```bash
curl http://localhost:3000/api/cotizaciones/507f1f77bcf86cd799439011
```

### JavaScript (Fetch API)

**Crear cotización:**
```javascript
fetch('http://localhost:3000/api/cotizaciones', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    nombre: 'Juan Pérez',
    email: 'juan@example.com',
    telefono: '987654321',
    tipoProyecto: 'construccion-civil',
    ubicacion: 'Lima, Perú',
    presupuesto: '100k-500k',
    mensaje: 'Necesito cotización',
    aceptaTerminos: true
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

---

## Notas de Implementación

- Todas las fechas están en formato ISO 8601 (UTC)
- Los IDs son ObjectIds de MongoDB
- El campo `estado` puede tener los siguientes valores:
  - `pendiente` (por defecto)
  - `en-revision`
  - `contactado`
  - `cerrado`

## Rate Limiting

⚠️ **Nota:** Actualmente no hay rate limiting implementado. Se recomienda agregar en producción para prevenir abuso.

## Autenticación

⚠️ **Nota:** Los endpoints de lectura (`GET`) no están protegidos actualmente. En producción, se debe implementar autenticación (JWT, API keys, etc.) para proteger los datos sensibles.

