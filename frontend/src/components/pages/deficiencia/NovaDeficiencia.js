import React, { useState, startTransition } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import api from "../../../utlis/api";
import { NotificacaoManager } from "../../notificacao";
import "./NovaDeficiencia.scss";

const ViewNovaDeficiencia = () => {
  const [TP_DEFICIENCIA, setNome] = useState("");
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
      await api.post("/deficiencia/cadastro", { TP_DEFICIENCIA, NOMENCLATURA }, config);

      NotificacaoManager.success('Cadastrado com sucesso!', '', 1000, 'filled');

      startTransition(() => {
        navigate("/deficiencia");
      });
    } catch (error) {
      console.error("Erro ao criar deficiencia:", error);
      NotificacaoManager.error(error.response.data.message, '', 1500, 'filled');
    }
  };

  return (
    <div className="tela-nova-deficiencia">
      <header>
        <img
          src="/assets/img/cepe_joinville_laranja 2.png"
          alt="Logo"
          id="logo"
          className="logo"
          onClick={handleLogoClick}
        />
        <h1>Nova Deficiência</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div id="campos">
          <div className="form-group">
            <label htmlFor="nome">Deficiência</label>
            <input
              type="text"
              id="nome"
              value={TP_DEFICIENCIA}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="descricao">Descrição da deficiência</label>
            <input
              type="text"
              id="descricao"
              value={NOMENCLATURA}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
        </div>
        <Button color="default" className="btn-criar-deficiencia">
          Cadastrar Deficiência
        </Button>
      </form>
    </div>
  );
};

export default ViewNovaDeficiencia;
