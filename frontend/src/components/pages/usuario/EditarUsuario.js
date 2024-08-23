import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input } from "reactstrap";
import api from "../../../utlis/api";
import { NotificacaoManager } from "../../notificacao";
import "./NovaUsuario.scss";

const ViewEditarUsuario = () => {
  const [NM_USUARIO, setNome] = useState("");
  const [SENHA, setSenha] = useState("");
  const navigate = useNavigate();
  const { CD_USUARIO
    
   } = useParams();

  useEffect(() => {
    if (CD_USUARIO
      
    ) {
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
      setSenha(usuario.SENHA ?? "");
    } catch (error) {
      console.error("Erro ao buscar Deficiência:", error);
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

      await api.patch(`/usuario/editar/${CD_USUARIO}`,
        { NM_USUARIO, SENHA },
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
        <h1>Editar Usuário</h1>
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
            />
          </div>
          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <Input
              type="text"
              id="senha"
              value={SENHA}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
        </div>
        <Button color="default" className="btn-criar-usuario">
          Salvar Alterações
        </Button>
      </form>
    </div>
  );
};

export default ViewEditarUsuario;
