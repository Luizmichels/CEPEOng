import React from "react";
import { Button } from "reactstrap";
import "./RealizeCadastro.css";

function RealizeCadastro() {
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
      <div className="form-container">
        <input type="text" className="input-field" placeholder="Nome" />
        <input type="tel" className="input-field" placeholder="Telefone" />
        <input type="email" className="input-field" placeholder="Email" />
      </div>
      <div className="botao-container">
        <Button color="default" className="clique-aqui">
          Enviar
        </Button>
      </div>
    </div>
  );
}

export default RealizeCadastro;
