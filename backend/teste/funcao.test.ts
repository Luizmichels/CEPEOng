import { describe, it } from 'mocha';
import app, { token } from './app.js';

describe('Função Routes', () => {
  it('POST /funcao/cadastro', async () => {
    const res = await app.post('/funcao/cadastro')
      .set('Authorization', `Bearer ${token.token}`)
      .send({
        NM_FUNCAO: 'Teste',
        DS_FUNCAO: 'Teste'
      })
      .expect(200);
  });

  it('GET /funcao/listar', async () => {
    const res = await app.get('/funcao/listar')
      .set('Authorization', `Bearer ${token.token}`)
      .expect(200);
  });

  it('GET /funcao/listar2', async () => {
    const res = await app.get('/funcao/listar2')
      .set('Authorization', `Bearer ${token.token}`)
      .expect(200);
  });

  it('GET /funcao/obter/7', async () => {
    const res = await app.get('/funcao/obter/7')
      .set('Authorization', `Bearer ${token.token}`)
      .expect(200);
  });

  it('PATCH /funcao/atualizar/7', async () => {
    const res = await app.patch('/funcao/atualizar/7')
      .set('Authorization', `Bearer ${token.token}`)
      .send({
        NM_FUNCAO: 'teste 2', 
        DS_FUNCAO: 'teste 2'
      })
      .expect(200);
      console.log(res.body)
  });

  it('DELETE /funcao/deletar/7', async () => {
    const res = await app.delete('/funcao/deletar/7')
      .set('Authorization', `Bearer ${token.token}`)
      .expect(200);
  });

});
