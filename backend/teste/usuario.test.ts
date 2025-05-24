import { describe, it } from 'mocha';
import app from './app.js';

describe('Usuario Routes', () => {
  it('POST /usuario/login', async () => {
    const res = await app.post('/usuario/login').send({ NM_USUARIO: 'admin', SENHA: '123' }).expect(500);
    console.log(res.body)
  });

  it('GET /usuario/listar', async () => {
    const res = await app.get('/usuario/listar').expect(500);
  });
});
