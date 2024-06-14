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
const ViewFuncoes = lazy(() => import("./components/pages/funcao"));
const ViewNovaFuncao = lazy(() =>
  import("./components/pages/funcao/nova-funcao")
);
const ViewEditarFuncao = lazy(() =>
  import("./components/pages/funcao/editar-funcao")
);

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
            <Route
              path="/menu"
              element={<ValidaSessao tela={ViewMenu} nivel={3} />}
            />
            <Route
              path="/listagem"
              element={<ValidaSessao tela={ViewListagem} nivel={3} />}
            />
            <Route
              path="/cadastros"
              element={<ValidaSessao tela={ViewCadGeral} nivel={3} />}
            />
            <Route
              path="/funcoes"
              element={<ValidaSessao tela={ViewFuncoes} nivel={3} />}
            />
            <Route
              path="/funcoes/nova"
              element={<ValidaSessao tela={ViewNovaFuncao} nivel={3} />}
            />
            <Route
              path="/funcoes/editar/:CD_FUNCAO"
              element={<ValidaSessao tela={ViewEditarFuncao} nivel={3} />}
            />
            <Route path="*" element={<div>Erro: Página não encontrada</div>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
