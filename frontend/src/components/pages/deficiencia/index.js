import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Deficiencia.css';
import { get, remove } from '../../../utlis/api';

const Deficiencias = () => {
  const [deficiencias, setDeficiencias] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedDeficiencia, setSelectedDeficiencia] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDeficiencias();
  }, []);

  const fetchDeficiencias = async () => {
    try {
      const response = await get('/deficiencia/listar');
      console.log('Resposta da API:', response.data);

      if (response.data && Array.isArray(response.data.deficiencias)) {
        setDeficiencias(response.data.deficiencias);
      } else {
        console.error('A resposta da API não é um array:', response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar deficiência', error);
    }
  };

  const toggleModal = () => setModal(!modal);

  const confirmDelete = (deficiencias) => {
    setSelectedDeficiencia(deficiencias);
    toggleModal();
  };

  const handleDelete = async () => {
    try {
      await remove(`/deficiencia/deletar/${selectedDeficiencia.CD_DEFICIENCIA}`);
      fetchDeficiencias();
      toggleModal();
    } catch (error) {
      console.error('Erro ao excluir deficiência', error);
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
          <h1>Deficiência</h1>
        </Col>
        <Col xs="3">
          <Button color="default" className="large-cadastrar" onClick={() => navigate('/deficiencia/nova')}>+ Nova Deficiência</Button>
        </Col>
      </Row>
      <Row className="main-content">
        {deficiencias.length > 0 ? (
          deficiencias.map((deficiencias) => (
            <Col key={deficiencias.CD_DEFICIENCIA} xs="12" className="deficiencia-item">
              <div className="deficiencia-nome">{deficiencias.TP_DEFICIENCIA}</div>
              <div className="button-group">
                <Button className="text-button" onClick={() => navigate(`/deficiencia/editar/${deficiencias.CD_DEFICIENCIA}`)}>Alterar</Button>
                <Button className="text-button" onClick={() => confirmDelete(deficiencias)}>Excluir</Button>
              </div>
            </Col>
          ))
        ) : (
          <Col xs="12">
            <p>Nenhuma deficiência cadastrar.</p>
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
          Tem certeza de que deseja excluir a deficiência {selectedDeficiencia && selectedDeficiencia.TP_DEFICIENCIA}?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>Excluir</Button>{' '}
          <Button color="secondary" onClick={toggleModal}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default Deficiencias;
