import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Label,
  Row,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { setToken, setNivel, setId } from "../../../utlis";
import { post } from "../../../utlis/api";
import "./login.scss";
import "./inputs.css";

const items = [
  {
    src: "/assets/img/campeoes.png",
  },
  {
    src: "/assets/img/campeoes.png",
  },
  {
    src: "/assets/img/campeoes.png",
  },
];

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await post("/usuario/login", {
        NM_USUARIO: user,
        SENHA: password,
      });
      console.debug("Login bem-sucedido:", data);
      setToken(data.token);
      setNivel(data.nivelAcesso);
      setId(data.usuarioId);

      if (data.nivelAcesso === 3) {
        navigate("/menu");
      } else if (data.nivelAcesso === 2) {
        navigate("/menu-tecnico");
      } else if (data.nivelAcesso === 1) {
        navigate("/check-cadastro");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message, "error");
      } else {
        setErrorMessage("Erro desconhecido", "error");
      }
      setTimeout(() => {
        setErrorMessage("");
      }, 2500);
    }
  };

  const handleRegisterClick = () => {
    navigate("/realizar-cadastro");
  };

  const next = () => {
    // if (animating) return;
    // const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    // setActiveIndex(nextIndex);
  };

  const previous = () => {
    // if (animating) return;
    // const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    // setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    // if (animating) return;
    // setActiveIndex(newIndex);
  };

  return (
    <div className="tela-login tela">
      <Form onSubmit={handleLogin} className="formulario">
        <div className="conteudo pe-4">
          <img
            src="/assets/img/cepe_joinville_laranja 2.png"
            className="logo"
            alt="Logo"
          />
          <div className="campos">
            <h2>Login</h2>
            <div className="usuarioesenha">
              <Row className="mb-3">
                <Col xs="12" className="form-group">
                  <Label for="nome_usuario">Usuário</Label>
                  <Input
                    required
                    id="nome_usuario"
                    onChange={(e) => setUser(e.target.value)}
                    className="user"
                    value={user}
                  />
                </Col>
              </Row>
              <Row className="mb-1">
                <Col xs="12" className="form-group">
                  <Label for="senha_usuario">Senha</Label>
                  <Input
                    required
                    id="senha_usuario"
                    onChange={(e) => setPassword(e.target.value)}
                    className="senha"
                    type="password"
                    value={password}
                  />
                </Col>
              </Row>
            </div>
            <div>
              <a href="esqueci-senha" className="esqueci">
                Esqueceu a senha?
              </a>
            </div>
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="d-flex justify-content-between rodapes">
            <Button color="default" onClick={handleRegisterClick}>
              Quero me associar
            </Button>
            <Button color="default" type="submit">
              Entrar
            </Button>
          </div>
        </div>
      </Form>
      <div className="imagemzona">
        <Carousel
          activeIndex={activeIndex}
          next={next}
          previous={previous}
          // onExiting={() => setAnimating(true)}
          // onExited={() => setAnimating(false)}
          // interval={3800} // Define o intervalo de transição automática em milissegundos
        >
          <CarouselIndicators
            items={items}
            activeIndex={activeIndex}
            onClickHandler={goToIndex}
          />
          {items.map((item) => (
            <CarouselItem
              // onExiting={() => setAnimating(true)}
              // onExited={() => setAnimating(false)}
              key={item.src}
            >
              <img src={item.src} alt={item.altText} className="imagemzinha"/>
              <CarouselCaption
                captionText={item.caption}
                captionHeader={item.altText}
              />
            </CarouselItem>
          ))}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={previous}
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={next}
          />
        </Carousel>
      </div>
    </div>
  );
}

export default Login;
