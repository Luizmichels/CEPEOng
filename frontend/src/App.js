import NotificacaoContainer from "./components/notificacao/notificacaoContainer";
import "./components/notificacao/notificacao.scss";
import Rotas from "./route";

// Componentes Lazy-loaded



function App() {
  return (
    <div className="h-100">
      <NotificacaoContainer />
      <Rotas />
    </div>
  );
}

export default App;
