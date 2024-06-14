import React, { useEffect } from "react";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "./inputs.scss";
import "./cadastros_geral.scss";

const teste = [
  { link: "/nova-modalidade", tela: "Nova Modalidade" },
  { link: "/permissoes", tela: "Permissões" },
  { link: "/equipamento-locomocao", tela: "Equipamento de Locomoção" },
  { link: "/novo-associado", tela: "Novo Associado" },
  { link: "/funcoes", tela: "Nova Função" },
  { link: "/alterar-cadastro", tela: "Alterar Cadastro" },
  { link: "/nova-deficiencia", tela: "Nova Deficiencia" },
  { link: "/novo-usuario", tela: "Novo Usuário" },
];

function App() {
  const navigate = useNavigate();

  const handleClick = (link = "/menu") => {
    navigate(link);
  };

  useEffect(() => {
    document.body.classList.add("cadastro-gerais-body");
    return () => {
      document.body.classList.remove("cadastro-gerais-body");
    };
  }, []);

  return (
    <div className="tela cadastro-gerais">
      <img
        src="../../../assets/img/cepe_joinville_laranja 2.png"
        alt="logo"
        onClick={() => handleClick()} // Adicionar evento de clique para lidar com a navegação
      />
      <div className="cadastros">
        {new Array(Math.ceil(teste.length / 4)).fill().map((_, i) => {
          return (
            <Row className="mb-4">
              {teste.slice(i * 4, (i + 1) * 4).map(({ link, tela }) => {
                return (
                  <Col xs="3" className="justify-content-center d-flex">
                    <Button
                      color="default"
                      className="quadradov2 btn-h2 "
                      onClick={() => handleClick(link)}
                    >
                      {tela}
                    </Button>
                  </Col>
                );
              })}
            </Row>
          );
        })}
      </div>
    </div>
  );
}

export default App;
