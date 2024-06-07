import { lazy } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom'

const ViewLogin = lazy(()=> import('./components/pages/login'));
const ViewMenu = lazy(()=> import('./components/pages/menu'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='login' element={<ViewLogin />} />
        <Route path='*' element={<div>Erro</div>} />
      </Routes>
      <Routes>
        <Route path='menu' element={<ViewMenu />} />
        <Route path='*' element={<div>Erro</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
