import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "reactstrap";
import api from "../../../utlis/api";
import { NotificacaoManager } from "../../notificacao";
import "./NovaAnuidade.scss";

const ViewEditarAnuidade = () => {
  const [VL_ANUIDADE, setValor] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchValorAnuidadeUnico();
  }, []);

  const fetchValorAnuidadeUnico = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const { data } = await api.get(`/valorPag/listar`, config);
      if (data && data.VALOR !== undefined) {
        setValor(data.VALOR);
      } else {
        console.error("Erro ao buscar valor único da anuidade para edição:", data);
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

      await api.patch(`/valorPag/atualizar`,
        { VALOR: VL_ANUIDADE },
        config
      );

      NotificacaoManager.primary('Valor da anuidade alterado com sucesso!', '', 500, 'filled')

      navigate("/anuidade");
    } catch (error) {
      NotificacaoManager.error(error.response.data.message, '', 1500, 'filled');
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
        <h1>Editar Anuidade</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div id="campos">
          <div className="form-group">
            <label htmlFor="valor">Valor da Anuidade</label>
            <Input
              type="number"
              id="valor"
              value={VL_ANUIDADE}
              onChange={(e) => setValor(e.target.value)}
            />
          </div>
        </div>
        <Button color="primary" className="btn-criar-anuidade">
          Salvar Alterações
        </Button>
      </form>
    </div>
  );
};

export default ViewEditarAnuidade;