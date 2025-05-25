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

  // it('POST /usuario/cadastro', async () => {
  //   const res = await app.post('/usuario/cadastro').set('Authorization', `Bearer ${token.token}`).send({
  //     NM_USUARIO: 'teste1',
  //     SENHA: '123',
  //     EMAIL: 'teste@email.com'
  //   }).expect(200);
  // });

  // it('GET /usuario/listar/nivel2', async () => {
  //   const res = await app.get('/usuario/listar/nivel2').set('Authorization', `Bearer ${token.token}`).expect(200);
  // });
  
  // it('GET /usuario/listar/tecModali', async () => {
  //   const res = await app.get('/usuario/listar/tecModali').set('Authorization', `Bearer ${token.token}`).expect(200);
  // });
});


// routes.delete('/deletar/:CD_USUARIO', ChecarToken, verificarNivelAcesso(3), DeletarUsuario)
// routes.patch('/editar/senha/:CD_USUARIO', ChecarToken, verificarNivelAcesso(1), EditarUsuario)
// routes.get('/buscar/editar/nivel_acesso', ChecarToken, verificarNivelAcesso(3), TodosUsuario)
// routes.patch('/editar/nivel_acesso/:CD_USUARIO', ChecarToken, verificarNivelAcesso(3), EditarNivelAcesso)
// routes.post('/cadastro/tecModali', ChecarToken, verificarNivelAcesso(3), CadastroTecModali)
// routes.get('/obter/tecModali/:CD_TECNICO_MODALIDADE', ChecarToken, verificarNivelAcesso(3), ObterTecnicoModalidade)
// routes.patch('/editar/tecModali/:CD_TECNICO_MODALIDADE', ChecarToken, verificarNivelAcesso(3), EditarTecModali)
// routes.delete('/deletar/tecModali/:CD_TECNICO_MODALIDADE', ChecarToken, verificarNivelAcesso(3), DeletarTecModali)