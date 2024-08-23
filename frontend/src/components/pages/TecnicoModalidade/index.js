import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './TecMod.scss';
import { NotificacaoManager } from "../../notificacao";
import { get, remove } from '../../../utlis/api';

const Usuarios = () => {
  const [usuario, setUsuarios] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedTecModali, setSelectedTecModali] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await get('usuario/listar/tecModali');
      console.log('Resposta da API:', response.data);

      if (response.data && Array.isArray(response.data.usuarios)) {
        setUsuarios(response.data.usuarios);
      } else {
        console.error('A resposta da API não é um array:', response.data);
      }
    } catch (error) {
      NotificacaoManager.error(error.response.data.message, '', 1500, 'filled');
    }
  };

  const toggleModal = () => setModal(!modal);

  const confirmDelete = (usuario) => {
    setSelectedTecModali(usuario);
    toggleModal();
  };

  const handleDelete = async () => {
    try {
      await remove(`usuario/deletar/tecModali/${selectedTecModali.CD_TECNICO_MODALIDADE}`);
      fetchUsuarios();
      toggleModal();
    } catch (error) {
      console.error('Erro ao excluir técnico', error);
      toggleModal();
    }
  };

  return (
    <Container className="tela">
      <Row className="header align-items-center">
        <Col xs="3">
          <img src="/assets/img/cepe_joinville_laranja 2.png" alt="logo" onClick={() => navigate('/cadastros')} style={{ cursor: 'pointer' }} />
        </Col>
        <Col xs="6">
          <h1>Modalidade / Tecnico</h1>
        </Col>
        <Col xs="3">
          <Button color="default" className="large-cadastrar" onClick={() => navigate('/tecnico/novo')}>+ Novo Tecnico</Button>
        </Col>
      </Row>
      <Row className="main-content">
        {usuario.length > 0 ? (
          usuario.map((usuario) => (
            <Col key={usuario.CD_TECNICO_MODALIDADE} xs="12" className="funcao-item">
              <div className="funcao-nome">{usuario.NM_PESSOA}</div>
              <div className="button-group">
                <Button className="text-button" onClick={() => navigate(`/tecnico/editar/${usuario.CD_TECNICO_MODALIDADE}`)}>Alterar</Button>
                <Button className="text-button" onClick={() => confirmDelete(usuario)}>Excluir</Button>
              </div>
            </Col>
          ))
        ) : (
          <Col xs="12">
            <p>Nenhuma tecnico associado a uma modalidade encontrado.</p>
          </Col>
        )}
      </Row>
      <Row className="footer">
        <Col xs="12" className="text-center">
          <Button color="default" className="large-voltar" id="botaoVoltar" onClick={() => navigate('/cadastros')}>Voltar</Button>
        </Col>
      </Row>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Confirmação de Exclusão</ModalHeader>
        <ModalBody>
          Tem certeza de que deseja excluir o técnico {selectedTecModali && selectedTecModali.NM_PESSOA}?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>Excluir</Button>{' '}
          <Button color="secondary" onClick={toggleModal}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default Usuarios;
