import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { config } from '../config';
import { logger } from '../utils/logger';

const prisma = new PrismaClient();

async function main() {
  logger.info('🌱 Iniciando seed de la base de datos...');

  try {
    // Crear roles
    logger.info('📝 Creando roles...');
    const adminRole = await prisma.role.upsert({
      where: { name: UserRole.ADMIN },
      update: {},
      create: {
        name: UserRole.ADMIN,
        description: 'Administrador del sistema',
        permissions: [
          'user:read', 'user:write', 'user:delete',
          'company:read', 'company:write', 'company:delete',
          'parking:read', 'parking:write', 'parking:delete',
          'reservation:read', 'reservation:write', 'reservation:delete',
          'payment:read', 'payment:write', 'payment:delete',
          'report:read', 'report:write',
          'system:admin'
        ],
      },
    });

    const managerRole = await prisma.role.upsert({
      where: { name: UserRole.MANAGER },
      update: {},
      create: {
        name: UserRole.MANAGER,
        description: 'Gerente de operaciones',
        permissions: [
          'user:read', 'user:write',
          'parking:read', 'parking:write',
          'reservation:read', 'reservation:write',
          'payment:read', 'payment:write',
          'report:read'
        ],
      },
    });

    const valetRole = await prisma.role.upsert({
      where: { name: UserRole.VALET },
      update: {},
      create: {
        name: UserRole.VALET,
        description: 'Valet parking',
        permissions: [
          'parking:read',
          'reservation:read', 'reservation:write',
          'event:read', 'event:write'
        ],
      },
    });

    await prisma.role.upsert({
      where: { name: UserRole.EMPLOYEE },
      update: {},
      create: {
        name: UserRole.EMPLOYEE,
        description: 'Empleado',
        permissions: [
          'parking:read',
          'reservation:read'
        ],
      },
    });

    const clientRole = await prisma.role.upsert({
      where: { name: UserRole.CLIENT },
      update: {},
      create: {
        name: UserRole.CLIENT,
        description: 'Cliente',
        permissions: [
          'reservation:read', 'reservation:write',
          'payment:read', 'payment:write',
          'vehicle:read', 'vehicle:write'
        ],
      },
    });

    // Crear empresa
    logger.info('🏢 Creando empresa...');
    const company = await prisma.company.upsert({
      where: { id: 'company-1' },
      update: {},
      create: {
        id: 'company-1',
        name: 'ParkIt Demo Company',
        description: 'Empresa de demostración para ParkIt',
        address: '123 Main Street, Demo City, DC 12345',
        phone: '+1-555-0123',
        email: 'info@parkit-demo.com',
        website: 'https://parkit-demo.com',
        logo: 'https://via.placeholder.com/150x50/0066CC/FFFFFF?text=ParkIt',
      },
    });

    // Crear usuarios
    logger.info('👥 Creando usuarios...');
    const hashedPassword = await bcrypt.hash('password123', config.auth.bcryptRounds);

    await prisma.user.upsert({
      where: { email: 'admin@parkit.com' },
      update: {},
      create: {
        email: 'admin@parkit.com',
        phone: '+1-555-0001',
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'User',
        isVerified: true,
        companyId: company.id,
        roleId: adminRole.id,
      },
    });

    await prisma.user.upsert({
      where: { email: 'manager@parkit.com' },
      update: {},
      create: {
        email: 'manager@parkit.com',
        phone: '+1-555-0002',
        password: hashedPassword,
        firstName: 'Manager',
        lastName: 'User',
        isVerified: true,
        companyId: company.id,
        roleId: managerRole.id,
      },
    });

    await prisma.user.upsert({
      where: { email: 'valet@parkit.com' },
      update: {},
      create: {
        email: 'valet@parkit.com',
        phone: '+1-555-0003',
        password: hashedPassword,
        firstName: 'Valet',
        lastName: 'User',
        isVerified: true,
        companyId: company.id,
        roleId: valetRole.id,
      },
    });

    const clientUser = await prisma.user.upsert({
      where: { email: 'client@parkit.com' },
      update: {},
      create: {
        email: 'client@parkit.com',
        phone: '+1-555-0004',
        password: hashedPassword,
        firstName: 'Client',
        lastName: 'User',
        isVerified: true,
        companyId: company.id,
        roleId: clientRole.id,
      },
    });

    // Crear vehículos
    logger.info('🚗 Creando vehículos...');
    const vehicle1 = await prisma.vehicle.upsert({
      where: { licensePlate: 'ABC123' },
      update: {},
      create: {
        licensePlate: 'ABC123',
        make: 'Toyota',
        model: 'Camry',
        year: 2020,
        color: 'Silver',
        vin: '1HGBH41JXMN109186',
        userId: clientUser.id,
      },
    });

    const vehicle2 = await prisma.vehicle.upsert({
      where: { licensePlate: 'XYZ789' },
      update: {},
      create: {
        licensePlate: 'XYZ789',
        make: 'Honda',
        model: 'Civic',
        year: 2019,
        color: 'Blue',
        vin: '2T1BURHE0JC123456',
        userId: clientUser.id,
      },
    });

    // Crear parqueos
    logger.info('🅿️ Creando parqueos...');
    const parking1 = await prisma.parking.upsert({
      where: { id: 'parking-1' },
      update: {},
      create: {
        id: 'parking-1',
        name: 'Estacionamiento Principal',
        description: 'Estacionamiento principal del edificio',
        address: '123 Main Street, Demo City',
        latitude: 40.7128,
        longitude: -74.0060,
        floor: 1,
        section: 'A',
        spot: 'A1',
        zone: 'Principal',
        status: 'AVAILABLE',
        capacity: 1,
        price: 5.00,
        currency: 'USD',
        companyId: company.id,
      },
    });

    const parking2 = await prisma.parking.upsert({
      where: { id: 'parking-2' },
      update: {},
      create: {
        id: 'parking-2',
        name: 'Estacionamiento VIP',
        description: 'Estacionamiento VIP con servicios premium',
        address: '123 Main Street, Demo City',
        latitude: 40.7128,
        longitude: -74.0060,
        floor: 2,
        section: 'VIP',
        spot: 'VIP1',
        zone: 'Premium',
        status: 'AVAILABLE',
        capacity: 1,
        price: 10.00,
        currency: 'USD',
        companyId: company.id,
      },
    });

    await prisma.parking.upsert({
      where: { id: 'parking-3' },
      update: {},
      create: {
        id: 'parking-3',
        name: 'Estacionamiento Económico',
        description: 'Estacionamiento económico para clientes regulares',
        address: '123 Main Street, Demo City',
        latitude: 40.7128,
        longitude: -74.0060,
        floor: -1,
        section: 'B',
        spot: 'B1',
        zone: 'Económico',
        status: 'OCCUPIED',
        capacity: 1,
        price: 3.00,
        currency: 'USD',
        companyId: company.id,
      },
    });

    // Crear reservas
    logger.info('📅 Creando reservas...');
    const reservation1 = await prisma.reservation.upsert({
      where: { id: 'reservation-1' },
      update: {},
      create: {
        id: 'reservation-1',
        startTime: new Date('2024-01-15T10:00:00Z'),
        endTime: new Date('2024-01-15T18:00:00Z'),
        status: 'CONFIRMED',
        totalPrice: 40.00,
        notes: 'Reserva para cliente VIP',
        userId: clientUser.id,
        vehicleId: vehicle1.id,
        parkingId: parking2.id,
        companyId: company.id,
      },
    });

    await prisma.reservation.upsert({
      where: { id: 'reservation-2' },
      update: {},
      create: {
        id: 'reservation-2',
        startTime: new Date('2024-01-16T09:00:00Z'),
        endTime: new Date('2024-01-16T17:00:00Z'),
        status: 'PENDING',
        totalPrice: 24.00,
        notes: 'Reserva regular',
        userId: clientUser.id,
        vehicleId: vehicle2.id,
        parkingId: parking1.id,
        companyId: company.id,
      },
    });

    // Crear pagos
    logger.info('💳 Creando pagos...');
    const payment1 = await prisma.payment.upsert({
      where: { id: 'payment-1' },
      update: {},
      create: {
        id: 'payment-1',
        amount: 40.00,
        currency: 'USD',
        method: 'CREDIT_CARD',
        status: 'PAID',
        transactionId: 'txn_123456789',
        description: 'Pago por reserva VIP',
        metadata: {
          stripe_payment_intent: 'pi_123456789',
          card_last4: '4242',
        },
        userId: clientUser.id,
        reservationId: reservation1.id,
      },
    });

    // Crear eventos
    logger.info('📊 Creando eventos...');
    await prisma.event.upsert({
      where: { id: 'event-1' },
      update: {},
      create: {
        id: 'event-1',
        type: 'ENTRY',
        timestamp: new Date('2024-01-15T10:00:00Z'),
        metadata: {
          location: 'Entrada principal',
          temperature: 22,
        },
        userId: clientUser.id,
        vehicleId: vehicle1.id,
        parkingId: parking2.id,
        reservationId: reservation1.id,
      },
    });

    // Crear notificaciones
    logger.info('🔔 Creando notificaciones...');
    await prisma.notification.upsert({
      where: { id: 'notification-1' },
      update: {},
      create: {
        id: 'notification-1',
        title: 'Reserva Confirmada',
        message: 'Tu reserva para el estacionamiento VIP ha sido confirmada',
        type: 'RESERVATION',
        priority: 'HIGH',
        isRead: false,
        metadata: {
          reservationId: reservation1.id,
          parkingName: parking2.name,
        },
        userId: clientUser.id,
      },
    });

    await prisma.notification.upsert({
      where: { id: 'notification-2' },
      update: {},
      create: {
        id: 'notification-2',
        title: 'Pago Exitoso',
        message: 'Tu pago de $40.00 ha sido procesado exitosamente',
        type: 'PAYMENT',
        priority: 'MEDIUM',
        isRead: true,
        metadata: {
          paymentId: payment1.id,
          amount: 40.00,
          currency: 'USD',
        },
        userId: clientUser.id,
      },
    });

    // Crear códigos QR
    logger.info('📱 Creando códigos QR...');
    await prisma.qRCode.upsert({
      where: { id: 'qr-1' },
      update: {},
      create: {
        id: 'qr-1',
        code: 'PARKIT_PARKING_001',
        type: 'parking',
        isActive: true,
        parkingId: parking1.id,
      },
    });

    await prisma.qRCode.upsert({
      where: { id: 'qr-2' },
      update: {},
      create: {
        id: 'qr-2',
        code: 'PARKIT_RESERVATION_001',
        type: 'reservation',
        isActive: true,
        expiresAt: new Date('2024-12-31T23:59:59Z'),
        userId: clientUser.id,
      },
    });

    logger.info('✅ Seed completado exitosamente!');
    logger.info('📋 Resumen de datos creados:');
    logger.info(`   - 5 roles creados`);
    logger.info(`   - 1 empresa creada`);
    logger.info(`   - 4 usuarios creados`);
    logger.info(`   - 2 vehículos creados`);
    logger.info(`   - 3 parqueos creados`);
    logger.info(`   - 2 reservas creadas`);
    logger.info(`   - 1 pago creado`);
    logger.info(`   - 1 evento creado`);
    logger.info(`   - 2 notificaciones creadas`);
    logger.info(`   - 2 códigos QR creados`);

    logger.info('🔑 Credenciales de acceso:');
    logger.info('   Admin: admin@parkit.com / password123');
    logger.info('   Manager: manager@parkit.com / password123');
    logger.info('   Valet: valet@parkit.com / password123');
    logger.info('   Client: client@parkit.com / password123');

  } catch (error) {
    logger.error('❌ Error durante el seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    logger.error('❌ Error fatal durante el seed:', error);
    process.exit(1);
  }); 