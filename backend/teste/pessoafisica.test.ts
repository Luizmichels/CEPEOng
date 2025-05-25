import { describe, it } from 'mocha';
import app, { token } from './app.js';

describe('Pessoa fisica Routes', () => {
  it('GET /associado/cadastrato', async () => {
    const res = await app.get('/associado/cadastrato').set('Authorization', `Bearer ${token.token}`).expect(200);
  });

  it('GET /associado/obter/1', async () => {
    const res = await app.get('/associado/obter/1').set('Authorization', `Bearer ${token.token}`).expect(200);
  });

  it('GET /associado/listar/associados', async () => {
    const res = await app.get('/associado/listar/associados').set('Authorization', `Bearer ${token.token}`).expect(200);
  });

  it('GET /associado/associados/dados/1', async () => {
    const res = await app.get('/associado/associados/dados/1').set('Authorization', `Bearer ${token.token}`).expect(200);
  });

  it('GET /associado/cadastratos/grid', async () => {
    const res = await app.get('/associado/cadastratos/grid').set('Authorization', `Bearer ${token.token}`).expect(200);
  });

  it('GET /associado/cadastratos/grid/exportar/1', async () => {
    const res = await app.get('/associado/cadastratos/grid/exportar/1').set('Authorization', `Bearer ${token.token}`).expect(200);
  });

  // tem que arrumar o metodo
  // it('GET /associado/cadastratos/grid/tecnico', async () => {
  //   const res = await app.get('/associado/cadastratos/grid/tecnico').set('Authorization', `Bearer ${token.token}`).expect(200);
  // });

  // tem que ajustar o metodo
  // it('POST /associado/cadastro', async () => {
  //   const res = await app.post('/associado/cadastro').set('Authorization', `Bearer ${token.token}`).expect(200);
  // });

  it('DELETE /associado/cadastratos/grid/deletar/1', async () => {
    const res = await app.delete('/associado/cadastratos/grid/deletar/1').set('Authorization', `Bearer ${token.token}`).expect(200);
  });
});

// routes.post("/cadastro", ChecarToken, verificarNivelAcesso(1), CadastPessoaFisica);
// routes.patch("/cadastro/editar/:CD_USUARIO", ChecarToken, verificarNivelAcesso(1), editarPessoaFisica);