import React, { useState } from "react";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { useNavigate } from "react-router-dom"; // Importar o hook useNavigate
import { post } from "../../../utlis/api";
import "./esqueciSenha.css";
import "./inputs.css";

function EsqueciSenha() {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Inicializar o hook useNavigate

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      // Supondo que você tenha um endpoint para recuperação de senha
      const { data } = await post('/usuario/recuperar-senha', { emailOrCpf: inputValue });
      console.debug("Código de recuperação enviado para:", data);
      
      // Redirecionar ou dar feedback conforme necessário
      // navigate('/alguma-rota');
    } catch (error) {
      console.error('Erro ao recuperar a senha:', error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Erro desconhecido');
      }
      setTimeout(() => {
        setErrorMessage('');
      }, 2500);
    }
  };

  const handleBack = () => {
    navigate('/login'); // Voltar à página de login
  };

  return (
    <div className="tela esqueci-senha">
      <div className="logo-container">
        <img src="/assets/img/cepe_joinville_laranja 2.png" className="logo" alt="Logo" />
        <h2 className="titulo">Esqueci minha senha</h2>
      </div>
      <Form onSubmit={handleResetPassword} className="conteudo pe-4">
        <div className="campos">
          <div className="usuarioesenha">
            <Row className="mb-3">
              <Col xs="12" className="form-group">
                <Label for="email_or_cpf">Usuário, Email ou CPF</Label>
                <Input
                  required
                  id="email_or_cpf"
                  onChange={(e) => setInputValue(e.target.value)}
                  className="input-field"
                  value={inputValue}
                />
              </Col>
            </Row>
          </div>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="d-flex justify-content-between rodapes">
          <Button color="default" onClick={handleBack}>Voltar</Button>
          <Button color="default" type="submit">Enviar Código</Button>
        </div>
      </Form>
    </div>
  );
}

export default EsqueciSenha;
