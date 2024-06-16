import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'reactstrap';
import './Funcoes.css';
import { get, remove } from '../../../utlis/api';

const Funcoes = () => {
  const [funcoes, setFuncoes] = useState([]);
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

  const handleDelete = async (CD_FUNCAO) => {
    try {
      await remove(`/funcao/deletar/${CD_FUNCAO}`);
      fetchFuncoes();
    } catch (error) {
      console.error('Erro ao excluir função', error);
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
                <Button className="text-button" onClick={() => handleDelete(funcao.CD_FUNCAO)}>Excluir</Button>
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
    </Container>
  );
};

export default Funcoes;
