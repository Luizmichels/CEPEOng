import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Anuidade.css';
import { get, remove } from '../../../utlis/api';

const Anuidades = () => {
  const [valorAnuidade, setValorAnuidade] = useState(null);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchValorAnuidadeUnico();
  }, []);

  const fetchValorAnuidadeUnico = async () => {
    try {
      const response = await get('/valorPag/listar');
      console.log('Resposta da API (Valor Único Anuidade):', response.data);

      if (response.data && response.data.VALOR !== undefined) {
        setValorAnuidade(response.data);
      } else {
        console.error('A resposta da API para o valor único da anuidade não contém um VALOR:', response.data);
        setValorAnuidade(null);
      }
    } catch (error) {
      console.error('Erro ao buscar o valor único da anuidade', error);
      setValorAnuidade(null);
    }
  };

  const toggleModal = () => setModal(!modal);

  const confirmDelete = () => {
    toggleModal();
  };

  /*const handleDelete = async () => {
    try {
      // Não há mais ID para deletar, pois é um valor único.
      // Você pode optar por não ter funcionalidade de exclusão ou implementar
      // uma lógica diferente, como zerar o valor.
      await api.delete('/valorPag/deletar'); // Adapte a rota se necessário
      fetchValorAnuidadeUnico();
      toggleModal();
    } catch (error) {
      console.error('Erro ao excluir valor da anuidade', error);
      toggleModal();
    }
  }; */

  return (
    <Container className="tela">
      <Row className="header align-items-center">
        <Col xs="3">
          <img src="/assets/img/cepe_joinville_laranja 2.png" alt="logo" onClick={() => navigate('/cadastros')} style={{ cursor: 'pointer' }} />
        </Col>
        <Col xs="6">
          <h1>Valor da Anuidade</h1>
        </Col>
        <Col xs="3">
          {/* <Button color="default" className="large-cadastrar" onClick={() => navigate('/anuidade/nova')}>+ Novo Valor</Button> */}
        </Col>
      </Row>
      <Row className="main-content">
        {valorAnuidade ? (
          <Col xs="12" className="anuidade-item">
            <div className="anuidade-detalhes">
              <div>Valor: {valorAnuidade.VALOR}</div>
            </div>
            <div className="button-group">
              <Button className="text-button" onClick={() => navigate('/anuidade/editar')}>Alterar</Button>
              {/* Opção de excluir pode ser removida ou adaptada */}
              {/* <Button className="text-button" onClick={confirmDelete}>Excluir</Button> */}
            </div>
          </Col>
        ) : (
          <Col xs="12">
            <p>Nenhum valor de anuidade cadastrado.</p>
          </Col>
        )}
      </Row>
      <Row className="footer">
        <Col xs="12" className="text-center">
          <Button color="default" className="large-voltar" id="botaoVoltar" onClick={() => navigate('/cadastros')}>Voltar</Button>
        </Col>
      </Row>
      {/* Modal de exclusão pode ser removido ou adaptado */}
      {/* <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Confirmação de Exclusão</ModalHeader>
        <ModalBody>
          Tem certeza de que deseja excluir o valor da anuidade de {valorAnuidade && valorAnuidade.VALOR}?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>Excluir</Button>{' '}
          <Button color="secondary" onClick={toggleModal}>Cancelar</Button>
        </ModalFooter>
      </Modal> */}
    </Container>
  );
};

export default Anuidades;