import React, { useEffect, useState, startTransition } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input } from "reactstrap";
import api from "../../../utlis/api";
import { NotificacaoManager } from "../../notificacao";
import "./nova-funcao.scss";

const ViewEditarFuncao = () => {
  const [NM_FUNCAO, setNome] = useState("");
  const [DS_FUNCAO, setDescricao] = useState("");
  const navigate = useNavigate();
  const { CD_FUNCAO } = useParams();

  useEffect(() => {
    if (CD_FUNCAO) {
      fetchFuncao(CD_FUNCAO);
    }
  }, [CD_FUNCAO]);

  const fetchFuncao = async (CD_FUNCAO) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const { data } = await api.get(`/funcao/obter/${CD_FUNCAO}`, config);
      const { funcoes } = data;
      setNome(funcoes.NM_FUNCAO ?? "");
      setDescricao(funcoes.DS_FUNCAO ?? "");
    } catch (error) {
      console.error("Erro ao buscar função:", error);
    }
  };

  const handleLogoClick = () => {
    navigate("/cadastros");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await api.patch(
        `/funcao/atualizar/${CD_FUNCAO}`,
        { NM_FUNCAO, DS_FUNCAO },
        config
      );

      NotificacaoManager.primary('Alterado com sucesso!', '', 500, 'filled')

      navigate("/funcoes");
    } catch (error) {
      console.error("Erro ao atualizar função:", error);
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
            <Input
              type="text"
              id="nome"
              value={NM_FUNCAO}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="descricao">Descrição da Função</label>
            <Input
              type="text"
              id="descricao"
              value={DS_FUNCAO}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
        </div>
        <Button color="primary" className="btn-criar-funcao">
          Salvar Alterações
        </Button>
      </form>
    </div>
  );
};

export default ViewEditarFuncao;
