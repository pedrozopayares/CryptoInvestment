import '@testing-library/jest-dom';
import { getCsrfToken } from '../services/axios';

test('CSRF Token',async () =>{
    const result = await getCsrfToken();
    expect(result.data.status).toBe(204);
});
