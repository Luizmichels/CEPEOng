import React, { useEffect } from "react";
import { Button, Col, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./inputs.scss";
import "./cadastros_geral.scss";

const teste = [
  { link: "/usuario", tela: "Novo Usuário" },
  { link: "/associado", tela: "Novo Associado" },
  { link: "/alterar-cadastro", tela: "Alterar Cadastro" },
  { link: "/permissoes", tela: "Permissões" },
  { link: "/modalidade", tela: "Nova Modalidade" },
  { link: "/equipamento", tela: "Equipamento de Locomoção" },
  { link: "/funcoes", tela: "Nova Função" },
  { link: "/deficiencia", tela: "Nova Deficiencia" },
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
