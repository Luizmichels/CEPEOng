import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Cadastro.scss';
import { get, remove } from '../../../utlis/api';

const AlterarCadastro = () => {
  const [associados, setCadastro] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedAssociados, setSelectedAssociados] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCadastro();
  }, []);

  const fetchCadastro = async () => {
    try {
      const response = await get('/associado/listar/associados');
      console.log('Resposta da API:', response.data);

      if (response.data && Array.isArray(response.data.associados)) {
        setCadastro(response.data.associados);
      } else {
        console.error('A resposta da API não é um array:', response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar modalidade', error);
    }
  };

  const toggleModal = () => setModal(!modal);

  const confirmDelete = (associados) => {
    setSelectedAssociados(associados);
    toggleModal();
  };

  const handleDelete = async () => {
    try {
      await remove(`/cadastratos/grid/deletar/${selectedAssociados.CD_PESSOA_FISICA}`);
      fetchCadastro();
      toggleModal();
    } catch (error) {
      console.error('Erro ao excluir modalidade', error);
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
          <h1>Associados</h1>
        </Col>
      </Row>
      <Row className="main-content">
        {associados.length > 0 ? (
          associados.map((associados) => (
            <Col key={associados.CD_PESSOA_FISICA} xs="12" className="cadastro-item">
              <div className="cadastro-nome">{associados.NM_PESSOA}</div>
              <div className="button-group">
                <Button className="text-button" onClick={() => navigate(`/associado/editar/${associados.CD_PESSOA_FISICA}`)}>Alterar</Button>
                <Button className="text-button" onClick={() => confirmDelete(associados)}>Excluir</Button>
              </div>
            </Col>
          ))
        ) : (
          <Col xs="12">
            <p>Nenhum associado cadastrado.</p>
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
          Tem certeza de que deseja excluir o associado {selectedAssociados && selectedAssociados.NM_PESSOA}?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>Excluir</Button>{' '}
          <Button color="secondary" onClick={toggleModal}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default AlterarCadastro;
