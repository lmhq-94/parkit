import { PrismaClient } from '@parkit/database';
import { UserRole } from '@parkit/shared';
import { AuthService } from '../utils/auth';

const prisma = new PrismaClient();

export interface TestUser {
  id: string;
  email: string;
  role: UserRole;
  companyId: string;
  token: string;
}

export class TestUtils {
  static async createTestUser(role: UserRole = UserRole.EMPLOYEE): Promise<TestUser> {
    const company = await prisma.company.create({
      data: {
        name: `Test Company ${Date.now()}`,
        address: 'Test Address',
      },
    });

    const hashedPassword = await AuthService.hashPassword('test123');
    const user = await prisma.user.create({
      data: {
        email: `test-${Date.now()}@example.com`,
        password: hashedPassword,
        firstName: 'Test',
        lastName: 'User',
        role,
        companyId: company.id,
      },
    });

    const token = AuthService.generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      companyId: user.companyId,
    });

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      companyId: user.companyId,
      token,
    };
  }

  static async cleanupTestData(): Promise<void> {
    await prisma.event.deleteMany();
    await prisma.payment.deleteMany();
    await prisma.reservation.deleteMany();
    await prisma.vehicle.deleteMany();
    await prisma.parking.deleteMany();
    await prisma.user.deleteMany();
    await prisma.company.deleteMany();
    await prisma.qRCode.deleteMany();
    await prisma.notification.deleteMany();
  }

  static async createTestParking(companyId: string) {
    return await prisma.parking.create({
      data: {
        name: 'Test Parking',
        description: 'Test parking space',
        location: 'Test Location',
        floor: '1',
        section: 'A',
        spotNumber: 'A1',
        hourlyRate: 5.0,
        dailyRate: 50.0,
        companyId,
      },
    });
  }

  static async createTestVehicle(userId: string) {
    return await prisma.vehicle.create({
      data: {
        licensePlate: `TEST-${Date.now()}`,
        brand: 'Test Brand',
        model: 'Test Model',
        year: 2020,
        color: 'Test Color',
        userId,
      },
    });
  }

  static async createTestReservation(userId: string, vehicleId: string, parkingId: string) {
    return await prisma.reservation.create({
      data: {
        startTime: new Date(),
        endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours later
        userId,
        vehicleId,
        parkingId,
        companyId: (await prisma.user.findUnique({ where: { id: userId } }))!.companyId,
      },
    });
  }
}

export { prisma };
