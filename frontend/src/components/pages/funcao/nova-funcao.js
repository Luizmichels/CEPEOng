import React, { useState, startTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../utlis/api';
import './nova-funcao.css';

const ViewNovaFuncao = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate(-2); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Supondo que o token está armazenado no localStorage
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      await api.post('/funcao/cadastro', { nome, descricao }, config);
      
      // Use startTransition para envolver a navegação
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
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="descricao">Descrição da Função</label>
            <input
              type="text"
              id="descricao"
              value={descricao}
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
