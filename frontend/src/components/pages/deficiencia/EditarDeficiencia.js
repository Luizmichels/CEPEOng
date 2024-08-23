import  { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input } from "reactstrap";
import api from "../../../utlis/api";
import { NotificacaoManager } from "../../notificacao";
import "./NovaDeficiencia.scss";

const ViewEditarDeficiencia = () => {
  const [TP_DEFICIENCIA, setNome] = useState("");
  const [NOMENCLATURA, setDescricao] = useState("");
  const navigate = useNavigate();
  const { CD_DEFICIENCIA
    
   } = useParams();

  useEffect(() => {
    if (CD_DEFICIENCIA
      
    ) {
      fetchDeficiencia(CD_DEFICIENCIA);
    }
  }, [CD_DEFICIENCIA]);

  const fetchDeficiencia = async (CD_DEFICIENCIA) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const { data } = await api.get(`/deficiencia/obter/${CD_DEFICIENCIA}`, config);
      const { deficiencia } = data;
      setNome(deficiencia.TP_DEFICIENCIA ?? "");
      setDescricao(deficiencia.NOMENCLATURA ?? "");
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

      await api.patch(`/deficiencia/editar/${CD_DEFICIENCIA}`,
        { TP_DEFICIENCIA, NOMENCLATURA },
        config
      );

      NotificacaoManager.primary('Alterado com sucesso!', '', 500, 'filled')

      navigate("/deficiencia");
    } catch (error) {
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
        <h1>Editar Deficiência</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div id="campos">
          <div className="form-group">
            <label htmlFor="nome">Deficiência</label>
            <Input
              type="text"
              id="nome"
              value={TP_DEFICIENCIA}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="descricao">Descrição da Deficiência</label>
            <Input
              type="text"
              id="descricao"
              value={NOMENCLATURA}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
        </div>
        <Button color="primary" className="btn-criar-deficiencia">
          Salvar Alterações
        </Button>
      </form>
    </div>
  );
};

export default ViewEditarDeficiencia;
