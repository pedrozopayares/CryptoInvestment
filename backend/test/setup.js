import dotenv from 'dotenv';
// Load test environment variables
dotenv.config({ path: '.env.test' });
// Mock global logging to avoid console output during tests
globalThis.logging = {
    log: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    warning: jest.fn(),
    error: jest.fn(),
    getCallingFunction: jest.fn(() => 'test')
};
// Set test environment
process.env.NODE_ENV = 'test';
//# sourceMappingURL=setup.js.map