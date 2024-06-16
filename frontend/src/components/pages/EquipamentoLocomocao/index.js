import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'reactstrap';
import './EquipamentoLocomocao.css';
import { get, remove } from '../../../utlis/api';

const Equipamento = () => {
  const [meioLocomocaos, setEquipamento] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEquipamento();
  }, []);

  const fetchEquipamento = async () => {
    try {
      const response = await get('/meioLocomocao/listar');
      console.log('Resposta da API:', response.data);

      if (response.data && Array.isArray(response.data.meioLocomocaos)) {
        setEquipamento(response.data.meioLocomocaos);
      } else {
        console.error('A resposta da API não é um array:', response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar equipamento locomoção', error);
    }
  };

  const handleDelete = async (CD_MEIO_LOCOMOCAO) => {
    try {
      await remove(`/meioLocomocao/deletar/${CD_MEIO_LOCOMOCAO}`);
      fetchEquipamento();
    } catch (error) {
      console.error('Erro ao excluir equipamento locomoção', error);
    }
  };

  return (
    <Container className="tela">
      <Row className="header align-items-center">
        <Col xs="3">
          <img src="/assets/img/cepe_joinville_laranja 2.png" alt="logo" onClick={() => navigate('/cadastros')} style={{ cursor: 'pointer' }} />
        </Col>
        <Col xs="6">
          <h1>Equipamento Locomoção</h1>
        </Col>
        <Col xs="3">
          <Button color="default" className="large-cadastrar" onClick={() => navigate('/equipamento/nova')}>+ Novo Equipamento Locomoção</Button>
        </Col>
      </Row>
      <Row className="main-content">
        {meioLocomocaos.length > 0 ? (
          meioLocomocaos.map((meioLocomocaos) => (
            <Col key={meioLocomocaos.CD_MEIO_LOCOMOCAO} xs="12" className="equipamento-item">
              <div className="equipamento-nome">{meioLocomocaos.NM_MEIO_LOCOMOCAO}</div>
              <div className="button-group">
                <Button className="text-button" onClick={() => navigate(`/equipamento/editar/${meioLocomocaos.CD_MEIO_LOCOMOCAO}`)}>Alterar</Button>
                <Button className="text-button" onClick={() => handleDelete(meioLocomocaos.CD_MEIO_LOCOMOCAO)}>Excluir</Button>
              </div>
            </Col>
          ))
        ) : (
          <Col xs="12">
            <p>Nenhum Equipamento Locomoção cadastrado.</p>
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

export default Equipamento;
