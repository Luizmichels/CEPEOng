import React, { useEffect, useState, startTransition } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../utlis/api';
import './nova-funcao.css';

const ViewEditarFuncao = () => {
  const [NM_FUNCAO, setNome] = useState('');
  const [DS_FUNCAO, setDescricao] = useState('');
  const navigate = useNavigate();
  const { CD_FUNCAO } = useParams(); // Pegamos o ID da função a partir dos parâmetros da rota

  useEffect(() => {
    if (CD_FUNCAO) {
      // Se existe um ID, buscamos os dados da função
      fetchFuncao(CD_FUNCAO);
    }
  }, [CD_FUNCAO]);

  const fetchFuncao = async (CD_FUNCAO) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await api.get(`/funcao/obter/${CD_FUNCAO}`, config);
      setNome(response.data.NM_FUNCAO);
      setDescricao(response.data.DS_FUNCAO);
    } catch (error) {
      console.error('Erro ao buscar função:', error);
    }
  };

  const handleLogoClick = () => {
    navigate(-2); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      await api.patch(`/funcao/atualizar/${CD_FUNCAO}`, { NM_FUNCAO, DS_FUNCAO }, config);
      
      startTransition(() => {
        navigate('/funcoes');
      });
    } catch (error) {
      console.error('Erro ao atualizar função:', error);
    }
  };

  return (
    <div className="tela-nova-funcao">
      <header>
        <img
          src="/assets/img/cepe_joinville_laranja 2.png"
          alt="Logo"
          id="logo"
          className="logo"
          onClick={handleLogoClick}
        />
        <h1>Editar Função</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div id="campos">
          <div className="form-group">
            <label htmlFor="nome">Nome da Função</label>
            <input
              type="text"
              id="nome"
              value={NM_FUNCAO}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="descricao">Descrição da Função</label>
            <input
              type="text"
              id="descricao"
              value={DS_FUNCAO}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="btn-criar-funcao">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default ViewEditarFuncao;
