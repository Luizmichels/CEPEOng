import React, { useState } from "react";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { useNavigate } from "react-router-dom"; // Importar o hook useNavigate
import { setToken } from "../../../utlis";
import { post } from "../../../utlis/api";
import "./login.scss";
import "./inputs.css";

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Inicializar o hook useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await post('/usuario/login', { NM_USUARIO: user, SENHA: password });
      console.debug("Login bem-sucedido:", data);
      setToken(data.token);

      if(data.nivelAcesso === 3){
        navigate('/menu');
      } else if (data.nivelAcesso === 2){
        navigate('/menu');
      } else if (data.nivelAcesso === 1){
        navigate('/check-cadastro');
      }

    } catch (error) {
      console.error('Erro no login:', error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message, 'error');
      } else {
        setErrorMessage('Erro desconhecido', 'error');
      }
      setTimeout(() => {
        setErrorMessage('');
      }, 2500);
    }
  };

  const handleRegisterClick = () => {
    navigate('/realizar-cadastro');
  };

  return (
    <div className="tela login tela-login">
      <Form onSubmit={handleLogin}>
        <div className="conteudo pe-4">
          <img src="/assets/img/cepe_joinville_laranja 2.png" className="logo" alt="Logo" />
          <div className="campos">
            <h2>Login</h2>
            <div className="usuarioesenha">
              <Row className="mb-3">
                <Col xs="12" className="form-group">
                  <Label for="nome_usuario">Usuário</Label>
                  <Input
                    required
                    id="nome_usuario"
                    onChange={(e) => setUser(e.target.value)}
                    className="user"
                    value={user}
                  />
                </Col>
              </Row>
              <Row className="mb-1">
                <Col xs="12" className="form-group">
                  <Label for="senha_usuario">Senha</Label>
                  <Input
                    required
                    id="senha_usuario"
                    onChange={(e) => setPassword(e.target.value)}
                    className="senha"
                    type="password"
                    value={password}
                  />
                </Col>
              </Row>
            </div>
            <div className="esqueci">
              <a href="/esqueci-senha">Esqueceu a senha?</a>
            </div>
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="d-flex justify-content-between rodapes">
            <Button color="default" onClick={handleRegisterClick}>Quero me associar</Button>
            <Button color="default" type="submit">Entrar</Button>
          </div>
        </div>
        <div className="imagemzona">
          <img src="/assets/img/campeoes.png" alt="Campeões" />
        </div>
      </Form>
    </div>
  );
}

export default Login;
