import { describe, it } from 'mocha';
import app, { token } from './app.js';

describe('Deficiencia Routes', () => {
  it('POST /deficiencia/cadastro', async () => {
    const res = await app.post('/deficiencia/cadastro')
      .set('Authorization', `Bearer ${token.token}`)
      .send({
        TP_DEFICIENCIA: 'teste', 
        NOMENCLATURA: 'teste'
      })
      .expect(200);
  });

  it('GET /deficiencia/listar', async () => {
    const res = await app.get('/deficiencia/listar')
      .set('Authorization', `Bearer ${token.token}`)
      .expect(200);
  });

  it('GET /deficiencia/obter/1', async () => {
    const res = await app.get('/deficiencia/obter/1')
      .set('Authorization', `Bearer ${token.token}`)
      .expect(200);
  });

  it('PATCH /deficiencia/editar/1', async () => {
    const res = await app.patch('/deficiencia/editar/1')
      .set('Authorization', `Bearer ${token.token}`)
      .send({
        TP_DEFICIENCIA: 'teste 2', 
        NOMENCLATURA: 'teste 2'
      })
      .expect(200);
      console.log(res.body)
  });
  
  it('DELETE /deficiencia/deletar/1', async () => {
    const res = await app.delete('/deficiencia/deletar/1')
      .set('Authorization', `Bearer ${token.token}`)
      .expect(200);
  });

});