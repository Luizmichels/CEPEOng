import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'reactstrap';
import './Cadastro.scss';
import { get, remove } from '../../../utlis/api';

const AlterarCadastro = () => {
  const [pessoas, setModalidades] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchModalidades();
  }, []);

  const fetchModalidades = async () => {
    try {
      const response = await get('/associado/cadastratos/grid');
      console.log('Resposta da API:', response.data);

      if (response.data && Array.isArray(response.data.pessoas)) {
        setModalidades(response.data.pessoas);
      } else {
        console.error('A resposta da API não é um array:', response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar modalidade', error);
    }
  };

  const handleDelete = async (CD_PESSOA_FISICA) => {
    try {
      await remove(`/cadastratos/grid/deletar/${CD_PESSOA_FISICA}`);
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
          <h1>Associados</h1>
        </Col>
      </Row>
      <Row className="main-content">
        {pessoas.length > 0 ? (
          pessoas.map((pessoas) => (
            <Col key={pessoas.CD_PESSOA_FISICA} xs="12" className="cadastro-item">
              <div className="cadastro-nome">{pessoas.Nome}</div>
              <div className="button-group">
                <Button className="text-button" onClick={() => navigate(`/associado/editar/${pessoas.CD_PESSOA_FISICA}`)}>Alterar</Button>
                <Button className="text-button" onClick={() => handleDelete(pessoas.CD_PESSOA_FISICA)}>Excluir</Button>
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
    </Container>
  );
};

export default AlterarCadastro;
