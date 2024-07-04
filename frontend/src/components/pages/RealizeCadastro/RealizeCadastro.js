import React from "react";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom"; // Importar o hook useNavigate
import "./RealizeCadastro.css";

function RealizeCadastro() {
  const navigate = useNavigate(); // Inicializar o hook useNavigate

  const handleClick = () => {
    navigate('/associado');
  };

  return (
    <div className="tela realize-cadastro">
      <div className="logo-container">
        <img
          src="/assets/img/cepe_joinville_laranja 2.png"
          className="logo"
          alt="Logo"
        />
      </div>
      <div className="titulo-container">
        <h2 className="titulo">Realize seu cadastro!</h2>
      </div>
      <div className="botao-container">
        <Button color="default" className="clique-aqui" onClick={handleClick}>
          Clique aqui
        </Button>
      </div>
    </div>
  );
}

export default RealizeCadastro;
