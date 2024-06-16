import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'reactstrap';
import './Modalidade.css';
import { get, remove } from '../../../utlis/api';

const Modalidades = () => {
  const [modalidades, setModalidades] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchModalidades();
  }, []);

  const fetchModalidades = async () => {
    try {
      const response = await get('/modalidade/listar');
      console.log('Resposta da API:', response.data);

      if (response.data && Array.isArray(response.data.modalidades)) {
        setModalidades(response.data.modalidades);
      } else {
        console.error('A resposta da API não é um array:', response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar modalidade', error);
    }
  };

  const handleDelete = async (CD_MODALIDADE) => {
    try {
      await remove(`/modalidade/deletar/${CD_MODALIDADE}`);
      fetchModalidades();
    } catch (error) {
      console.error('Erro ao excluir modalidade', error);
    }
  };

  return (
    <Container className="tela">
      <Row className="header align-items-center">
        <Col xs="3">
          <img src="/assets/img/cepe_joinville_laranja 2.png" alt="logo" onClick={() => navigate('/cadastros')} style={{ cursor: 'pointer' }} />
        </Col>
        <Col xs="6">
          <h1>Modalidade</h1>
        </Col>
        <Col xs="3">
          <Button color="default" className="large-cadastrar" onClick={() => navigate('/modalidade/nova')}>+ Nova Modalidade</Button>
        </Col>
      </Row>
      <Row className="main-content">
        {modalidades.length > 0 ? (
          modalidades.map((modalidades) => (
            <Col key={modalidades.CD_MODALIDADE} xs="12" className="modalidade-item">
              <div className="modalidade-nome">{modalidades.NM_MODALIDADE}</div>
              <div className="button-group">
                <Button className="text-button" onClick={() => navigate(`/modalidade/editar/${modalidades.CD_MODALIDADE}`)}>Alterar</Button>
                <Button className="text-button" onClick={() => handleDelete(modalidades.CD_MODALIDADE)}>Excluir</Button>
              </div>
            </Col>
          ))
        ) : (
          <Col xs="12">
            <p>Nenhuma modalidade encontrada.</p>
          </Col>
        )}
      </Row>
      <Row className="footer">
        <Col xs="12" className="text-center">
          <Button color="default" className="large-voltar" id="botaoVoltar" onClick={() => navigate('/cadastros')}>Voltar</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Modalidades;
