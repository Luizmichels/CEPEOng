import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input } from "reactstrap";
import api from "../../../utlis/api";
import { NotificacaoManager } from "../../notificacao";
import "./NovaUsuario.scss";

const ViewEditarAcesso = () => {
  const [NM_USUARIO, setNome] = useState("");
  const [NIVEL_ACESSO, setAcesso] = useState("");
  const navigate = useNavigate();
  const { CD_USUARIO } = useParams();

  useEffect(() => {
    if (CD_USUARIO) {
      fetchUsuario(CD_USUARIO);
    }
  }, [CD_USUARIO]);

  const fetchUsuario = async (CD_USUARIO) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const { data } = await api.get(`/usuario/obter/${CD_USUARIO}`, config);
      const { usuario } = data;
      setNome(usuario.NM_USUARIO ?? "");
      setAcesso(usuario.NIVEL_ACESSO ?? "");
    } catch (error) {
      console.error("Erro ao buscar Usuário:", error);
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
        `/usuario/editar/nivel_acesso/${CD_USUARIO}`,
        { NIVEL_ACESSO },
        config
      );

      NotificacaoManager.success('Alterado com sucesso!', '', 500, 'filled')

      navigate("/usuario");
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
        <h1>Editar Nível de Acesso do Usuário</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div id="campos">
          <div className="form-group">
            <label htmlFor="nome">Usuário</label>
            <Input
              type="text"
              id="nome"
              value={NM_USUARIO}
              onChange={(e) => setNome(e.target.value)}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="acesso">Nível de Acesso</label>
            <Input
              type="select"
              id="acesso"
              value={NIVEL_ACESSO}
              onChange={(e) => setAcesso(e.target.value)}
              className="custom-select"
            >
              <option value="">Selecione o nível de acesso</option>
              <option value="1">Usuário</option>
              <option value="2">Técnico</option>
              <option value="3">Administrador</option>
            </Input>
          </div>
        </div>
        <Button color="default" className="btn-criar-usuario">
          Salvar Alterações
        </Button>
      </form>
    </div>
  );
};

export default ViewEditarAcesso;
