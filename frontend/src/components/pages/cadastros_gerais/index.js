import React from "react";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "./inputs.css";
import "./cadastros_geral.css";

function App() {
  const navigate = useNavigate();

  const handleClick = () => {
    // Lidar com a navegação para o menu
    navigate("/menu");
  };

  return (
    <div className="tela">
      <img
        src="../../../assets/img/cepe_joinville_laranja 2.png"
        alt="logo"
        onClick={handleClick} // Adicionar evento de clique para lidar com a navegação
      />
      <div className="cadastros">
        <div className="linha1">
          <div className="quadrado">
            <Link to="/nova-modalidade">Nova Modalidade</Link>
          </div>
          <div className="quadrado">
            <Link to="/permissoes">Permissões</Link>
          </div>
          <div className="quadrado">
            <Link to="/equipamento-locomocao">Equipamento de Locomoção</Link>
          </div>
          <div className="quadrado">
            <Link to="/novo-associado">Novo Associado</Link>
          </div>
        </div>

        <div className="linha2">
          <div className="quadrado">
            <Link to="/funcoes">Nova Função</Link>
          </div>
          <div className="quadrado">
            <Link to="/alterar-cadastro">Alterar Cadastro</Link>
          </div>
          <div className="quadrado">
            <Link to="/nova-deficiencia">Nova Deficiencia</Link>
          </div>
          <div className="quadrado">
            <Link to="/novo-usuario">Novo Usuário</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
