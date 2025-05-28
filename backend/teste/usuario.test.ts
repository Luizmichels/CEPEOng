import { describe, it } from 'mocha';
import app, { token } from './app.js';

describe('Usuario Routes', () => {
  it('POST /usuario/login', async () => {
    const res = await app.post('/usuario/login').send({ NM_USUARIO: 'admin', SENHA: '123' }).expect(200);
    token.token = res.body.token
  });

  it('GET /usuario/listar', async () => {
    const res = await app.get('/usuario/listar').set('Authorization', `Bearer ${token.token}`).expect(200);
  });

  it('GET /usuario/obter/1', async () => {
    const res = await app.get('/usuario/obter/1').set('Authorization', `Bearer ${token.token}`).expect(200);
  });

  it('POST /usuario/cadastro', async () => {
    const res = await app.post('/usuario/cadastro').set('Authorization', `Bearer ${token.token}`).send({
      NM_USUARIO: 'teste1',
      SENHA: '123',
      EMAIL: 'teste@email.com'
    }).expect(200);
  });

  it('PATCH /usuario/editar/senha/:CD_USUARIO', async () => {
    const res = await app.patch('/usuario/editar/senha/1').set('Authorization', `Bearer ${token.token}`).send({
      SENHA: '1234',
      CONFIRMASENHA: '1234'
    }).expect(200);
  });

  it('PATCH /usuario/editar/nivel_acesso/:CD_USUARIO', async () => {
    const res = await app.patch('/usuario/editar/nivel_acesso/2').set('Authorization', `Bearer ${token.token}`).send({
      NIVEL_ACESSO: '2'
    }).expect(200);
  });

  it('GET /usuario/buscar/editar/nivel_acesso', async () => {
    const res = await app.get('/usuario/buscar/editar/nivel_acesso').set('Authorization', `Bearer ${token.token}`).expect(200);
  });

  it('GET /usuario/listar/nivel2', async () => {
    const res = await app.get('/usuario/listar/nivel2').set('Authorization', `Bearer ${token.token}`).expect(200);
  });
  
  it('GET /usuario/listar/tecModali', async () => {
    const res = await app.get('/usuario/listar/tecModali').set('Authorization', `Bearer ${token.token}`).expect(200);
  });

  it('POST /usuario/cadastro/tecModali', async () => {
    const res = await app.post('/usuario/cadastro/tecModali').set('Authorization', `Bearer ${token.token}`).send({
      CD_USUARIO: '2',
      CD_MODALIDADE: '1'
    }).expect(200);
  });
  
  it('GET /usuario/obter/tecModali/:CD_TECNICO_MODALIDADE', async () => {
    const res = await app.get('/usuario/obter/tecModali/1').set('Authorization', `Bearer ${token.token}`).expect(200);
  });

  it('PATCH /usuario/editar/tecModali/:CD_TECNICO_MODALIDADE', async () => {
    const res = await app.patch('/usuario/editar/tecModali/1').set('Authorization', `Bearer ${token.token}`).send({
      CD_USUARIO: '2', 
      CD_MODALIDADE: '2'
    }).expect(200);
  });
  
  it('DELETE /usuario/deletar/tecModali/:CD_TECNICO_MODALIDADE', async () => {
    const res = await app.delete('/usuario/deletar/tecModali/1').set('Authorization', `Bearer ${token.token}`).expect(200);
  });

  it('DELETE /usuario/deletar/:CD_USUARIO', async () => {
    const res = await app.delete('/usuario/deletar/2').set('Authorization', `Bearer ${token.token}`).expect(200);
  });
});