import { lazy, useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { post } from './utlis/api';
import { getToken } from './utlis';

const ViewLogin = lazy(() => import('./components/pages/login'));
const ViewMenu = lazy(() => import('./components/pages/menu'));
const ViewCadGeral = lazy(() => import('./components/pages/cadastros_gerais'));

function ValidaSessao({tela, nivel}) {
  const [load, setLoad] = useState(true);
  const [permisao, setPermisao] = useState(false);
  useEffect(()=>{
    setLoad(true);

    post('valida a sessao', { token: getToken() }).then(({ data })=>{
      const { ok } = data;
      setPermisao(ok)
      setLoad(false);
    });
  })

  if( load ) return <div>Loading</div>
  if( !permisao ) return <Navigate to="rota de falta de permissao" />

  return tela; 
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='login' element={<ViewLogin />} />
        <Route path='*' element={<div>Erro</div>} />
      </Routes>
      <Routes>
        <Route path='menu' element={<ViewMenu />} />
        <Route path='tela_privada' element={<ValidaSessao tela={<ViewMenu />} />} />
      </Routes>
      <Routes>
        <Route path='cadastros' element={<ViewCadGeral />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
