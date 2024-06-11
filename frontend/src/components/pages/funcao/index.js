import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'reactstrap';
import './Funcoes.css';
import { get, remove } from '../../../utlis/api';

const Funcoes = () => {
  const [funcoes, setFuncoes] = useState([]); // Inicializa como um array vazio
  const navigate = useNavigate();

  useEffect(() => {
    fetchFuncoes();
  }, []);

  const fetchFuncoes = async () => {
    try {
      const response = await get('/funcao/listar');
      console.log('Resposta da API:', response.data); // Log para verificar a resposta

      // Verifica se a resposta é um objeto com uma propriedade "data" que é um array
      if (response.data && Array.isArray(response.data)) {
        setFuncoes(response.data);
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
      <Row className="align-items-center">
        <Col xs="3">
          <img src="/assets/img/cepe_joinville_laranja 2.png" alt="logo" onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} />
        </Col>
        <Col xs="6">
          <h1>Função</h1>
        </Col>
        <Col xs="3">
          <Button color="default" onClick={() => navigate('/funcoes/nova')}>+ Nova Função</Button>
        </Col>
      </Row>
      <Row>
        {funcoes.length > 0 ? (
          funcoes.map((funcao) => (
            <Col key={funcao.id} xs="12" className="funcao-item">
              <div className="funcao-nome">{funcao.nome}</div>
              <Button color="default" onClick={() => navigate(`/funcoes/editar/${funcao.id}`)}>Alterar</Button>
              <Button color="default" onClick={() => handleDelete(funcao.id)}>Excluir</Button>
            </Col>
          ))
        ) : (
          <Col xs="12">
            <p>Nenhuma função encontrada.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Funcoes;
