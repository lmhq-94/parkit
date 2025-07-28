import {
  EventType,
  ParkingStatus,
  PaymentMethod,
  PaymentStatus,
  PrismaClient,
  ReservationStatus,
  UserRole,
} from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create companies
  let company1 = await prisma.company.findFirst({
    where: { email: 'info@techcorp.com' },
  });

  if (!company1) {
    company1 = await prisma.company.create({
      data: {
        name: 'TechCorp Solutions',
        description: 'Empresa de tecnología con sede en San Francisco',
        address: '123 Tech Street, San Francisco, CA 94105',
        phone: '+1-555-0123',
        email: 'info@techcorp.com',
        website: 'https://techcorp.com',
        taxId: 'TAX123456789',
      },
    });
  }

  let company2 = await prisma.company.findFirst({
    where: { email: 'contact@innovationlabs.com' },
  });

  if (!company2) {
    company2 = await prisma.company.create({
      data: {
        name: 'Innovation Labs',
        description: 'Centro de innovación y desarrollo',
        address: '456 Innovation Ave, San Francisco, CA 94102',
        phone: '+1-555-0456',
        email: 'contact@innovationlabs.com',
        website: 'https://innovationlabs.com',
        taxId: 'TAX987654321',
      },
    });
  }

  console.log('✅ Companies created');

  // Create users with hashed passwords
  const adminPassword = await hash('admin123', 12);
  const userPassword = await hash('user123', 12);
  const valetPassword = await hash('valet123', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@techcorp.com' },
    update: {},
    create: {
      email: 'admin@techcorp.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      phone: '+1-555-0001',
      role: UserRole.ADMIN,
      companyId: company1.id,
    },
  });

  const manager = await prisma.user.upsert({
    where: { email: 'manager@techcorp.com' },
    update: {},
    create: {
      email: 'manager@techcorp.com',
      password: userPassword,
      firstName: 'Manager',
      lastName: 'User',
      phone: '+1-555-0002',
      role: UserRole.MANAGER,
      companyId: company1.id,
    },
  });

  const employee = await prisma.user.upsert({
    where: { email: 'employee@techcorp.com' },
    update: {},
    create: {
      email: 'employee@techcorp.com',
      password: userPassword,
      firstName: 'Employee',
      lastName: 'User',
      phone: '+1-555-0003',
      role: UserRole.EMPLOYEE,
      companyId: company1.id,
    },
  });

  const client = await prisma.user.upsert({
    where: { email: 'client@techcorp.com' },
    update: {},
    create: {
      email: 'client@techcorp.com',
      password: userPassword,
      firstName: 'Client',
      lastName: 'User',
      phone: '+1-555-0004',
      role: UserRole.CLIENT,
      companyId: company1.id,
    },
  });

  const valet = await prisma.user.upsert({
    where: { email: 'valet@techcorp.com' },
    update: {},
    create: {
      email: 'valet@techcorp.com',
      password: valetPassword,
      firstName: 'Valet',
      lastName: 'User',
      phone: '+1-555-0005',
      role: UserRole.VALET,
      companyId: company1.id,
    },
  });

  console.log('✅ Users created');

  // Create vehicles
  let vehicle1 = await prisma.vehicle.findFirst({
    where: { licensePlate: 'ABC123' },
  });

  if (!vehicle1) {
    vehicle1 = await prisma.vehicle.create({
      data: {
        licensePlate: 'ABC123',
        brand: 'Toyota',
        model: 'Camry',
        year: 2020,
        color: 'Silver',
        vin: '1HGBH41JXMN109186',
        userId: client.id,
      },
    });
  }

  let vehicle2 = await prisma.vehicle.findFirst({
    where: { licensePlate: 'XYZ789' },
  });

  if (!vehicle2) {
    vehicle2 = await prisma.vehicle.create({
      data: {
        licensePlate: 'XYZ789',
        brand: 'Honda',
        model: 'Civic',
        year: 2019,
        color: 'Blue',
        vin: '2T1BURHE0JC123456',
        userId: employee.id,
      },
    });
  }

  console.log('✅ Vehicles created');

  // Create parking spots
  let parking1 = await prisma.parking.findFirst({
    where: {
      companyId: company1.id,
      spotNumber: 'A1'
    },
  });

  if (!parking1) {
    parking1 = await prisma.parking.create({
      data: {
        name: 'P1-A1',
        description: 'Plaza 1, Nivel A, Espacio 1',
        location: 'Nivel A',
        floor: 'A',
        section: 'P1',
        spotNumber: 'A1',
        status: ParkingStatus.AVAILABLE,
        hourlyRate: 5.0,
        dailyRate: 50.0,
        companyId: company1.id,
      },
    });
  }

  let parking2 = await prisma.parking.findFirst({
    where: {
      companyId: company1.id,
      spotNumber: 'A2'
    },
  });

  if (!parking2) {
    parking2 = await prisma.parking.create({
      data: {
        name: 'P1-A2',
        description: 'Plaza 1, Nivel A, Espacio 2',
        location: 'Nivel A',
        floor: 'A',
        section: 'P1',
        spotNumber: 'A2',
        status: ParkingStatus.AVAILABLE,
        hourlyRate: 5.0,
        dailyRate: 50.0,
        companyId: company1.id,
      },
    });
  }

  let parking3 = await prisma.parking.findFirst({
    where: {
      companyId: company1.id,
      spotNumber: 'B1'
    },
  });

  if (!parking3) {
    parking3 = await prisma.parking.create({
      data: {
        name: 'P1-B1',
        description: 'Plaza 1, Nivel B, Espacio 1',
        location: 'Nivel B',
        floor: 'B',
        section: 'P1',
        spotNumber: 'B1',
        status: ParkingStatus.OCCUPIED,
        hourlyRate: 4.0,
        dailyRate: 40.0,
        companyId: company1.id,
      },
    });
  }

  console.log('✅ Parking spots created');

  // Create reservations
  const reservation1 = await prisma.reservation.create({
    data: {
      startTime: new Date('2024-01-15T09:00:00Z'),
      endTime: new Date('2024-01-15T17:00:00Z'),
      status: ReservationStatus.CONFIRMED,
      notes: 'Reserva para reunión de trabajo',
      userId: client.id,
      vehicleId: vehicle1.id,
      parkingId: parking1.id,
      companyId: company1.id,
    },
  });

  const reservation2 = await prisma.reservation.create({
    data: {
      startTime: new Date('2024-01-16T08:00:00Z'),
      endTime: new Date('2024-01-16T18:00:00Z'),
      status: ReservationStatus.PENDING,
      notes: 'Reserva para día completo',
      userId: employee.id,
      vehicleId: vehicle2.id,
      parkingId: parking2.id,
      companyId: company1.id,
    },
  });

  console.log('✅ Reservations created');

  // Create events
  const event1 = await prisma.event.create({
    data: {
      type: EventType.RESERVATION_CREATED,
      description: 'Reserva creada para el cliente',
      userId: client.id,
      vehicleId: vehicle1.id,
      parkingId: parking1.id,
      reservationId: reservation1.id,
      companyId: company1.id,
    },
  });

  const event2 = await prisma.event.create({
    data: {
      type: EventType.ENTRY,
      description: 'Vehículo ingresó al parqueo',
      userId: valet.id,
      vehicleId: vehicle1.id,
      parkingId: parking1.id,
      reservationId: reservation1.id,
      companyId: company1.id,
    },
  });

  console.log('✅ Events created');

  // Create payments
  const payment1 = await prisma.payment.create({
    data: {
      amount: 40.0,
      currency: 'USD',
      status: PaymentStatus.PAID,
      method: PaymentMethod.CREDIT_CARD,
      transactionId: 'TXN123456789',
      description: 'Pago por reserva de parqueo',
      userId: client.id,
      reservationId: reservation1.id,
      companyId: company1.id,
    },
  });

  console.log('✅ Payments created');

  // Create QR codes
  let qrCode1 = await prisma.qRCode.findFirst({
    where: { code: 'PARKIT_QR_001' },
  });

  if (!qrCode1) {
    qrCode1 = await prisma.qRCode.create({
      data: {
        code: 'PARKIT_QR_001',
        type: 'PARKING',
        referenceId: parking1.id,
        expiresAt: new Date('2024-12-31T23:59:59Z'),
      },
    });
  }

  let qrCode2 = await prisma.qRCode.findFirst({
    where: { code: 'PARKIT_QR_002' },
  });

  if (!qrCode2) {
    qrCode2 = await prisma.qRCode.create({
      data: {
        code: 'PARKIT_QR_002',
        type: 'RESERVATION',
        referenceId: reservation1.id,
        expiresAt: new Date('2024-01-15T23:59:59Z'),
      },
    });
  }

  console.log('✅ QR codes created');

  // Create notifications
  const notification1 = await prisma.notification.create({
    data: {
      title: 'Reserva Confirmada',
      message: 'Tu reserva para el espacio P1-A1 ha sido confirmada',
      type: 'SUCCESS',
      userId: client.id,
    },
  });

  const notification2 = await prisma.notification.create({
    data: {
      title: 'Recordatorio de Reserva',
      message: 'Tu reserva comienza en 30 minutos',
      type: 'INFO',
      userId: client.id,
    },
  });

  console.log('✅ Notifications created');

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch(e => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
