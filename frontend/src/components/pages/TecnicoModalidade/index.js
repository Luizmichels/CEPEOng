import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'reactstrap';
import './TecMod.scss';
import { get, remove } from '../../../utlis/api';

const Usuarios = () => {
  const [usuario, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await get('usuario/listar/tecModali');
      console.log('Resposta da API:', response.data);

      if (response.data && Array.isArray(response.data.usuarios)) {
        setUsuarios(response.data.usuarios);
      } else {
        console.error('A resposta da API não é um array:', response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar Tecnico', error);
    }
  };

  const handleDelete = async (CD_TECNICO_MODALIDADE) => {
    try {
      await remove(`usuario/deletar/tecModali/${CD_TECNICO_MODALIDADE}`);
      fetchUsuarios();
    } catch (error) {
      console.error('Erro ao excluir técnico', error);
    }
  };

  return (
    <Container className="tela">
      <Row className="header align-items-center">
        <Col xs="3">
          <img src="/assets/img/cepe_joinville_laranja 2.png" alt="logo" onClick={() => navigate('/cadastros')} style={{ cursor: 'pointer' }} />
        </Col>
        <Col xs="6">
          <h1>Modalidade / Tecnico</h1>
        </Col>
        <Col xs="3">
          <Button color="default" className="large-cadastrar" onClick={() => navigate('/tecnico/novo')}>+ Novo Tecnico</Button>
        </Col>
      </Row>
      <Row className="main-content">
        {usuario.length > 0 ? (
          usuario.map((usuario) => (
            <Col key={usuario.CD_TECNICO_MODALIDADE} xs="12" className="funcao-item">
              <div className="funcao-nome">{usuario.NM_PESSOA}</div>
              <div className="button-group">
                <Button className="text-button" onClick={() => navigate(`/tecnico/editar/${usuario.CD_TECNICO_MODALIDADE}`)}>Alterar</Button>
                <Button className="text-button" onClick={() => handleDelete(usuario.CD_TECNICO_MODALIDADE)}>Excluir</Button>
              </div>
            </Col>
          ))
        ) : (
          <Col xs="12">
            <p>Nenhuma tecnico associado a uma modalidade encontrado.</p>
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

export default Usuarios;
