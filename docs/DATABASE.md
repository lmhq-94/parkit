# Base de Datos - Parkit

## Visión General

Parkit utiliza PostgreSQL como base de datos principal con Prisma como ORM. El esquema está diseñado para soportar múltiples empresas (multi-tenant) y gestionar todos los aspectos del sistema de parqueos.

## Esquema de Base de Datos

### Diagrama ER

```
Company (1) ──── (N) User
Company (1) ──── (N) Parking
Company (1) ──── (N) Reservation
Company (1) ──── (N) Event
Company (1) ──── (N) Payment

User (1) ──── (N) Vehicle
User (1) ──── (N) Reservation
User (1) ──── (N) Event
User (1) ──── (N) Payment
User (1) ──── (N) Notification

Vehicle (1) ──── (N) Reservation
Vehicle (1) ──── (N) Event

Parking (1) ──── (N) Reservation
Parking (1) ──── (N) Event

Reservation (1) ──── (N) Event
Reservation (1) ──── (N) Payment

Event (1) ──── (N) Evidence
```

## Tablas Principales

### 1. Company
Almacena información de las empresas que utilizan el sistema.

```sql
CREATE TABLE companies (
  id VARCHAR(25) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(255),
  website VARCHAR(255),
  logo VARCHAR(255),
  tax_id VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Campos importantes:**
- `id`: Identificador único (CUID)
- `name`: Nombre de la empresa
- `address`: Dirección física
- `is_active`: Estado activo/inactivo

### 2. User
Usuarios del sistema con diferentes roles.

```sql
CREATE TABLE users (
  id VARCHAR(25) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  avatar VARCHAR(255),
  role user_role NOT NULL DEFAULT 'CLIENT',
  is_active BOOLEAN DEFAULT true,
  company_id VARCHAR(25) REFERENCES companies(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Roles disponibles:**
- `ADMIN`: Administrador del sistema
- `MANAGER`: Gerente de empresa
- `EMPLOYEE`: Empleado
- `CLIENT`: Cliente
- `VALET`: Valet parking

### 3. Vehicle
Vehículos registrados en el sistema.

```sql
CREATE TABLE vehicles (
  id VARCHAR(25) PRIMARY KEY,
  license_plate VARCHAR(20) UNIQUE NOT NULL,
  brand VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year INTEGER,
  color VARCHAR(50),
  vin VARCHAR(17),
  is_active BOOLEAN DEFAULT true,
  user_id VARCHAR(25) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Parking
Espacios de estacionamiento disponibles.

```sql
CREATE TABLE parkings (
  id VARCHAR(25) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  location VARCHAR(255) NOT NULL,
  floor VARCHAR(10),
  section VARCHAR(50),
  spot_number VARCHAR(20) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  status parking_status DEFAULT 'AVAILABLE',
  hourly_rate DECIMAL(10,2) DEFAULT 0,
  daily_rate DECIMAL(10,2) DEFAULT 0,
  company_id VARCHAR(25) NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(company_id, spot_number)
);
```

**Estados de parqueo:**
- `AVAILABLE`: Disponible
- `OCCUPIED`: Ocupado
- `RESERVED`: Reservado
- `MAINTENANCE`: En mantenimiento
- `DISABLED`: Deshabilitado

### 5. Reservation
Reservas de espacios de parqueo.

```sql
CREATE TABLE reservations (
  id VARCHAR(25) PRIMARY KEY,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  status reservation_status DEFAULT 'PENDING',
  notes TEXT,
  user_id VARCHAR(25) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  vehicle_id VARCHAR(25) NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  parking_id VARCHAR(25) NOT NULL REFERENCES parkings(id) ON DELETE CASCADE,
  company_id VARCHAR(25) NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Estados de reserva:**
- `PENDING`: Pendiente de confirmación
- `CONFIRMED`: Confirmada
- `CANCELLED`: Cancelada
- `COMPLETED`: Completada
- `EXPIRED`: Expirada

### 6. Event
Registro de eventos del sistema.

```sql
CREATE TABLE events (
  id VARCHAR(25) PRIMARY KEY,
  type event_type NOT NULL,
  description TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  metadata JSONB,
  user_id VARCHAR(25) REFERENCES users(id) ON DELETE SET NULL,
  vehicle_id VARCHAR(25) REFERENCES vehicles(id) ON DELETE SET NULL,
  parking_id VARCHAR(25) REFERENCES parkings(id) ON DELETE SET NULL,
  reservation_id VARCHAR(25) REFERENCES reservations(id) ON DELETE SET NULL,
  company_id VARCHAR(25) NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Tipos de eventos:**
- `ENTRY`: Entrada de vehículo
- `EXIT`: Salida de vehículo
- `RESERVATION_CREATED`: Reserva creada
- `RESERVATION_CANCELLED`: Reserva cancelada
- `PAYMENT_RECEIVED`: Pago recibido
- `EVIDENCE_ADDED`: Evidencia agregada

### 7. Evidence
Evidencias fotográficas y documentos.

```sql
CREATE TABLE evidences (
  id VARCHAR(25) PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  url TEXT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  size INTEGER,
  description TEXT,
  event_id VARCHAR(25) NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 8. Payment
Registro de pagos realizados.

```sql
CREATE TABLE payments (
  id VARCHAR(25) PRIMARY KEY,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  status payment_status DEFAULT 'PENDING',
  method payment_method NOT NULL,
  transaction_id VARCHAR(255),
  description TEXT,
  user_id VARCHAR(25) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reservation_id VARCHAR(25) REFERENCES reservations(id) ON DELETE SET NULL,
  company_id VARCHAR(25) NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 9. QRCode
Códigos QR para identificación rápida.

```sql
CREATE TABLE qr_codes (
  id VARCHAR(25) PRIMARY KEY,
  code VARCHAR(255) UNIQUE NOT NULL,
  type VARCHAR(50) NOT NULL,
  reference_id VARCHAR(25) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 10. Notification
Notificaciones del sistema.

```sql
CREATE TABLE notifications (
  id VARCHAR(25) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) NOT NULL,
  is_read BOOLEAN DEFAULT false,
  metadata JSONB,
  user_id VARCHAR(25) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Índices Recomendados

```sql
-- Índices para búsquedas frecuentes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_company ON users(company_id);
CREATE INDEX idx_vehicles_license_plate ON vehicles(license_plate);
CREATE INDEX idx_vehicles_user ON vehicles(user_id);
CREATE INDEX idx_parkings_company ON parkings(company_id);
CREATE INDEX idx_parkings_status ON parkings(status);
CREATE INDEX idx_reservations_user ON reservations(user_id);
CREATE INDEX idx_reservations_parking ON reservations(parking_id);
CREATE INDEX idx_reservations_dates ON reservations(start_time, end_time);
CREATE INDEX idx_events_company ON events(company_id);
CREATE INDEX idx_events_timestamp ON events(timestamp);
CREATE INDEX idx_payments_user ON payments(user_id);
CREATE INDEX idx_qr_codes_code ON qr_codes(code);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);

-- Índices compuestos
CREATE INDEX idx_parkings_company_status ON parkings(company_id, status);
CREATE INDEX idx_reservations_company_dates ON reservations(company_id, start_time, end_time);
```

## Migraciones

### Crear una nueva migración

```bash
cd packages/database
yarn prisma migrate dev --name add_new_feature
```

### Aplicar migraciones en producción

```bash
yarn prisma migrate deploy
```

### Resetear base de datos

```bash
yarn prisma migrate reset
```

## Seed Data

El archivo `prisma/seed.ts` contiene datos de ejemplo para desarrollo:

- Empresas de ejemplo
- Usuarios con diferentes roles
- Vehículos de prueba
- Espacios de parqueo
- Reservas de ejemplo

Para ejecutar el seed:

```bash
yarn seed
```

## Consideraciones de Rendimiento

### Consultas Optimizadas

1. **Búsqueda de parqueos disponibles:**
```sql
SELECT * FROM parkings 
WHERE company_id = $1 
  AND status = 'AVAILABLE' 
  AND is_active = true;
```

2. **Reservas por usuario:**
```sql
SELECT r.*, p.name as parking_name, v.license_plate 
FROM reservations r
JOIN parkings p ON r.parking_id = p.id
JOIN vehicles v ON r.vehicle_id = v.id
WHERE r.user_id = $1
ORDER BY r.start_time DESC;
```

3. **Eventos recientes:**
```sql
SELECT e.*, u.first_name, u.last_name, v.license_plate
FROM events e
LEFT JOIN users u ON e.user_id = u.id
LEFT JOIN vehicles v ON e.vehicle_id = v.id
WHERE e.company_id = $1
ORDER BY e.timestamp DESC
LIMIT 50;
```

### Particionamiento

Para tablas con muchos datos (events, payments), considerar particionamiento por fecha:

```sql
-- Particionamiento de eventos por mes
CREATE TABLE events_2024_01 PARTITION OF events
FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');
```

### Backup y Recuperación

```bash
# Backup
pg_dump parkit_db > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore
psql parkit_db < backup_file.sql
```

## Monitoreo

### Consultas de Monitoreo

```sql
-- Espacios más utilizados
SELECT p.name, COUNT(r.id) as reservation_count
FROM parkings p
LEFT JOIN reservations r ON p.id = r.parking_id
WHERE p.company_id = $1
GROUP BY p.id, p.name
ORDER BY reservation_count DESC;

-- Usuarios más activos
SELECT u.first_name, u.last_name, COUNT(r.id) as reservation_count
FROM users u
LEFT JOIN reservations r ON u.id = r.user_id
WHERE u.company_id = $1
GROUP BY u.id, u.first_name, u.last_name
ORDER BY reservation_count DESC;

-- Ingresos por período
SELECT DATE(created_at) as date, SUM(amount) as total_revenue
FROM payments
WHERE company_id = $1 AND status = 'PAID'
GROUP BY DATE(created_at)
ORDER BY date DESC;
``` 