import React, { useState, useEffect, startTransition } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import api from "../../../utlis/api";
import { NotificacaoManager } from "../../notificacao";
import "./TecModNovaEditar.scss";

const ViewNovaUsuarios = () => {
  const [usuario, setUsuarios] = useState([]);
  const [modalidades, setModalidades] = useState([]);
  const [selectedUsuario, setSelectedUsuario] = useState("");
  const [selectedModalidade, setSelectedModalidade] = useState("");
  const { CD_TECNICO_MODALIDADE } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        // Fetch usuario
        const usuariosResponse = await api.get("usuario/listar/nivel2", config);
        setUsuarios(usuariosResponse.data.usuario);

        // Fetch modalidades
        const modalidadesResponse = await api.get("/modalidade/listar", config);
        setModalidades(modalidadesResponse.data.modalidades);

        // Fetch specific tecnico e modalidade data
        if (CD_TECNICO_MODALIDADE) {
          const tecnicoModalidadeResponse = await api.get(`usuario/obter/tecModali/${CD_TECNICO_MODALIDADE}`, config);
          const { NM_PESSOA, NM_MODALIDADE} = tecnicoModalidadeResponse.data;
          setSelectedUsuario(NM_PESSOA);
          setSelectedModalidade(NM_MODALIDADE);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        NotificacaoManager.error('Erro ao buscar dados!', '', 1000, 'filled');
      }
    };

    fetchData();
  }, [CD_TECNICO_MODALIDADE]);

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
      await api.patch(`usuario/editar/tecModali/${CD_TECNICO_MODALIDADE}`, 
        { CD_USUARIO: selectedUsuario, CD_MODALIDADE: selectedModalidade }, 
        config);

      NotificacaoManager.success('Cadastrado com sucesso!', '', 1000, 'filled');

      startTransition(() => {
        navigate("/tecnico");
      });
    } catch (error) {
      console.error("Erro ao criar usuario:", error);
      NotificacaoManager.error('Erro ao cadastrar usuario!', '', 1000, 'filled');
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
        <h1>Editar técnico</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div id="campos">
          <div className="form-group">
            <label htmlFor="usuario">Nome do técnico</label>
            <select
              id="usuario"
              value={selectedUsuario}
              onChange={(e) => setSelectedUsuario(e.target.value)}
              className="form-control"
            >
              {selectedUsuario && (
                <option value={selectedUsuario}>
                  {usuario.find((u) => u.CD_USUARIO === selectedUsuario)?.NM_PESSOA || "Carregando..."}
                </option>
              )}
              {usuario.map((usuario) => (
                <option key={usuario.CD_USUARIO} value={usuario.CD_USUARIO}>
                  {usuario.NM_PESSOA}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="modalidade">Descrição do técnico</label>
            <select
              id="modalidade"
              value={selectedModalidade}
              onChange={(e) => setSelectedModalidade(e.target.value)}
              className="form-control"
            >
              {selectedModalidade && (
                <option value={selectedModalidade}>
                  {modalidades.find((m) => m.CD_MODALIDADE === selectedModalidade)?.NM_MODALIDADE || "Carregando..."}
                </option>
              )}
              {modalidades.map((modalidade) => (
                <option key={modalidade.CD_MODALIDADE} value={modalidade.CD_MODALIDADE}>
                  {modalidade.NM_MODALIDADE}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Button color="default" className="btn-criar-usuario">
          Editar técnico
        </Button>
      </form>
    </div>
  );
};

export default ViewNovaUsuarios;
