import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { getToken } from "../utlis";
import { post, get } from "../utlis/api";

const ViewLogin = lazy(() => import("../components/pages/login"));
const ViewMenu = lazy(() => import("../components/pages/menu"));
const ViewListagem = lazy(() => import("../components/pages/listagem"));
const ViewListagemTec = lazy(() => import("../components/pages/listagemTecnico"));
const ViewCadGeral = lazy(() => import("../components/pages/cadastros_gerais"));
const ViewCadTec = lazy(() => import("../components/pages/CadastroTecnico"));
const ViewFuncoes = lazy(() => import("../components/pages/funcao"));
const ViewNovaFuncao = lazy(() => import("../components/pages/funcao/nova-funcao"));
const ViewEditarFuncao = lazy(() => import("../components/pages/funcao/editar-funcao"));
const ViewModalidade = lazy(() => import("../components/pages/modalidade"));
const ViewNovaModalidade = lazy(() => import("../components/pages/modalidade/NovaModalidade"));
const ViewEditarModalidade = lazy(() => import("../components/pages/modalidade/EditarModalidade"));
const ViewDeficiencia = lazy(() => import("../components/pages/deficiencia"));
const ViewNovaDeficiencia = lazy(() => import("../components/pages/deficiencia/NovaDeficiencia"));
const ViewEditarDeficiencia = lazy(() => import("../components/pages/deficiencia/EditarDeficiencia"));
const ViewEquipamento = lazy(() => import("../components/pages/EquipamentoLocomocao"));
const ViewNovaEquipamento = lazy(() => import("../components/pages/EquipamentoLocomocao/NovaEquipamento"));
const ViewEditarEquipamento = lazy(() => import("../components/pages/EquipamentoLocomocao/EditarEquipamento"));
const ViewUsuario = lazy(() => import("../components/pages/usuario"));
const ViewNovaUsuario = lazy(() => import("../components/pages/usuario/NovaUsuario"));
const ViewEditarAcesso = lazy(() => import("../components/pages/usuario/EditarNivelAcesso"));
const ViewNovoAssociado = lazy(() => import("../components/pages/CadastroAssociado"));
const ViewEditarUsuario = lazy(() => import("../components/pages/usuario/EditarUsuario"));
const ViewCheckCadastro = lazy(() => import("../components/pages/menu_usuario/CheckCadastro"));
const ViewTecnico = lazy(() => import("../components/pages/TecnicoModalidade"));
const ViewNovoTecnico = lazy(() => import("../components/pages/TecnicoModalidade/NovaTecMod"));
const ViewEditarTecnico = lazy(() => import("../components/pages/TecnicoModalidade/EditarTecMod"));
const ViewAlterarCadastro = lazy(() => import("../components/pages/AlterarCadastro"))
const ViewEsqueciSenha = lazy(() => import("../components/pages/esqueciSenha/esqueciSenha"));
const ViewRealizeCadastro = lazy(() => import("../components/pages/RealizeCadastro/RealizeCadastro"))
const ViewMenuTecico = lazy(() => import("../components/pages/MenuTecnico"))
const ViewAlterarSenha = lazy(() => import("../components/pages/AlterarSenha"))

interface Permissao {
  ok: boolean;
  nivelUsuario?: number;
}

interface TelaProps {
  nivel: number | undefined;
}

interface Props {
  tela: React.LazyExoticComponent<({ nivel }: TelaProps) => JSX.Element>;
  nivel?: number;
}

