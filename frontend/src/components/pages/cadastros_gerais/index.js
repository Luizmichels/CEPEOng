import React from "react";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { Link } from "react-router-dom";
import "./inputs.css";
import "./cadastros_geral.css";

function App() {
  const handleClick = () => {
    // Lidar com a navegação para o menu
    window.location.href = "/menu";
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
            <a href="../html/cad_escolher_modalidade.html">Nova Modalidade</a>
          </div>
          <div className="quadrado">
            <a href="#">Permissões</a>
          </div>
          <div className="quadrado">
            <a href="../html/cad_meio_locomocao.html">
              Equipamento de Locomoção
            </a>
          </div>
          <div className="quadrado">
            <a href="../html/cad_novo_associado.html">Novo Associado</a>
          </div>
        </div>

        <div className="linha2">
          <div className="quadrado">
            <a href="../html/cad_nova_funcao.html">Nova Função</a>
          </div>
          <div className="quadrado">
            <a href="#">Alterar Cadastro</a>
          </div>
          <div className="quadrado">
            <a href="../html/cad_nova_deficiencia.html">Nova Deficiencia</a>
          </div>
          <div className="quadrado">
            <a href="../html/cad_novo_usuario.html">Novo Usuário</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
