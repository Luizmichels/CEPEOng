import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { post } from "./utlis/api";
import { getToken } from "./utlis";
import NotificacaoContainer from "./components/notificacao/notificacaoContainer";
import "./components/notificacao/notificacao.scss";

// Componentes Lazy-loaded
const ViewLogin = lazy(() => import("./components/pages/login"));
const ViewMenu = lazy(() => import("./components/pages/menu"));
const ViewListagem = lazy(() => import("./components/pages/listagem"));
const ViewCadGeral = lazy(() => import("./components/pages/cadastros_gerais"));
const ViewCadTec = lazy(() => import("./components/pages/CadastroTecnico"));
const ViewFuncoes = lazy(() => import("./components/pages/funcao"));
const ViewNovaFuncao = lazy(() => import("./components/pages/funcao/nova-funcao"));
const ViewEditarFuncao = lazy(() => import("./components/pages/funcao/editar-funcao"));
const ViewModalidade = lazy(() => import("./components/pages/modalidade"));
const ViewNovaModalidade = lazy(() => import("./components/pages/modalidade/NovaModalidade"));
const ViewEditarModalidade = lazy(() => import("./components/pages/modalidade/EditarModalidade"));
const ViewDeficiencia = lazy(() => import("./components/pages/deficiencia"));
const ViewNovaDeficiencia = lazy(() => import("./components/pages/deficiencia/NovaDeficiencia"));
const ViewEditarDeficiencia = lazy(() => import("./components/pages/deficiencia/EditarDeficiencia"));
const ViewEquipamento = lazy(() => import("./components/pages/EquipamentoLocomocao"));
const ViewNovaEquipamento = lazy(() => import("./components/pages/EquipamentoLocomocao/NovaEquipamento"));
const ViewEditarEquipamento = lazy(() => import("./components/pages/EquipamentoLocomocao/EditarEquipamento"));
const ViewUsuario = lazy(() => import("./components/pages/usuario"));
const ViewNovaUsuario = lazy(() => import("./components/pages/usuario/NovaUsuario"));
// const ViewEditarUsuario = lazy(() => import("./components/pages/usuario/EditarUsuario"));
const ViewEditarAcesso = lazy(() => import("./components/pages/usuario/EditarNivelAcesso"));
const ViewNovoAssociado = lazy(() => import("./components/pages/CadastroAssociado"));

function ValidaSessao({ tela: Tela, nivel = 1 }) {
  const [load, setLoad] = useState(true);
  const [permissao, setPermissao] = useState(null);

  useEffect(() => {
    const validarPermissao = async () => {
      try {
        const { data } = await post("/usuario/validaPermissao", {
          token: getToken(),
        });
        const { ok, nivel: nivelUsuario } = data;
        setPermissao({ ok, nivelUsuario });
      } catch (error) {
        console.error("Erro ao validar permissão:", error);
        setPermissao({ ok: false });
      } finally {
        setLoad(false);
      }
    };

    validarPermissao();
  }, []);

  if (load) return <div>Loading...</div>;
  if (!permissao.ok) return <Navigate to="/rota_de_falta_de_permissao" />;
  if (permissao.nivelUsuario < nivel)
    return <Navigate to="/rota_de_falta_de_permissao2" />;

  return <Tela nivel={permissao.nivelUsuario} />;
}

function App() {
  return (
    <div className="h-100">
      <NotificacaoContainer />
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<ViewLogin />} />
            <Route path = "/menu" element = {<ValidaSessao tela={ViewMenu} nivel={3} />} />
            <Route path = "/listagem" element = {<ValidaSessao tela={ViewListagem} nivel={3} />} />
            <Route path = "/cadastros" element = {<ValidaSessao tela={ViewCadGeral} nivel={3} />} />
            <Route path = "/associado" element = {<ValidaSessao tela={ViewNovoAssociado} nivel={1} />} />
            <Route path = "/cadastro" element = {<ValidaSessao tela={ViewCadTec} nivel={2} />} />
            <Route path = "/funcoes" element = {<ValidaSessao tela={ViewFuncoes} nivel={3} />} />
            <Route path = "/funcoes/nova" element = {<ValidaSessao tela={ViewNovaFuncao} nivel={3} />} />
            <Route path = "/funcoes/editar/:CD_FUNCAO" element = {<ValidaSessao tela={ViewEditarFuncao} nivel={3} />} />
            <Route path = "/modalidade" element = {<ValidaSessao tela={ViewModalidade} nivel={3} />} />
            <Route path = "/modalidade/nova" element = {<ValidaSessao tela={ViewNovaModalidade} nivel={3} />} />
            <Route path = "/modalidade/editar/:CD_MODALIDADE" element = {<ValidaSessao tela={ViewEditarModalidade} nivel={3} />} />
            <Route path = "/deficiencia" element = {<ValidaSessao tela={ViewDeficiencia} nivel={3} />} />
            <Route path = "/deficiencia/nova" element = {<ValidaSessao tela={ViewNovaDeficiencia} nivel={3} />} />
            <Route path = "/deficiencia/editar/:CD_DEFICIENCIA" element = {<ValidaSessao tela={ViewEditarDeficiencia} nivel={3} />} />
            <Route path = "/equipamento" element = {<ValidaSessao tela={ViewEquipamento} nivel={3} />} />
            <Route path = "/equipamento/nova" element = {<ValidaSessao tela={ViewNovaEquipamento} nivel={3} />} />
            <Route path = "/equipamento/editar/:CD_MEIO_LOCOMOCAO" element = {<ValidaSessao tela={ViewEditarEquipamento} nivel={3} />} />
            <Route path = "/usuario" element = {<ValidaSessao tela={ViewUsuario} nivel={3} />} />
            <Route path = "/usuario/novo" element = {<ValidaSessao tela={ViewNovaUsuario} nivel={3} />} />
            {/* <Route path = "/usuario/editar/:CD_USUARIO" element = {<ValidaSessao tela={ViewEditarUsuario} nivel={3} />} /> */}
            <Route path = "/usuario/editar/acesso/:CD_USUARIO" element = {<ValidaSessao tela={ViewEditarAcesso} nivel={3} />} />
            <Route path="*" element={<div>Erro: Página não encontrada</div>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
