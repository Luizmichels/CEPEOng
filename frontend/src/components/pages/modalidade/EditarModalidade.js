import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input } from "reactstrap";
import api from "../../../utlis/api";
import { NotificacaoManager } from "../../notificacao";
import "./NovaModalidade.scss";

const ViewEditarModalidade = () => {
  const [NM_MODALIDADE, setNome] = useState("");
  const [NOMENCLATURA, setDescricao] = useState("");
  const navigate = useNavigate();
  const { CD_MODALIDADE
    
   } = useParams();

  useEffect(() => {
    if (CD_MODALIDADE
      
    ) {
      fetchModalidade(CD_MODALIDADE);
    }
  }, [CD_MODALIDADE]);

  const fetchModalidade = async (CD_MODALIDADE) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const { data } = await api.get(`/modalidade/obter/${CD_MODALIDADE}`, config);
      const { modalidade } = data;
      setNome(modalidade.NM_MODALIDADE ?? "");
      setDescricao(modalidade.NOMENCLATURA ?? "");
    } catch (error) {
      console.error("Erro ao buscar Modalidade:", error);
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

      await api.patch(`/modalidade/editar/${CD_MODALIDADE}`,
        { NM_MODALIDADE, NOMENCLATURA },
        config
      );

      NotificacaoManager.primary('Alterado com sucesso!', '', 500, 'filled')

      navigate("/modalidade");
    } catch (error) {
      console.error("Erro ao atualizar Modalidade:", error);
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
        <h1>Editar Modalidade</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div id="campos">
          <div className="form-group">
            <label htmlFor="nome">Nome da Modalidade</label>
            <Input
              type="text"
              id="nome"
              value={NM_MODALIDADE}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="descricao">Descrição da Modalidade</label>
            <Input
              type="text"
              id="descricao"
              value={NOMENCLATURA}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
        </div>
        <Button color="primary" className="btn-criar-modalidade">
          Salvar Alterações
        </Button>
      </form>
    </div>
  );
};

export default ViewEditarModalidade;
