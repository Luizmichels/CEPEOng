import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import api, { get } from '../../../utlis/api';
import { getToken } from '../../../utlis';
import './CheckCadastro.css'; // Importa o arquivo CSS

function CheckCadastro() {
  const [loading, setLoading] = useState(true);
  const [usuarioCadastrado, setUsuarioCadastrado] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verificarCadastro = async () => {
      try {
        const token = getToken();
        const response = await api.get(`/usuario/obter/${token.userId}`, { headers: { Authorization: `Bearer ${token.token}` } });        
        const usuario = response.data.usuario;

        setUsuarioCadastrado(usuario.jaCadastrado);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao verificar cadastro:', error);
        setLoading(false);
      }
    };

    verificarCadastro();
  }, [navigate]);

  const handleClick = () => {
    if (usuarioCadastrado) {
      navigate('/usuario/editar');
    } else {
      navigate('/usuario/novo');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="check-cadastro-container">
             <img src="/assets/img/cepe_joinville_laranja 2.png" className="logo" alt="Logo" />
      <div className='check-conjunto'>
      <div className="check-cadastro-message">
        {usuarioCadastrado ? 'Alterar cadastro.' : 'Realize seu cadastro.'}
      </div>
      <Button color="default" className="check-button" onClick={handleClick}>
        {usuarioCadastrado ? 'Clique Aqui!' : 'Clique Aqui!'}
      </Button>
    </div>
    </div>
  );
}

export default CheckCadastro;
