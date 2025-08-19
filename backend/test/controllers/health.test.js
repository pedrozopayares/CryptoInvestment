import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import { application } from '../../server.js';
describe('Health Check Endpoint', () => {
    test('GET /main/healthcheck should return 200', async () => {
        const response = await request(application)
            .get('/main/healthcheck')
            .expect(200);
        expect(response.body).toEqual({ status: 'ok' });
    });
});
//# sourceMappingURL=health.test.js.map