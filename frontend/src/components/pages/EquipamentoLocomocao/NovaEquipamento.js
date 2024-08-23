import React, { useState, startTransition } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import api from "../../../utlis/api";
import { NotificacaoManager } from "../../notificacao";
import "./NovaEquipamento.scss";

const ViewNovaEquipamento
 = () => {
  const [NM_MEIO_LOCOMOCAO, setNome] = useState("");
  const [DS_MEIO_LOCOMOCAO, setDescricao] = useState("");
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
      await api.post("/meioLocomocao/cadastro", { NM_MEIO_LOCOMOCAO, DS_MEIO_LOCOMOCAO }, config);

      NotificacaoManager.success('Cadastrado com sucesso!', '', 1000, 'filled');

      startTransition(() => {
        navigate("/equipamento");
      });
    } catch (error) {
      NotificacaoManager.error(error.response.data.message, '', 1500, 'filled');
    }
  };

  return (
    <div className="tela-nova-equipamento">
      <header>
        <img
          src="/assets/img/cepe_joinville_laranja 2.png"
          alt="Logo"
          id="logo"
          className="logo"
          onClick={handleLogoClick}
        />
        <h1>Novo Equipamento Locomoção</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div id="campos">
          <div className="form-group">
            <label htmlFor="nome">Equipamento Locomoção</label>
            <input
              type="text"
              id="nome"
              value={NM_MEIO_LOCOMOCAO}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="descricao">Descrição da Equipamento Locomoção</label>
            <input
              type="text"
              id="descricao"
              value={DS_MEIO_LOCOMOCAO}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
        </div>
        <Button color="default" className="btn-criar-equipamento">
          Cadastrar Equipamento Locomoção
        </Button>
      </form>
    </div>
  );
};

export default ViewNovaEquipamento;
