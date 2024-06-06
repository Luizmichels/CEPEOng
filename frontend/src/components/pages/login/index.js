import React, { useState } from "react";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { post } from "../../../utlis/api";
import "./login.css";
import "./inputs.css";

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Lógica de autenticação
    console.log("Usuário:", user);
    console.log("Senha:", password);

    post('entrar', { password, user }).then(()=>{
      console.debug("Aqui");
    })
  };

  return (
    <div className="tela login">
      <Form onSubmit={handleLogin}>
        <div className="conteudo pe-4">
          <img
            src="/assets/img/cepe_joinville_laranja 2.png"
            className="logo"
            alt="Logo"
          />
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
            <div className="esqueci mb-3">Esqueceu a senha?</div>
          </div>
          <div className="d-flex justify-content-between rodapes">
            <Button color="default">Quero me associar</Button>
            <Button color="default" type="submit">
              Entrar
            </Button>
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
