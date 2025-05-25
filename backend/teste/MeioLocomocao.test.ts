import { describe, it } from 'mocha';
import app, { token } from './app.js';

describe('Função Routes', () => {
  it('POST /meioLocomocao/cadastro', async () => {
    const res = await app.post('/meioLocomocao/cadastro')
      .set('Authorization', `Bearer ${token.token}`)
      .send({
        NM_MEIO_LOCOMOCAO: 'Teste',
        DS_MEIO_LOCOMOCAO: 'Teste'
      })
      .expect(200);
  });

  it('GET /meioLocomocao/listar', async () => {
    const res = await app.get('/meioLocomocao/listar')
      .set('Authorization', `Bearer ${token.token}`)
      .expect(200);
  });

  it('GET /meioLocomocao/obter/3', async () => {
    const res = await app.get('/meioLocomocao/obter/3')
      .set('Authorization', `Bearer ${token.token}`)
      .expect(200);
  });

  it('PATCH /meioLocomocao/editar/3', async () => {
    const res = await app.patch('/meioLocomocao/editar/3')
      .set('Authorization', `Bearer ${token.token}`)
      .send({
        NM_MEIO_LOCOMOCAO: 'teste 2', 
        DS_MEIO_LOCOMOCAO: 'teste 2'
      })
      .expect(200);
      console.log(res.body)
  });

  it('DELETE /meioLocomocao/deletar/3', async () => {
    const res = await app.delete('/meioLocomocao/deletar/3')
      .set('Authorization', `Bearer ${token.token}`)
      .expect(200);
  });

});
