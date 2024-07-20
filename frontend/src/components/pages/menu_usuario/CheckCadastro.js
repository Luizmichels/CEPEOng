import { useEffect, useState } from 'react';
import { Button } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import api from '../../../utlis/api';
import { getToken } from '../../../utlis';
import './CheckCadastro.scss';

function CheckCadastro() {
  const [loading, setLoading] = useState(true);
  const [usuarioCadastrado, setUsuarioCadastrado] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const verificarCadastro = async () => {
      try {
        const token = getToken();
        const response = await api.get(`/associado/obter/${token}`, 
          { headers: { Authorization: `Bearer ${token.token}` } });        
        const usuario = response.data.usuario;

        setUsuarioCadastrado(usuario);
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
      navigate(`/associado/editar/${usuarioCadastrado.CD_USUARIO}`);
    } else {
      navigate('/associado');
    }
  };

  const handleLogout = () => {
    navigate("/login");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="check-cadastro-container">
             <img src="/assets/img/cepe_joinville_laranja 2.png" className="logo" alt="Logo" />
      <div className='check-conjunto'>
      <div className="check-cadastro-message">
        {usuarioCadastrado != null ? 'Alterar cadastro.' : 'Realize seu cadastro.'}
      </div>
      <Button color="default" className="check-button" onClick={handleClick}>
        {usuarioCadastrado ? 'Clique Aqui!' : 'Clique Aqui!'}
      </Button>
    </div>
    <div className="logout-button">
          <Button color="default" className="text-button sair" onClick={handleLogout}>
            Sair
          </Button>
        </div>
    </div>
    
  );
}

export default CheckCadastro;
