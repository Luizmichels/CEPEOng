import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input } from "reactstrap";
import api from "../../../utlis/api";
import { NotificacaoManager } from "../../notificacao";
import "./NovaEquipamento.scss";

const ViewEditarEquipamento = () => {
  const [NM_MEIO_LOCOMOCAO, setNome] = useState("");
  const [DS_MEIO_LOCOMOCAO, setDescricao] = useState("");
  const navigate = useNavigate();
  const { CD_MEIO_LOCOMOCAO
    
   } = useParams();

  useEffect(() => {
    if (CD_MEIO_LOCOMOCAO
    ) {
      fetchEquipamento(CD_MEIO_LOCOMOCAO);
    }
  }, [CD_MEIO_LOCOMOCAO]);

  const fetchEquipamento = async (CD_MEIO_LOCOMOCAO) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const { data } = await api.get(`/meioLocomocao/obter/${CD_MEIO_LOCOMOCAO}`, config);
      const { meioLocomocao } = data;
      setNome(meioLocomocao.NM_MEIO_LOCOMOCAO ?? "");
      setDescricao(meioLocomocao.DS_MEIO_LOCOMOCAO ?? "");
    } catch (error) {
      console.error("Erro ao buscar Equipamento Locomoção:", error);
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

      await api.patch(`/meioLocomocao/editar/${CD_MEIO_LOCOMOCAO}`,
        { NM_MEIO_LOCOMOCAO, DS_MEIO_LOCOMOCAO },
        config
      );

      NotificacaoManager.primary('Alterado com sucesso!', '', 500, 'filled')

      navigate("/equipamento");
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
        <h1>Editar Equipamento Locomoção</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div id="campos">
          <div className="form-group">
            <label htmlFor="nome">Equipamento Locomoção</label>
            <Input
              type="text"
              id="nome"
              value={NM_MEIO_LOCOMOCAO}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="descricao">Descrição da Equipamento Locomoção</label>
            <Input
              type="text"
              id="descricao"
              value={DS_MEIO_LOCOMOCAO}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
        </div>
        <Button color="primary" className="btn-criar-equipamento">
          Salvar Alterações
        </Button>
      </form>
    </div>
  );
};

export default ViewEditarEquipamento;
