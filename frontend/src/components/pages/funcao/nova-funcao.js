import React, { useState, startTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../utlis/api';
import './nova-funcao.css';

const ViewNovaFuncao = () => {
  const [NM_FUNCAO, setNome] = useState('');
  const [DS_FUNCAO, setDescricao] = useState('');
  const navigate = useNavigate();

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
      await api.post('/funcao/cadastro', { NM_FUNCAO, DS_FUNCAO }, config);
      
      startTransition(() => {
        navigate('/funcoes');
      });
    } catch (error) {
      console.error('Erro ao criar função:', error);
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
        <h1>Nova Função</h1>
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
        <button type="submit" className="btn-criar-funcao">Cadastrar Função</button>
      </form>
    </div>
  );
};

export default ViewNovaFuncao;