function ValidaSessao({ tela: Tela, nivel = 1 }: Props) {
  const [load, setLoad] = useState(true);
  const [permissao, setPermissao] = useState<Permissao>();

  useEffect(() => {
    const validarPermissao = async () => {
      try {
        const { data } = await post("/usuario/validaPermissao", {
          token: getToken(),
        });
        const { ok, nivel: nivelUsuario } = data;
        console.log(ok, nivel)
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
  if (!permissao?.ok) return <Navigate to="/rota_de_falta_de_permissao" />;
  if (permissao?.nivelUsuario) {
    if (permissao?.nivelUsuario < nivel) {
      return <Navigate to="/rota_de_falta_de_permissao2" />;
    }
  }
  return <Tela nivel={permissao.nivelUsuario} />;
}

export default function Rotas() {
  return <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="" element={<Navigate to="login" />} />

        <Route path="realizar-cadastro" element={<ViewRealizeCadastro />} />
        <Route path="login" element={<ViewLogin />} />
        <Route path="esqueci-senha" element={<ViewEsqueciSenha />} /> {/* Rota para Esqueci Minha Senha */}
        <Route path="check-cadastro" element={<ViewCheckCadastro />} />
        <Route path="menu" element={<ValidaSessao tela={ViewMenu} nivel={3} />} />
        <Route path="menu-tecnico" element={<ValidaSessao tela={ViewMenuTecico} nivel={2} />} />
        <Route path="listagem" element={<ValidaSessao tela={ViewListagem} nivel={3} />} />
        <Route path="listagem-tec" element={<ValidaSessao tela={ViewListagemTec} nivel={2} />} />
        <Route path="cadastros" element={<ValidaSessao tela={ViewCadGeral} nivel={3} />} />
        <Route path="associado" element={<ValidaSessao tela={ViewNovoAssociado} nivel={1} />} />
        <Route path="cadastro" element={<ValidaSessao tela={ViewCadTec} nivel={2} />} />
        <Route path="alterar-senha" element={<ValidaSessao tela={ViewAlterarSenha} nivel={1} />} />
        
        <Route path="funcoes" >
          <Route index element={<ValidaSessao tela={ViewFuncoes} nivel={3} />} />
          <Route path="nova" element={<ValidaSessao tela={ViewNovaFuncao} nivel={3} />} />
          <Route path="editar/:CD_FUNCAO" element={<ValidaSessao tela={ViewEditarFuncao} nivel={3} />} />
        </Route>

        <Route path="modalidade">
          <Route index element={<ValidaSessao tela={ViewModalidade} nivel={3} />} />
          <Route path="nova" element={<ValidaSessao tela={ViewNovaModalidade} nivel={3} />} />
          <Route path="editar/:CD_MODALIDADE" element={<ValidaSessao tela={ViewEditarModalidade} nivel={3} />} />
        </Route>

        <Route path="deficiencia">
          <Route index element={<ValidaSessao tela={ViewDeficiencia} nivel={3} />} />
          <Route path="nova" element={<ValidaSessao tela={ViewNovaDeficiencia} nivel={3} />} />
          <Route path="editar/:CD_DEFICIENCIA" element={<ValidaSessao tela={ViewEditarDeficiencia} nivel={3} />} />
        </Route>

        <Route path="equipamento">
          <Route index element={<ValidaSessao tela={ViewEquipamento} nivel={3} />} />
          <Route path="nova" element={<ValidaSessao tela={ViewNovaEquipamento} nivel={3} />} />
          <Route path="editar/:CD_MEIO_LOCOMOCAO" element={<ValidaSessao tela={ViewEditarEquipamento} nivel={3} />} />
        </Route>

        <Route path="usuario">
          <Route index element={<ValidaSessao tela={ViewUsuario} nivel={3} />} />
          <Route path="editar" element={<ViewEditarUsuario />} />
          <Route path="novo" element={<ValidaSessao tela={ViewNovaUsuario} nivel={3} />} />
          {/* <Route path = "/editar/:CD_USUARIO" element = {<ValidaSessao tela={ViewEditarUsuario} nivel={3} />} /> */}
          <Route path="editar/acesso/:CD_USUARIO" element={<ValidaSessao tela={ViewEditarAcesso} nivel={3} />} />
        </Route>

        <Route path="tecnico" >
          <Route index element={<ValidaSessao tela={ViewTecnico} nivel={3} />} />
          <Route path="novo" element={<ValidaSessao tela={ViewNovoTecnico} nivel={3} />} />
          <Route path="editar/:CD_TECNICO_MODALIDADE" element={<ValidaSessao tela={ViewEditarTecnico} nivel={3} />} />
        </Route>

        <Route path="alterar" element={<ValidaSessao tela={ViewAlterarCadastro} nivel={3} />} />
        <Route path="*" element={<div>Erro: Página não encontrada</div>} />
      </Routes>
    </Suspense>
  </BrowserRouter>
}