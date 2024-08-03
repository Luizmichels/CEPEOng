import React, { useState, startTransition } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import api from "../../../utlis/api";
import { NotificacaoManager } from "../../notificacao";
import "./NovaUsuario.scss";

const ViewNovaUsuario = () => {
  const [NM_USUARIO, setNome] = useState("");
  const [SENHA, setSenha] = useState("");
  const [EMAIL, setEmail] = useState("");
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
      await api.post("/usuario/cadastro", { NM_USUARIO, SENHA, EMAIL }, config)

      NotificacaoManager.success('Usuário criado com sucesso', '', 1000, 'filled');

      startTransition(() => {
        navigate("/usuario");
      });
    } catch (error) {
      NotificacaoManager.error(error.response.data.message, '', 1500, 'filled');
    }
  };

  return (
    <div className="tela-nova-usuario">
      <header>
        <img
          src="/assets/img/cepe_joinville_laranja 2.png"
          alt="Logo"
          id="logo"
          className="logo"
          onClick={handleLogoClick}
        />
        <h1>Novo Usuário</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div id="campos">
          <div className="form-group">
            <label htmlFor="nome">Usuário</label>
            <input
              type="text"
              id="nome"
              value={NM_USUARIO}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="text"
              id="senha"
              value={SENHA}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              id="email"
              value={EMAIL}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <Button color="default" className="btn-criar-usuario">
          Cadastrar Usuário
        </Button>
      </form>
    </div>
  );
};

export default ViewNovaUsuario;
