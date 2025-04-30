import React, { useState, startTransition, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import api from "../../../utlis/api";
import { NotificacaoManager } from "../../notificacao";
import "./NovaAnuidade.scss";

const ViewNovaAnuidade = () => {
  const [VL_ANUIDADE, setValor] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Buscar o valor atual para preencher o formulário, caso exista
    fetchValorAnuidadeUnico();
  }, []);

  const fetchValorAnuidadeUnico = async () => {
    try {
      const response = await api.get('/valorPag/listar');
      if (response.data && response.data.VALOR !== undefined) {
        setValor(response.data.VALOR);
      }
    } catch (error) {
      console.error("Erro ao buscar valor único da anuidade:", error);
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
      await api.patch("/valorPag/atualizar", { VALOR: VL_ANUIDADE }, config);

      NotificacaoManager.success('Valor da anuidade atualizado com sucesso!', '', 1000, 'filled');

      startTransition(() => {
        navigate("/anuidade");
      });
    } catch (error) {
      console.error("Erro ao atualizar valor da anuidade:", error);
      NotificacaoManager.error(error.response?.data?.message || 'Erro ao atualizar valor da anuidade', '', 1500, 'filled');
    }
  };

  return (
    <div className="tela-nova-anuidade">
      <header>
        <img
          src="/assets/img/cepe_joinville_laranja 2.png"
          alt="Logo"
          id="logo"
          className="logo"
          onClick={handleLogoClick}
        />
        <h1>Editar Anuidade</h1> {/* Mudando o título para Editar */}
      </header>
      <form onSubmit={handleSubmit}>
        <div id="campos">
          <div className="form-group">
            <label htmlFor="valor">Valor da Anuidade</label>
            <input
              type="number"
              id="valor"
              value={VL_ANUIDADE}
              onChange={(e) => setValor(e.target.value)}
            />
          </div>
        </div>
        <Button color="default" className="btn-criar-anuidade">
          Salvar Valor
        </Button>
      </form>
    </div>
  );
};

export default ViewNovaAnuidade;