# Sistema de Gestión de Transacciones con Tarjetas Corporativas

Sistema para gestionar transacciones con tarjetas corporativas implementando arquitectura hexagonal.

## Requisitos de Instalación

### Prerrequisitos
- Node.js (v18 o superior)
- PostgreSQL (v14 o superior)
- npm o yarn
- Git

### Pasos de Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/felipealzuro/corporate-card-transactions
cd corporate-card-transactions


Te ayudaré a crear un README.md completo que cumpla con todos los requisitos solicitados.

```markdown
# Sistema de Gestión de Transacciones con Tarjetas Corporativas

Sistema para gestionar transacciones con tarjetas corporativas implementando arquitectura hexagonal.

## Requisitos de Instalación

### Prerrequisitos
- Node.js (v18 o superior)
- PostgreSQL (v14 o superior)
- npm o yarn
- Git

### Pasos de Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/corporate-card-transactions.git
cd corporate-card-transactions
```

2. Instalar dependencias:


```shellscript
npm install
```

3. Crear base de datos PostgreSQL:


```shellscript
createdb corporate_cards_db
```

## Configuración del Entorno

1. Crear archivo `.env` en la raíz del proyecto:


```plaintext
# Database
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/corporate_cards_db

# Server
PORT=3000
NODE_ENV=development

# AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=tu_access_key
AWS_SECRET_ACCESS_KEY=tu_secret_key
```

2. Ejecutar migraciones:


```shellscript
npm run typeorm migration:run
```

3. Ejecutar seeds:


```shellscript
npm run seed
```

## Ejemplos de Uso de Endpoints

### 1. Crear una Transacción

```shellscript
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "cardLastFourDigits": "1234",
    "amount": 100.50,
    "categoryId": "uuid-categoria",
    "date": "2024-02-11T15:30:00Z",
    "status": "Pending"
  }'
```

### 2. Listar Transacciones con Filtros

```shellscript
curl "http://localhost:3000/api/transactions?category=Food&startDate=2024-01-01&endDate=2024-12-31&status=Pending"
```

### 3. Actualizar Estado de Transacción

```shellscript
curl -X PATCH http://localhost:3000/api/transactions/123/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Approved"
  }'
```

### 4. Crear Categoría

```shellscript
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Entertainment"
  }'
```

### 5. Obtener Resumen de Gastos

```shellscript
curl http://localhost:3000/api/transactions/summary
```

## Ejecución de Pruebas

Para ejecutar todas las pruebas unitarias:

```shellscript
npm test
```

Para ejecutar pruebas con coverage:

```shellscript
npm run test:coverage
```

Para ejecutar pruebas específicas:

```shellscript
npm test -- src/domain/usecases/__tests__/CreateTransactionUseCase.test.ts
```

## Justificación de la Base de Datos

Se eligió PostgreSQL como sistema de gestión de base de datos por las siguientes razones:

1. **Integridad de Datos**:

1. PostgreSQL proporciona soporte completo para transacciones ACID.
2. Garantiza la integridad referencial mediante claves foráneas.
3. Ideal para sistemas financieros donde la precisión y consistencia son críticas.



2. **Escalabilidad**:

1. Manejo eficiente de grandes volúmenes de datos.
2. Soporte para particionamiento de tablas.
3. Capacidad de replicación para alta disponibilidad.



3. **Tipos de Datos Especializados**:

1. Soporte nativo para tipos decimales precisos (DECIMAL/NUMERIC).
2. Tipos de datos para manejo de fechas y timestamps con zonas horarias.
3. Enums para estados de transacciones.



4. **Rendimiento**:

1. Excelente optimizador de consultas.
2. Índices avanzados (B-tree, Hash, GiST).
3. Eficiente en operaciones de lectura y escritura.



5. **Seguridad**:

1. Sistema robusto de permisos y roles.
2. Soporte para SSL/TLS.
3. Auditoría de operaciones.



6. **Mantenibilidad**:

1. Amplia documentación disponible.
2. Gran comunidad de desarrolladores.
3. Herramientas maduras para administración y monitoreo.





## Estructura del Proyecto

```plaintext
src/
├── domain/
│   ├── entities/
│   ├── repositories/
│   └── usecases/
├── infrastructure/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeds/
│   ├── repositories/
│   └── web/
│       ├── controllers/
│       └── routes/
└── application/
    └── services/
```

## Scripts Disponibles

```shellscript
# Desarrollo
npm run dev

# Compilación
npm run build

# Producción
npm start

# Migraciones
npm run migration:generate
npm run migration:run
npm run migration:revert

# Seeds
npm run seed

# Pruebas
npm test
npm run test:coverage
```

## Contribución

Este es un proyecto privado para evaluación. Por favor, no compartir ni distribuir el código.

## Licencia

Privada - Todos los derechos reservados

```plaintext

Este README.md proporciona:

1. Instrucciones detalladas de instalación y configuración
2. Ejemplos claros de uso de cada endpoint
3. Comandos para ejecutar las pruebas
4. Una justificación completa de la elección de PostgreSQL
5. Información sobre la estructura del proyecto y scripts disponibles

Para hacer el repositorio privado en GitHub y dar acceso al evaluador:

1. En GitHub, ve a Settings del repositorio
2. En la sección "Danger Zone", asegúrate de que el repositorio esté configurado como Private
3. Ve a Settings > Collaborators
4. Click en "Add people"
5. Busca y añade el usuario "Isaac6702"

¿Necesitas que profundicemos en alguna sección espec
```