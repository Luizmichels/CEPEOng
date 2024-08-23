import { useEffect, useState } from "react";
import { Button, Col, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import api from '../../../utlis/api';
import { getToken } from '../../../utlis';
import "./inputs.scss";
import "./cadastros_geral.scss";

const teste = [
  { link: "/usuario", tela: "Usuário" },
  { link: "/associado", tela: "Novo Associado" },
  { link: "/alterar", tela: "Alterar Cadastros" },
  { link: "/tecnico", tela: "Técnico" },
  { link: "/modalidade", tela: "Modalidade" },
  { link: "/equipamento", tela: "Equipamento de Locomoção" },
  { link: "/funcoes", tela: "Função" },
  { link: "/deficiencia", tela: "Deficiencia" },
];

function App() {
  const navigate = useNavigate();
  const [usuarioCadastrado, setUsuarioCadastrado] = useState(undefined);

  const handleClick = (link = "/menu") => {
    if (usuarioCadastrado && link === '/associado') {
      navigate(`/associado?id=${usuarioCadastrado.CD_USUARIO}`);
    } else {
      navigate(link);
    }
  };

  useEffect(() => {
    const verificarCadastro = async () => {
      try {
        const token = getToken();
        const response = await api.get(`/associado/obter/${token}`, 
          { headers: { Authorization: `Bearer ${token.token}` } });
        const usuario = response.data.usuario;
        setUsuarioCadastrado(usuario);
      } catch (error) {
        console.error('Erro ao verificar cadastro:', error);
      }
    };

    verificarCadastro();
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
            <Row className="mb-4" key={i}>
              {teste.slice(i * 4, (i + 1) * 4).map(({ link, tela }, index) => {
                const buttonText = link === '/associado' && usuarioCadastrado != null 
                  ? 'Alterar seu Cadastro' 
                  : tela;
                return (
                  <Col xs="3" className="justify-content-center d-flex" key={index}>
                    <Button
                      color="default"
                      className="quadradov2 btn-h2"
                      onClick={() => handleClick(link)}
                    >
                      {buttonText}
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
