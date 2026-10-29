import request from 'supertest';
import router from '../routes/user.routes';
 
describe('Testando a rota /somar', () => {
    it('deve retornar o resultado 5 quando a=2 e b=3', async () => {
        const response = await request(router)
            .get('/somar')
            .send({ a: 2, b: 3 });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ resultado: 5 });
    });
    it ('deve retornar o resultado 5 quando a=2 e b=2', async () => {
        const response = await request(router)
            .get('/somar')
            .send({ a: 2, b: 2 });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ resultado: 4 });
    });
    it ('deve retornar o resultado 5 quando a=2 e b=4', async () => {
        const response = await request(router)
            .get('/somar')
            .send({ a: 2, b: 4 });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ resultado: 5 });
    });
});
