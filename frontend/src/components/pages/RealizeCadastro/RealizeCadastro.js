import { useState } from "react";
import { Button, Input, FormGroup, Label, Col, Modal, ModalHeader, ModalBody } from "reactstrap";
import { post } from "../../../utlis/api";
import { FaArrowLeft } from 'react-icons/fa';
import "./RealizeCadastro.scss";

function RealizeCadastro() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [modal, setModal] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [teste, setTeste] = useState(false);

  const toggleModal = () => setModal(!modal);

  const handleSubmit = async () => {
    setEnviando(true);
    try {
      setModal(true);
      await post('/usuario/mandar/email', { nome, telefone, email });
      setTeste(true);
      setTimeout(() => {
        setModal(false);
        setEnviando(false);
        window.location.href = '/login';
      }, 10000); // 10 segundos
    } catch (error) {
      setModal(false);
      setEnviando(false);
      setTeste(false)
      alert('Erro ao enviar o email.');
    }
  };

  function formatPhoneNumber(value) {
    var phone = value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    var formattedPhone = "";

    if (phone.length > 0) {
      formattedPhone += `(${phone.substring(0, 2)}) `; // Código de área
    }
    if (phone.length <= 10) {
      // Telefone fixo
      formattedPhone += phone.substring(2, 6); // Primeiros 4 dígitos
      if (phone.length > 6) {
        formattedPhone += "-";
        formattedPhone += phone.substring(6, 10); // Últimos 4 dígitos
      }
    } else {
      // Telefone celular
      formattedPhone += phone.substring(2, 7); // Primeiros 5 dígitos
      formattedPhone += "-";
      formattedPhone += phone.substring(7, 11); // Últimos 4 dígitos
    }

    return formattedPhone; // Retorna o número formatado
  }

  const handleTelefoneCelular = (e) => {
    const inputValue = e.target.value;
    const formattedPhoneNumber = formatPhoneNumber(inputValue);
    setTelefone(formattedPhoneNumber);
  };

  const handleBackToLogin = () => {
    window.location.href = '/login';
  };

  return (
    <div className="tela realize-cadastro">
      <div className="back-arrow" onClick={handleBackToLogin}>
        <FaArrowLeft className="arrow-icon" />
      </div>
      <div className="logo-container">
        <img
          src="/assets/img/cepe_joinville_laranja 2.png"
          className="logo"
          alt="Logo"
        />
      </div>
      <div className="titulo-container">
        <h2 className="titulo">Realize seu cadastro!</h2>
      </div>
      <div className="form-container">
        <Col md={15}>
          <FormGroup>
            <Label for="Nome">Nome</Label>
            <Input
              type="text"
              className="input-cadastro"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col md={15}>
          <FormGroup>
            <Label for="Telefone">Telefone</Label>
            <Input
              type="tel"
              className="input-cadastro"
              placeholder="(00) 00000-0000"
              maxLength="15"
              value={telefone}
              onChange={handleTelefoneCelular}
            />
          </FormGroup>
        </Col>
        <Col md={15}>
          <FormGroup>
            <Label for="Email">E-mail</Label>
            <Input
              type="email"
              className="input-cadastro"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
        </Col>
      </div>
      <div className="botao-container">
        <Button color="default" disabled={enviando} className={`clique-aqui ${enviando ? 'c-disabled' : ""}`} onClick={handleSubmit}>
          Enviar
        </Button>
      </div>
      
      <Modal isOpen={modal} toggle={toggleModal} centered>
        <ModalHeader toggle={toggleModal}>{!teste ? 'Enviando a sua solicitação' : "Solicitação enviada com sucesso"}</ModalHeader>
        <ModalBody>
          {!teste ? 'Enviando...' : "Entraremos em contato com você assim que possível!"}
        </ModalBody>
      </Modal>
    </div>
  );
}

export default RealizeCadastro;
