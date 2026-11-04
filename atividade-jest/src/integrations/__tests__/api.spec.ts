import request from 'supertest';
import app from '../app';

describe('GET /ping', () => {
  it('should return status 200', async () => {
    const response = await request(app).get('/ping');

    expect(response.status).toBe(200);
  });

  it('should return ok in the response body', async () => {
    const response = await request(app).get('/ping');

    expect(response.body).toEqual({ status: 'ok' });
  });

  it('should return JSON content type', async () => {
    const response = await request(app).get('/ping');

    expect(response.headers['content-type']).toMatch(/json/);
  });

  it('should return 404 for an unknown route', async () => {
    const response = await request(app).get('/rota-inexistente');

    expect(response.status).toBe(404);
  });

  it('should return 404 for an unsupported method', async () => {
    const response = await request(app).post('/ping');

    expect(response.status).toBe(404);
  });
});
