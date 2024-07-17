import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Funcoes.css';
import { get, remove } from '../../../utlis/api';

const Funcoes = () => {
  const [funcoes, setFuncoes] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedFuncao, setSelectedFuncao] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFuncoes();
  }, []);

  const fetchFuncoes = async () => {
    try {
      const response = await get('/funcao/listar');
      console.log('Resposta da API:', response.data);

      if (response.data && Array.isArray(response.data.funcoes)) {
        setFuncoes(response.data.funcoes);
      } else {
        console.error('A resposta da API não é um array:', response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar funções', error);
    }
  };

  const toggleModal = () => setModal(!modal);

  const confirmDelete = (funcao) => {
    setSelectedFuncao(funcao);
    toggleModal();
  };

  const handleDelete = async () => {
    try {
      await remove(`/funcao/deletar/${selectedFuncao.CD_FUNCAO}`);
      fetchFuncoes();
      toggleModal();
    } catch (error) {
      console.error('Erro ao excluir função', error);
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
          <h1>Função</h1>
        </Col>
        <Col xs="3">
          <Button color="default" className="large-cadastrar" onClick={() => navigate('/funcoes/nova')}>+ Nova Função</Button>
        </Col>
      </Row>
      <Row className="main-content">
        {funcoes.length > 0 ? (
          funcoes.map((funcao) => (
            <Col key={funcao.CD_FUNCAO} xs="12" className="funcao-item">
              <div className="funcao-nome">{funcao.NM_FUNCAO}</div>
              <div className="button-group">
                <Button className="text-button" onClick={() => navigate(`/funcoes/editar/${funcao.CD_FUNCAO}`)}>Alterar</Button>
                <Button className="text-button" onClick={() => confirmDelete(funcao)}>Excluir</Button>
              </div>
            </Col>
          ))
        ) : (
          <Col xs="12">
            <p>Nenhuma função encontrada.</p>
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
          Tem certeza de que deseja excluir a função {selectedFuncao && selectedFuncao.NM_FUNCAO}?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>Excluir</Button>{' '}
          <Button color="secondary" onClick={toggleModal}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default Funcoes;
