import { describe, it } from 'mocha';
import app, { token } from './app.js';

describe('Deficiencia Routes', () => {
  it('POST /modalidade/cadastro', async () => {
    const res = await app.post('/modalidade/cadastro')
      .set('Authorization', `Bearer ${token.token}`)
      .send({
        NM_MODALIDADE: 'teste', 
        NOMENCLATURA: 'teste'
      })
      .expect(200);
  });

  it('GET /modalidade/listar', async () => {
    const res = await app.get('/modalidade/listar')
      .set('Authorization', `Bearer ${token.token}`)
      .expect(200);
  });

  it('GET /modalidade/obter/2', async () => {
    const res = await app.get('/modalidade/obter/2')
      .set('Authorization', `Bearer ${token.token}`)
      .expect(200);
  });

  it('PATCH /modalidade/editar/2', async () => {
    const res = await app.patch('/modalidade/editar/2')
      .set('Authorization', `Bearer ${token.token}`)
      .send({
        NM_MODALIDADE: 'teste 2', 
        NOMENCLATURA: 'teste 2'
      })
      .expect(200);
      console.log(res.body)
  });
  
  it('DELETE /modalidade/deletar/2', async () => {
    const res = await app.delete('/modalidade/deletar/2')
      .set('Authorization', `Bearer ${token.token}`)
      .expect(200);
  });

});