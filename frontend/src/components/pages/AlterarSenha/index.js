import { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { getNivel, getId } from '../../../utlis';
import { patch } from "../../../utlis/api";
import { NotificacaoManager } from "../../notificacao";
import './AlterarSenha.scss';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [teste, setTeste] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleModal = () => setModal(!modal);

  const onSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setErrorMessage(''); // Limpa a mensagem de erro antes de tentar enviar
    try {
      setModal(true);
      const CD_USUARIO = getId();
      const resposta = await patch(`/usuario/editar/senha/${CD_USUARIO}`, { SENHA: password, CONFIRMASENHA: confirmPassword });
      console.log(resposta);
      setTeste(true);
      setTimeout(() => {
        setModal(false);
        setEnviando(false);
        handleBack();
      }, 3000);
    } catch (error) {
      NotificacaoManager.error(error.response.data.message, '', 1500, 'filled');
      setModal(false);
      setEnviando(false);
      setTeste(false);
    }
  };

  const handleBack = () => {
    const nivelAcesso = getNivel();
    console.log('Nivel de Acesso retornado por getNivel:', typeof nivelAcesso); // Log para depuração
    if (`${nivelAcesso}` === `${3}`) {
      navigate('/menu');
    } else if (`${nivelAcesso}` === `${2}`) {
      navigate('/menu-tecnico');
    } else if (`${nivelAcesso}` === `${1}`) {
      navigate('/check-cadastro');
    } else {
      console.error('Nível de acesso desconhecido:', nivelAcesso);
      setErrorMessage('Nível de acesso desconhecido');
    }
  };

  return (
    <div className="change-password-container">
      <img src="/assets/img/cepe_joinville_laranja 2.png" alt="logo" className="logo" />
      <h2>Altere sua senha</h2>
      <Form onSubmit={onSubmit} className="change-password-form">
        <FormGroup>
          <Label for="password">Senha</Label>
          <Input 
            type="password" 
            name="password" 
            id="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirmação de Senha</Label>
          <Input 
            type="password" 
            name="confirmPassword" 
            id="confirmPassword"
            placeholder="Confirmação de Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-control"
          />
        </FormGroup>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="buttons">
          <Button type="button" color="default" className="back-button" onClick={handleBack}>
            Voltar
          </Button>
          <Button type="submit" color="default" className="submit-button" disabled={enviando}>
            Enviar
          </Button>
        </div>
      </Form>
      <Modal isOpen={modal} toggle={toggleModal} centered>
        <ModalHeader toggle={toggleModal}>{!teste ? 'Alterando senha' : 'Senha alterada com sucesso'}</ModalHeader>
        <ModalBody>
          {!teste ? 'Alterando...' : 'Senha alterada com sucesso!'}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ChangePassword;
