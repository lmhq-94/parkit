// Configure environment variables for testing
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/parkit_test';
process.env.JWT_SECRET = 'test-jwt-secret-key';
process.env.REDIS_URL = 'redis://localhost:6379';

// Mock logger to avoid logs in tests
jest.mock('../utils/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  },
}));

// Mock Redis
jest.mock('redis', () => ({
  createClient: jest.fn(() => ({
    connect: jest.fn(),
    disconnect: jest.fn(),
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
    on: jest.fn(),
  })),
}));

// Global configuration for tests
global.beforeAll(async () => {
  // Database test configuration can be set up here
});

global.afterAll(async () => {
  // Cleanup after all tests
});

global.beforeEach(async () => {
  // Setup before each test
});

global.afterEach(async () => {
  // Cleanup after each test
}); 