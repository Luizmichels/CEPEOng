import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Usuario.css';
import { get, remove } from '../../../utlis/api';

const Usuarios = () => {
  const [usuario, setUsuarios] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsuario();
  }, []);

  const fetchUsuario = async () => {
    try {
      const response = await get('/usuario/listar');
      console.log('Resposta da API:', response.data);

      if (response.data && Array.isArray(response.data.usuario)) {
        setUsuarios(response.data.usuario);
      } else {
        console.error('A resposta da API não é um array:', response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar usuário', error);
    }
  };

  const toggleModal = () => setModal(!modal);

  const confirmDelete = (usuario) => {
    setSelectedUsuario(usuario);
    toggleModal();
  };

  const handleDelete = async () => {
    try {
      await remove(`/usuario/deletar/${selectedUsuario.CD_USUARIO}`);
      fetchUsuario();
      toggleModal();
    } catch (error) {
      console.error('Erro ao excluir usuário', error);
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
          <h1>Usuário</h1>
        </Col>
        <Col xs="3">
          <Button color="default" className="large-cadastrar" onClick={() => navigate('/usuario/novo')}>+ Novo Usuário</Button>
        </Col>
      </Row>
      <Row className="main-content">
        {usuario.length > 0 ? (
          usuario.map((usuario) => (
            <Col key={usuario.CD_USUARIO} xs="12" className="usuario-item">
              <div className="usuario-nome">{usuario.NM_USUARIO}</div>
              <div className="button-group">
                <Button className="text-button" onClick={() => navigate(`/usuario/editar/acesso/${usuario.CD_USUARIO}`)}>Nivel Acesso</Button>
                {/* <Button className="text-button" onClick={() => navigate(`/usuario/editar/${usuario.CD_USUARIO}`)}>Alterar</Button> */}
                <Button className="text-button" onClick={() => confirmDelete(usuario)}>Excluir</Button>
              </div>
            </Col>
          ))
        ) : (
          <Col xs="12">
            <p>Nenhum usuário cadastrardo.</p>
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
          Tem certeza de que deseja excluir o usúario {selectedUsuario && selectedUsuario.NM_USUARIO}?
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
