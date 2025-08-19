import { describe, test, expect } from '@jest/globals';
describe('Configuration Tests', () => {
    test('should load environment variables correctly', () => {
        expect(process.env.NODE_ENV).toBe('test');
    });
    test('should have global logging available', () => {
        expect(globalThis.logging).toBeDefined();
        expect(typeof globalThis.logging.log).toBe('function');
    });
});
//# sourceMappingURL=config.test.js.map