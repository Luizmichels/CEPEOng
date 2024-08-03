import { useState } from "react";
import { Button, Col, Form, Input, Label, Row, FormGroup, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { post } from "../../../utlis/api"; // Certifique-se de que a função 'post' está corretamente definida
import "./esqueciSenha.css";
import "./inputs.css";

function EsqueciSenha() {
  const {
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [teste, setTeste] = useState(false);
  const toggleModal = () => setModal(!modal);
  
  console.debug(getValues())

  const handleResetPassword = async (data) => {
    console.log("Dados recebidos:", data); // Verifique se os dados estão corretos
    setEnviando(true);
    try {
      setModal(true);
      const { email } = data;
      console.log("Enviando solicitação para:", `/usuario/editar/senha/${email}`);
      const response = await post(`/usuario/editar/senha/${email}`, {email});
      console.debug("Código de recuperação enviado para:", response.data);
      setTeste(true);
      setTimeout(() => {
        setModal(false);
        setEnviando(false);
        window.location.href = '/login';
      }, 3000);
    } catch (error) {
      console.error("Erro ao recuperar a senha:", error);
      setModal(false);
      setEnviando(false);
      setTeste(false)
      alert('Erro ao enviar o email.');
    }
  };

  const handleBack = () => {
    navigate("/login");
  };

  const handleEmailChange = (e) => {
    const newValue = e.target.value;
    setEmail(newValue);
    setValue("email", newValue);
  };

  return (
    <div className="tela esqueci-senha">
      <div className="logo-container">
        <img
          src="/assets/img/cepe_joinville_laranja 2.png"
          className="logo"
          alt="Logo"
        />
        <h2 className="titulo">Esqueci minha senha</h2>
      </div>
      <Form
        onSubmit={handleSubmit(handleResetPassword)}
        className="conteudo pe-4"
      >
        <div className="campos">
          <div className="usuarioesenha">
            <Row className="mb-3">
              <Col xs="12" className="form-group">
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    id="email"
                    type="text"
                    name="email"
                    defaultValue={email}
                    onChange={handleEmailChange}
                    className="input-field"
                    // {...register("email", {
                    //   required: "Email é obrigatório",
                    // })}
                  />
                  {errors.email && (
                    <p className="error-message">{errors.email.message}</p>
                  )}
                </FormGroup>
              </Col>
            </Row>
          </div>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="d-flex justify-content-between rodapes">
          <Button color="default" onClick={handleBack} className="button tamanho_button">Voltar</Button>
          <Button color="default" disabled={enviando} type="submit" className={`button tamanho_button ${enviando ? 'c-disabled' : ""}`}>Enviar Senha</Button>
        </div>
      </Form>
      <Modal isOpen={modal} toggle={toggleModal} centered>
        <ModalHeader toggle={toggleModal}>{!teste ? 'Enviando a sua senha' : "Solicitação senha enviada com sucesso"}</ModalHeader>
        <ModalBody>
          {!teste ? 'Enviando...' : "Senha enviada para o seu e-mail cadastrado!"}
        </ModalBody>
      </Modal>
    </div>
  );
}

export default EsqueciSenha;
