import React, { useState, startTransition } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import api from "../../../utlis/api";
import { NotificacaoManager } from "../../notificacao";
import "./NovaModalidade.scss";

const ViewNovaModalidade = () => {
  const [NM_MODALIDADE, setNome] = useState("");
  const [NOMENCLATURA, setDescricao] = useState("");
  const navigate = useNavigate();

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
      await api.post("/modalidade/cadastro", { NM_MODALIDADE, NOMENCLATURA }, config);

      NotificacaoManager.success('Cadastrado com sucesso!', '', 1000, 'filled');

      startTransition(() => {
        navigate("/modalidade");
      });
    } catch (error) {
      console.error("Erro ao criar modalidade:", error);
      NotificacaoManager.error('Erro ao cadastrar modalidade!', '', 1000, 'filled');
    }
  };

  return (
    <div className="tela-nova-modalidade">
      <header>
        <img
          src="/assets/img/cepe_joinville_laranja 2.png"
          alt="Logo"
          id="logo"
          className="logo"
          onClick={handleLogoClick}
        />
        <h1>Nova modalidade</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div id="campos">
          <div className="form-group">
            <label htmlFor="nome">Nome da modalidade</label>
            <input
              type="text"
              id="nome"
              value={NM_MODALIDADE}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="descricao">Descrição da modalidade</label>
            <input
              type="text"
              id="descricao"
              value={NOMENCLATURA}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
        </div>
        <Button color="default" className="btn-criar-modalidade">
          Cadastrar modalidade
        </Button>
      </form>
    </div>
  );
};

export default ViewNovaModalidade;
