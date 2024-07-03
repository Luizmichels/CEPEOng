import React, { useState, useEffect, startTransition } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CadastroAssociado.scss";
import api from "../../../utlis/api";
import { NotificacaoManager } from "../../notificacao";

const CadastroNovoAtleta = () => {
  const [NM_PESSOA, setNmPessoa] = useState("");
  const [NR_CELULAR, setNrCelular] = useState("");
  const [NR_TELEFONE, setNrTelefone] = useState("");
  const [SEXO, setSexo] = useState("");
  const [DT_NASCIMENTO, setDtNascimento] = useState("");
  const [ESTADO_CIVIL, setEstadoCivil] = useState("");
  const [NATURALIDADE, setNaturalidade] = useState("");
  const [EMAIL, setEmail] = useState("");
  const [ASSISTENCIA, setAssistencia] = useState("");
  const [NM_PAI, setNmPai] = useState("");
  const [CELULAR_PAI, setCelularPai] = useState("");
  const [NM_MAE, setNmMae] = useState("");
  const [CELULAR_MAE, setCelularMae] = useState("");
  const [EMAIL_RESPONS, setEmailRespons] = useState("");
  const [NATURALIDADE_RESPONS, setNaturalidadeRespons] = useState("");
  const [PESO, setPeso] = useState("");
  const [ALTURA, setAltura] = useState("");
  const [GP_SANGUE, setGpSangue] = useState("");
  const [RENDA, setRenda] = useState("");
  const [ESCOLARIDADE, setEscolaridade] = useState("");
  const [INSTITUICAO, setInstituicao] = useState("");
  const [TELEFONE_ESCOLA, setTelefoneEscola] = useState("");
  const [CPF, setCpf] = useState("");
  const [RG, setRg] = useState("");
  const [UF_RG, setUfRg] = useState("");
  const [DT_EMISSAO_RG, setDtEmissaoRg] = useState("");
  const [NR_PASSAPORTE, setNrPassaporte] = useState("");
  const [CPF_RESPONS, setCpfRespons] = useState("");
  const [RG_RESPONS, setRgRespons] = useState("");
  const [UF_RG_RESPONS, setUfRgRespons] = useState("");
  const [DT_EMISSAO_RG_RESPONS, setDtEmissaoRgRespons] = useState("");
  const [NR_PASSAPORTE_RESPONS, setNrPassaporteRespons] = useState("");
  const [CEP, setCep] = useState("");
  const [ENDERECO, setEndereco] = useState("");
  const [NR_ENDERECO, setNrEndereco] = useState("");
  const [DS_ENDERECO, setDsEndereco] = useState("");
  const [CLASSIF_FUNC, setClassifFunc] = useState("");
  const [PROVA, setProva] = useState("");
  const [TAMANHO_CAMISA, setTamanhoCamisa] = useState("");
  const [TAMANHO_AGASALHO, setTamanhoAgasalho] = useState("");
  const [TAMANHO_BERM_CAL, setTamanhoBermCal] = useState("");
  const [NR_CALCADO, setNrCalcado] = useState("");
  const [FOTO_ATLETA, setFotoAtleta] = useState("");
  const [FOTO_RG, setFotoRg] = useState("");
  const [FOTO_RG_RESPONS, setFotoRgRespons] = useState("");
  const [CD_EQUIPA_LOCOMOCAO, setEquipaLocomocao] = useState("");
  const [meio, setMeios] = useState([]);
  const [selectedMeios, setSelectedMeios] = useState("");
  const [deficiencia, setDeficiencias] = useState([]);
  const [selectedDeficiencias, setSelectedDeficiencias] = useState("");
  const [modalidade, setModalidades] = useState([]);
  const [selectedModalidades, setSelectedModalidades] = useState("");
  const [funcao, setFuncaos] = useState([]);
  const [selectedFuncaos, setSelectedFuncaos] = useState("");

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/menu_usuario");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await api.post("/associado/cadastro",
        {
          NM_PESSOA,
          NR_CELULAR,
          NR_TELEFONE,
          NATURALIDADE,
          SEXO,
          DT_NASCIMENTO,
          ESTADO_CIVIL,
          EMAIL,
          CD_EQUIPA_LOCOMOCAO,
          CD_DEFICIENCIA: selectedDeficiencias,
          MEIO_LOCOMOCAO: selectedMeios,
          CD_FUNCAO: selectedFuncaos,
          ASSISTENCIA,
          NM_PAI,
          CELULAR_PAI,
          NM_MAE,
          CELULAR_MAE,
          EMAIL_RESPONS,
          NATURALIDADE_RESPONS,
          PESO,
          ALTURA,
          GP_SANGUE,
          RENDA,
          ESCOLARIDADE,
          INSTITUICAO,
          TELEFONE_ESCOLA,
          CPF,
          RG,
          UF_RG,
          DT_EMISSAO_RG,
          NR_PASSAPORTE,
          CPF_RESPONS,
          RG_RESPONS,
          UF_RG_RESPONS,
          DT_EMISSAO_RG_RESPONS,
          NR_PASSAPORTE_RESPONS,
          ENDERECO,
          NR_ENDERECO,
          DS_ENDERECO,
          CEP,
          CD_MODALIDADE: selectedModalidades,
          CLASSIF_FUNC,
          PROVA,
          TAMANHO_CAMISA,
          TAMANHO_AGASALHO,
          TAMANHO_BERM_CAL,
          NR_CALCADO,
          FOTO_ATLETA,
          FOTO_RG,
          FOTO_RG_RESPONS,
        },
        config
      );

      NotificacaoManager.success("Cadastrado com sucesso!", "", 1000, "filled");

      startTransition(() => {
        navigate("/menu_usuario");
      });
    } catch (error) {
      console.error("Erro ao criar associado:", error);
      NotificacaoManager.error("Erro ao cadastrar associado!", "", 1000, "filled");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        // Fetch meio
        const meiosResponse = await api.get("/meioLocomocao/listar", config);
        setMeios(meiosResponse.data.meioLocomocaos);

        // Fetch deficiencia
        const deficienciasResponse = await api.get(
          "deficiencia/listar",
          config
        );
        setDeficiencias(deficienciasResponse.data.deficiencias);

        // Fetch modalidade
        const modalidadesResponse = await api.get("modalidade/listar", config);
        setModalidades(modalidadesResponse.data.modalidades);

        // Fetch função
        const funcaosResponse = await api.get("funcao/listar", config);
        setFuncaos(funcaosResponse.data.funcoes);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        NotificacaoManager.error("Erro ao buscar dados!", "", 1000, "filled");
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <header>
        <nav>
          <Row>
            <Col md={3}>
              <img
                className="logo"
                src="../../../assets/img/cepe_joinville_laranja 2.png"
                alt="logo"
                onClick={handleLogoClick}
              />
            </Col>
            <Col className="titulo" md={6}>
              <h1 className="txt-titulo">Cadastro Novo Atleta</h1>
            </Col>
          </Row>
        </nav>
      </header>

      <main>
        <Form onSubmit={handleSubmit}>
          <h2>Dados Pessoais</h2>
          <FormGroup>
            <Label for="NM_PESSOA">Nome Completo:</Label>
            <Input
              type="text"
              id="NM_PESSOA"
              name="NM_PESSOA"
              value={NM_PESSOA}
              onChange={(e) => setNmPessoa(e.target.value)}
            />
          </FormGroup>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="NR_CELULAR">Telefone Celular:</Label>
                <Input
                  type="tel"
                  id="NR_CELULAR"
                  name="NR_CELULAR"
                  placeholder="(00) 00000-0000"
                  maxlength="15"
                  pattern="\(\d{2}\) \d{5}-\d{4}"
                  value={NR_CELULAR}
                  onChange={(e) => setNrCelular(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="NR_TELEFONE">Telefone Residencial:</Label>
                <Input
                  type="tel"
                  id="NR_TELEFONE"
                  name="NR_TELEFONE"
                  placeholder="(00) 00000-0000"
                  maxlength="15"
                  pattern="\(\d{2}\) \d{5}-\d{4}"
                  value={NR_TELEFONE}
                  onChange={(e) => setNrTelefone(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="NATURALIDADE">Naturalidade:</Label>
                <Input
                  type="text"
                  id="NATURALIDADE"
                  name="NATURALIDADE"
                  value={NATURALIDADE}
                  onChange={(e) => setNaturalidade(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="SEXO">Sexo:</Label>
                <Input
                  type="select"
                  name="SEXO"
                  id="SEXO"
                  value={SEXO}
                  onChange={(e) => setSexo(e.target.value)}
                  className="custom-select"
                >
                  <option value=" ">Selecione</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Outro">Outro</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="DT_NASCIMENTO">Data de Nascimento:</Label>
                <Input
                  type="date"
                  id="DT_NASCIMENTO"
                  name="DT_NASCIMENTO"
                  value={DT_NASCIMENTO}
                  onChange={(e) => setDtNascimento(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="ESTADO_CIVIL">Estado Civil:</Label>
                <Input
                  type="select"
                  name="ESTADO_CIVIL"
                  id="ESTADO_CIVIL"
                  value={ESTADO_CIVIL}
                  onChange={(e) => setEstadoCivil(e.target.value)}
                  className="custom-select"
                >
                  <option value=" ">Selecione</option>
                  <option value="Solteiro">Solteiro(a)</option>
                  <option value="Casado">Casado(a)</option>
                  <option value="Divorciado">Divorciado(a)</option>
                  <option value="Viúvo">Viúvo(a)</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="EMAIL">E-mail:</Label>
                <Input
                  type="email"
                  id="EMAIL"
                  name="EMAIL"
                  value={EMAIL}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="CD_EQUIPA_LOCOMOCAO">
                  Equipamento de Locomoção:
                </Label>
                <Input
                  type="select"
                  name="CD_EQUIPA_LOCOMOCAO"
                  id="CD_EQUIPA_LOCOMOCAO"
                  value={CD_EQUIPA_LOCOMOCAO}
                  onChange={(e) => setEquipaLocomocao(e.target.value)}
                  className="custom-select"
                >
                  <option value=" ">Selecione</option>
                  <option value="Carro">Carro</option>
                  <option value="Ônibus">Ônibus</option>
                  <option value="Trasnporte Eficiente">
                    Trasnporte Eficiente
                  </option>
                  <option value="Outros">Outros</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="CD_DEFICIENCIA">Deficiência:</Label>
                <select
                  id="deficiencia"
                  value={selectedDeficiencias}
                  onChange={(e) => setSelectedDeficiencias(e.target.value)}
                  className="form-control custom-select"
                >
                  <option value="">Selecione a Deficiência</option>
                  {deficiencia.map((deficiencia) => (
                    <option
                      key={deficiencia.CD_DEFICIENCIA}
                      value={deficiencia.CD_DEFICIENCIA}
                    >
                      {deficiencia.TP_DEFICIENCIA}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="MEIO_LOCOMOCAO">Meio de locomoção:</Label>
                <select
                  id="meio"
                  value={selectedMeios}
                  onChange={(e) => setSelectedMeios(e.target.value)}
                  className="form-control custom-select"
                >
                  <option value="">Selecione o Meio</option>
                  {meio.map((meio) => (
                    <option
                      key={meio.CD_MEIO_LOCOMOCAO}
                      value={meio.CD_MEIO_LOCOMOCAO}
                    >
                      {meio.NM_MEIO_LOCOMOCAO}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="CD_FUNCAO">Função:</Label>
                <select
                  id="funcao"
                  value={selectedFuncaos}
                  onChange={(e) => setSelectedFuncaos(e.target.value)}
                  className="form-control custom-select"
                >
                  <option value="">Selecione a função</option>
                  {funcao.map((funcao) => (
                    <option key={funcao.CD_FUNCAO} value={funcao.CD_FUNCAO}>
                      {funcao.NM_FUNCAO}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="ASSISTENCIA">Assistência:</Label>
                <Input
                  type="text"
                  id="ASSISTENCIA"
                  name="ASSISTENCIA"
                  value={ASSISTENCIA}
                  onChange={(e) => setAssistencia(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <h2>Dados Responsáveis</h2>
          <Row form>
            <Col md={5}>
              <FormGroup>
                <Label for="NM_PAI">Nome do Pai:</Label>
                <Input
                  type="text"
                  id="NM_PAI"
                  name="NM_PAI"
                  value={NM_PAI}
                  onChange={(e) => setNmPai(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={5}>
              <FormGroup>
                <Label for="CELULAR_PAI">Telefone Celular Pai:</Label>
                <Input
                  type="tel"
                  id="CELULAR_PAI"
                  name="CELULAR_PAI"
                  placeholder="(00) 00000-0000"
                  maxlength="15"
                  pattern="\(\d{2}\) \d{5}-\d{4}"
                  value={CELULAR_PAI}
                  onChange={(e) => setCelularPai(e.target.value)}
                />
              </FormGroup>
            </Col>
            .
            <Col md={5}>
              <FormGroup>
                <Label for="NM_MAE">Nome da Mãe:</Label>
                <Input
                  type="text"
                  id="NM_MAE"
                  name="NM_MAE"
                  value={NM_MAE}
                  onChange={(e) => setNmMae(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={5}>
              <FormGroup>
                <Label for="CELULAR_MAE">Telefone Celular Mãe:</Label>
                <Input
                  type="tel"
                  id="CELULAR_MAE"
                  name="CELULAR_MAE"
                  placeholder="(00) 00000-0000"
                  maxlength="15"
                  pattern="\(\d{2}\) \d{5}-\d{4}"
                  value={CELULAR_MAE}
                  onChange={(e) => setCelularMae(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={5}>
              <FormGroup>
                <Label for="EMAIL_RESPONS">E-mail do Responsável:</Label>
                <Input
                  type="email"
                  id="EMAIL_RESPONS"
                  name="EMAIL_RESPONS"
                  value={EMAIL_RESPONS}
                  onChange={(e) => setEmailRespons(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={5}>
              <FormGroup>
                <Label for="NATURALIDADE_RESPONS">
                  Naturalidade do Responsável:
                </Label>
                <Input
                  type="text"
                  id="NATURALIDADE_RESPONS"
                  name="NATURALIDADE_RESPONS"
                  value={NATURALIDADE_RESPONS}
                  onChange={(e) => setNaturalidadeRespons(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <h2>Informações Físicas</h2>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="PESO">Peso (kg):</Label>
                <Input
                  type="number"
                  id="PESO"
                  name="PESO"
                  step="0.1"
                  value={PESO}
                  onChange={(e) => setPeso(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="ALTURA">Altura (cm):</Label>
                <Input
                  type="number"
                  id="ALTURA"
                  name="ALTURA"
                  value={ALTURA}
                  onChange={(e) => setAltura(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="GP_SANGUE">Grupo Sanguíneo:</Label>
                <Input
                  type="select"
                  name="GP_SANGUE"
                  id="GP_SANGUE"
                  value={GP_SANGUE}
                  onChange={(e) => setGpSangue(e.target.value)}
                  className="custom-select"
                >
                  <option value=" ">Selecione</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="RENDA">Renda Familiar:</Label>
                <Input
                  type="select"
                  name="RENDA"
                  id="RENDA"
                  value={RENDA}
                  onChange={(e) => setRenda(e.target.value)}
                  className="custom-select"
                >
                  <option value=" ">Selecione</option>
                  <option value="1 Salário mínimo">1 Salário mínimo</option>
                  <option value="1 a 3 Salários mínimos">
                    1 a 3 Salários mínimos
                  </option>
                  <option value="4 a 8 Salários mínimos">
                    4 a 8 Salários mínimos
                  </option>
                  <option value="9 a 12 Salários mínimos">
                    9 a 12 Salários mínimos
                  </option>
                  <option value="Maior que 12 Salários mínimos">
                    Maior que 12 Salários mínimos
                  </option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="ESCOLARIDADE">Escolaridade:</Label>
                <Input
                  type="text"
                  id="ESCOLARIDADE"
                  name="ESCOLARIDADE"
                  value={ESCOLARIDADE}
                  onChange={(e) => setEscolaridade(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="INSTITUICAO">Instituição de Ensino:</Label>
                <Input
                  type="text"
                  id="INSTITUICAO"
                  name="INSTITUICAO"
                  value={INSTITUICAO}
                  onChange={(e) => setInstituicao(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="TELEFONE_ESCOLA">Telefone da Escola:</Label>
                <Input
                  type="text"
                  id="TELEFONE_ESCOLA"
                  name="TELEFONE_ESCOLA"
                  value={TELEFONE_ESCOLA}
                  onChange={(e) => setTelefoneEscola(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <h2>Documentos</h2>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="CPF">CPF:</Label>
                <Input
                  type="text"
                  id="CPF"
                  name="CPF"
                  value={CPF}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="RG">RG:</Label>
                <Input
                  type="text"
                  id="RG"
                  name="RG"
                  value={RG}
                  onChange={(e) => setRg(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="UF_RG">UF do RG:</Label>
                <Input
                  type="text"
                  id="UF_RG"
                  name="UF_RG"
                  value={UF_RG}
                  onChange={(e) => setUfRg(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="DT_EMISSAO_RG">Data de Emissão do RG:</Label>
                <Input
                  type="date"
                  id="DT_EMISSAO_RG"
                  name="DT_EMISSAO_RG"
                  value={DT_EMISSAO_RG}
                  onChange={(e) => setDtEmissaoRg(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="NR_PASSAPORTE">Número do Passaporte:</Label>
                <Input
                  type="text"
                  id="NR_PASSAPORTE"
                  name="NR_PASSAPORTE"
                  value={NR_PASSAPORTE}
                  onChange={(e) => setNrPassaporte(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <h2>Dados Responsável Legal</h2>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="CPF_RESPONS">CPF do Responsável:</Label>
                <Input
                  type="text"
                  id="CPF_RESPONS"
                  name="CPF_RESPONS"
                  value={CPF_RESPONS}
                  onChange={(e) => setCpfRespons(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="RG_RESPONS">RG do Responsável:</Label>
                <Input
                  type="text"
                  id="RG_RESPONS"
                  name="RG_RESPONS"
                  value={RG_RESPONS}
                  onChange={(e) => setRgRespons(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="UF_RG_RESPONS">UF do RG do Responsável:</Label>
                <Input
                  type="text"
                  id="UF_RG_RESPONS"
                  name="UF_RG_RESPONS"
                  value={UF_RG_RESPONS}
                  onChange={(e) => setUfRgRespons(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="DT_EMISSAO_RG_RESPONS">
                  Data de Emissão do RG do Responsável:
                </Label>
                <Input
                  type="date"
                  id="DT_EMISSAO_RG_RESPONS"
                  name="DT_EMISSAO_RG_RESPONS"
                  value={DT_EMISSAO_RG_RESPONS}
                  onChange={(e) => setDtEmissaoRgRespons(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="NR_PASSAPORTE_RESPONS">
                  Número do Passaporte do Responsável:
                </Label>
                <Input
                  type="text"
                  id="NR_PASSAPORTE_RESPONS"
                  name="NR_PASSAPORTE_RESPONS"
                  value={NR_PASSAPORTE_RESPONS}
                  onChange={(e) => setNrPassaporteRespons(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <h2>Endereço</h2>
          <Row form>
            <Col md={7}>
              <FormGroup>
                <Label for="ENDERECO">Endereço:</Label>
                <Input
                  type="text"
                  id="ENDERECO"
                  name="ENDERECO"
                  value={ENDERECO}
                  onChange={(e) => setEndereco(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={5}>
              <FormGroup>
                <Label for="NR_ENDERECO">Número:</Label>
                <Input
                  type="text"
                  id="NR_ENDERECO"
                  name="NR_ENDERECO"
                  value={NR_ENDERECO}
                  onChange={(e) => setNrEndereco(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={5}>
              <FormGroup>
                <Label for="DS_ENDERECO">Complemento:</Label>
                <Input
                  type="text"
                  id="DS_ENDERECO"
                  name="DS_ENDERECO"
                  value={DS_ENDERECO}
                  onChange={(e) => setDsEndereco(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="CEP">CEP:</Label>
                <Input
                  type="text"
                  id="CEP"
                  name="CEP"
                  value={CEP}
                  onChange={(e) => setCep(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <h2>Informações Esportivas</h2>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="CD_MODALIDADE">Modalidade:</Label>
                <select
                  id="modalidade"
                  value={selectedModalidades}
                  onChange={(e) => setSelectedModalidades(e.target.value)}
                  className="form-control custom-select"
                >
                  <option value="">Selecione o modalidade</option>
                  {modalidade.map((modalidade) => (
                    <option
                      key={modalidade.CD_MODALIDADE}
                      value={modalidade.CD_MODALIDADE}
                    >
                      {modalidade.NM_MODALIDADE}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="CLASSIF_FUNC">Classificação Funcional:</Label>
                <Input
                  type="text"
                  id="CLASSIF_FUNC"
                  name="CLASSIF_FUNC"
                  value={CLASSIF_FUNC}
                  onChange={(e) => setClassifFunc(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="PROVA">Prova:</Label>
                <Input
                  type="text"
                  id="PROVA"
                  name="PROVA"
                  value={PROVA}
                  onChange={(e) => setProva(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <h2>Uniformes</h2>
          <Row form>
            <Col md={3}>
              <FormGroup>
                <Label for="TAMANHO_CAMISA">Tamanho da Camisa:</Label>
                <Input
                  type="select"
                  name="TAMANHO_CAMISA"
                  id="TAMANHO_CAMISA"
                  value={TAMANHO_CAMISA}
                  onChange={(e) => setTamanhoCamisa(e.target.value)}
                  className="custom-select"
                >
                  <option value=" ">Selecione</option>
                  <option value="PP">PP</option>
                  <option value="P">p</option>
                  <option value="M">P</option>
                  <option value="G">G</option>
                  <option value="GG">GG</option>
                  <option value="XG">XG</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="TAMANHO_AGASALHO">Tamanho da Agasalho:</Label>
                <Input
                  type="select"
                  name="TAMANHO_AGASALHO"
                  id="TAMANHO_AGASALHO"
                  value={TAMANHO_AGASALHO}
                  onChange={(e) => setTamanhoAgasalho(e.target.value)}
                  className="custom-select"
                >
                  <option value=" ">Selecione</option>
                  <option value="PP">PP</option>
                  <option value="P">p</option>
                  <option value="M">P</option>
                  <option value="G">G</option>
                  <option value="GG">GG</option>
                  <option value="XG">XG</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="TAMANHO_BERM_CAL">Tamanho da Bermuda/Calça:</Label>
                <Input
                  type="select"
                  name="TAMANHO_BERM_CAL"
                  id="TAMANHO_BERM_CAL"
                  value={TAMANHO_BERM_CAL}
                  onChange={(e) => setTamanhoBermCal(e.target.value)}
                  className="custom-select"
                >
                  <option value=" ">Selecione</option>
                  <option value="PP">PP</option>
                  <option value="P">p</option>
                  <option value="M">P</option>
                  <option value="G">G</option>
                  <option value="GG">GG</option>
                  <option value="XG">XG</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="NR_CALCADO">Número do Calçado:</Label>
                <Input
                  type="select"
                  name="NR_CALCADO"
                  id="NR_CALCADO"
                  value={NR_CALCADO}
                  onChange={(e) => setNrCalcado(e.target.value)}
                  className="custom-select"
                >
                  <option value=" ">Selecione</option>
                  <option value="34">34</option>
                  <option value="35">35</option>
                  <option value="36">36</option>
                  <option value="37">37</option>
                  <option value="38">38</option>
                  <option value="39">39</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <h2>Documento Digitalizados</h2>
          <h3>RECOMENDAÇÕES DA FOTO 3X4</h3>
          <h4>
            • A foto deve ser enquadrada a partir do meio do tronco até a
            cabeça;<br></br>• A cabeça deverá manter se RETA, e o atleta deverá
            olhar DIRETAMENTE para a lente da câmera;<br></br>• O fundo da
            imagem deve ser clara ou branca, dando importância à foco e nitidez;
            <br></br>• A foto deverá evitar ter reflexos e sombras;<br></br>•
            Não é permitido a utilização de qualquer tipo de adereço que
            impossibilite a identificação do rosto como óculos de sol, chapéus,
            máscaras e outros;<br></br>• É opcional o atleta manter os lábios
            serrados (expressão séria) ou lábios entre abertos (sorrindo);
            <br></br>• Atletas do sexo FEMININO devem estar trajadas com
            camiseta de manga ou meia manga (é <b>PROIBIDO</b> posar/enviar
            fotos com camiseta de cor branca); <br></br>• Atletas do sexo
            MASCULINO devem estar devidamente trajados com camiseta com mangas
            (é <b>PROIBIDO</b> posar/enviar fotos com camiseta de cor branca);
            <br></br>• É <b>INADMISSÍVEL</b> o envio de fotos de atletas{" "}
            <b>SEM CAMISA.</b>
          </h4>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label className="UploadIMG" for="FOTO_ATLETA">
                  Clique aqui para anexar FOTO 3x4 ATUAL
                </Label>
                <Input
                  type="file"
                  id="FOTO_ATLETA"
                  name="FOTO_ATLETA"
                  value={FOTO_ATLETA}
                  onChange={(e) => setFotoAtleta(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className="UploadIMG" for="FOTO_RG">
                  Clique aqui para anexar RG DO(A) ATLETA
                </Label>
                <Input
                  type="file"
                  id="FOTO_RG"
                  name="FOTO_RG"
                  value={FOTO_RG}
                  onChange={(e) => setFotoRg(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className="UploadIMG" for="FOTO_RG_RESPONS">
                  Clique aqui para anexar RG DO(A) RESPONSÁVEL
                </Label>
                <Input
                  type="file"
                  id="FOTO_RG_RESPONS"
                  name="FOTO_RG_RESPONS"
                  value={FOTO_RG_RESPONS}
                  onChange={(e) => setFotoRgRespons(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Button color="default" className="btn-cad-ass">
            Cadastrar Associado
          </Button>
        </Form>
        <br></br>
      </main>
    </Container>
  );
};

export default CadastroNovoAtleta;
