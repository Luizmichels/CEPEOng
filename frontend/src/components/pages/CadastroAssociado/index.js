import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
// import { useDropzone } from "react-dropzone";
import DropzoneComponent from "react-dropzone-component";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CadastroAssociado.scss";
import api from "../../../utlis/api";
import "dropzone/dist/min/dropzone.min.css";

import { NotificacaoManager } from "../../notificacao";
import { getToken, getNivel } from "../../../utlis";
import Select from "react-select";
// eslint-disable-next-line @typescript-eslint/no-var-requires
import ReactDOMServer from "react-dom/server";

const componentConfig = {
  iconFiletypes: [".jpg", ".png", ".gif"],
  showFiletypeIcon: false,
  postUrl: "http://localhost:5000/associado/imagens",
};

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#ED5600',
    color: 'white',
    borderColor: 'white',
    boxShadow: state.isFocused ? '0 0 0 1px white' : 'none',
    '&:hover': {
      borderColor: 'white'
    },
    ':focus': {
      borderColor: 'white'
    },
    paddingLeft: '0.2vh',
    paddingRight: '0.2vh',
    paddingTop: '0.1vh',
    paddingBottom: '0.1vh',
    minHeight: '1vh',  // Ajuste a altura mínima conforme necessário
    width: '100%'
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#ED5600',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#ED5600' : '#ED5600',
    color: 'white',
    '&:hover': {
      backgroundColor: '#ED5600',
      color: 'white'
    }
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'white'
  }),
  input: (provided) => ({
    ...provided,
    color: 'white'
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'white'
  }),
  indicatorSeparator: () => ({
    display: 'none'
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: 'black',
    '&:hover': {
      color: 'black'
    }
  })
};

const djsConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
  previewTemplate: ReactDOMServer.renderToStaticMarkup(
    <div className="dz-preview dz-file-preview mb-3">
      <div className="d-flex flex-row ">
        <div className="p-0 w-30 position-relative">
          <div className="dz-error-mark">
            <span>
              <i />{" "}
            </span>
          </div>
          <div className="dz-success-mark">
            <span>
              <i />
            </span>
          </div>
          <div className="preview-container">
            <img data-dz-thumbnail className="img-thumbnail border-0" />
            <i className="simple-icon-doc preview-icon" />
          </div>
        </div>
        <div className="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative">
          <div>
            {" "}
            <span data-dz-name />{" "}
          </div>
          <div className="text-primary text-extra-small" data-dz-size />
          <div className="dz-progress">
            <span className="dz-upload" data-dz-uploadprogress />
          </div>
          <div className="dz-error-message">
            <span data-dz-errormessage />
          </div>
        </div>
      </div>
      <a href="#/" className="remove" data-dz-remove>
        {" "}
        x
      </a>
    </div>
  ),
  maxFiles: 1,
  withCredentials: true,
  uploadMultiple: false,
  dictResponseError: "Teste",
  dictCancelUploadConfirmation:
    "Tem certeza de que deseja cancelar este upload?",
  dictDefaultMessage: "Solte os arquivos aqui para enviar",
  dictInvalidFileType: "Tipo de arquivo invalido",
  dictFileTooBig: "Arquivo muito grande",
  dictMaxFilesExceeded: "Numero maximo de arquivos excedido",
  dictUploadCanceled: "Upload cancelado",
  error(file, response, xhr) {
    let message;
    if (typeof response === "string") {
      message = response; // dropzone sends it's own error messages in string
    } else if (xhr.status === 401) {
      message = "Sessão expirada";
    }

    file.previewElement.classList.add("dz-error");
    const ref = file.previewElement.querySelectorAll("[data-dz-errormessage]");

    for (let i = 0, len = ref.length; i < len; i += 1) {
      const node = ref[i];
      node.textContent = message;
    }
  },
};

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
  const [FOTO_ATLETA] = useState(`img_atleta_${Date.now()}`);
  const [FOTO_RG] = useState(`img_rg_${Date.now()}`);
  const [FOTO_RG_RESPONS] = useState(`img_resp_${Date.now()}`);
  const [CD_EQUIPA_LOCOMOCAO, setEquipaLocomocao] = useState("");
  const [meio, setMeios] = useState([]);
  const [selectedMeios, setSelectedMeios] = useState("");
  const [deficiencia, setDeficiencias] = useState([]);
  const [selectedDeficiencias, setSelectedDeficiencias] = useState("");
  const [modalidade, setModalidades] = useState([]);
  const [selectedModalidades, setSelectedModalidades] = useState("");
  const [funcao, setFuncaos] = useState([]);
  const [selectedFuncaos, setSelectedFuncaos] = useState("");

  console.log(CadastroNovoAtleta);

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/cadastros");
  };

  const handleCadastrar = async () => {
    const nivelAcesso = getNivel();    
        if (nivelAcesso === '3') {
            navigate('/cadastros');
        } else if (nivelAcesso === '2') {
            navigate('/menu-tecnico');
        } else if (nivelAcesso === '1') {
            navigate('/check-cadastro');
        }
    }

  const options = deficiencia.map((def) => ({
    value: def.CD_DEFICIENCIA,
    label: def.TP_DEFICIENCIA
  }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await api.post(
        "/associado/cadastro",
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
          CD_MEIO_LOCOMOCAO: selectedMeios,
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
    } catch (error) {
      console.error("Erro ao criar associado:", error);
      NotificacaoManager.error(
        "Erro ao cadastrar associado!",
        "",
        1000,
        "filled"
      );
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
        const deficienciasResponse = await api.get("deficiencia/listar", config);
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

  function formatPhoneNumber(value) {
    var phone = value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    var formattedPhone = "";

    if (phone.length > 0) {
      formattedPhone += `(${phone.substring(0, 2)}) `; // Código de área
    }
    if (phone.length <= 10) {
      // Telefone fixo
      formattedPhone += phone.substring(2, 6); // Primeiros 4 dígitos
      if (phone.length > 6) {
        formattedPhone += "-";
        formattedPhone += phone.substring(6, 10); // Últimos 4 dígitos
      }
    } else {
      // Telefone celular
      formattedPhone += phone.substring(2, 7); // Primeiros 5 dígitos
      formattedPhone += "-";
      formattedPhone += phone.substring(7, 11); // Últimos 4 dígitos
    }

    return formattedPhone; // Retorna o número formatado
  }

  
  const handleTelefoneCelular = (e) => {
    const inputValue = e.target.value;
    const formattedPhoneNumber = formatPhoneNumber(inputValue);
    setNrCelular(formattedPhoneNumber);
  };
  
  const handleTelefoneResidencial = (e) => {
    const inputValue = e.target.value;
    const formattedPhoneNumber = formatPhoneNumber(inputValue);
    setNrTelefone(formattedPhoneNumber);
  };
  
  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
    const formattedPhoneNumber = formatPhoneNumber(inputValue);
    setCelularPai(formattedPhoneNumber);
  };

  const handleTelefoneCelularMae = (e) => {
    const inputValue = e.target.value;
    const formattedPhoneNumber = formatPhoneNumber(inputValue);
    setCelularMae(formattedPhoneNumber);
  };

  const handleTelefoneEscola = (e) => {
    const inputValue = e.target.value;
    const formattedPhoneNumber = formatPhoneNumber(inputValue);
    setTelefoneEscola(formattedPhoneNumber);
  };

  return (
    <Container>
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
            <h1 className="txt-titulo">Cadastro Novo Associado</h1>
          </Col>
        </Row>
      </nav>
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
        <Row>
        <Col md={4}>
            <FormGroup>
              <Label for="NR_CELULAR">Telefone Celular:</Label>
              <Input
                type="tel"
                id="NR_CELULAR"
                name="NR_CELULAR"
                placeholder="(00) 00000-0000"
                maxLength="15"
                value={NR_CELULAR}
                onChange={handleTelefoneCelular}
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
                placeholder="(00) 0000-0000"
                maxLength="15"
                value={NR_TELEFONE}
                onChange={handleTelefoneResidencial}
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
        <Row>
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
        <Row>
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
              <Label for="CD_EQUIPA_LOCOMOCAO">Meio de Locomoção:</Label>
              <Input
                type="select"
                name="CD_EQUIPA_LOCOMOCAO"
                id="CD_EQUIPA_LOCOMOCAO"
                value={CD_EQUIPA_LOCOMOCAO}
                onChange={(e) => setEquipaLocomocao(e.target.value)}
                className="custom-select"
              >
                <option value=" ">Selecione o Meio de Locomoção</option>
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
              <Select
                options={options}
                placeholder="Selecione a defiência"
                isMulti
                styles={customStyles}
                onChange={(vl) => {
                  const newList = vl.map(({value})=> value)
                  setSelectedDeficiencias(newList)
                }}
                // className="custom-select"
                classNamePrefix="custom-select"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <FormGroup>
              <Label for="CD_MEIO_LOCOMOCAO">Equipamento de locomoção:</Label>
              <Input
                type="select"
                name="CD_MEIO_LOCOMOCAO"
                id="CD_MEIO_LOCOMOCAO"
                onChange={(e) => setSelectedMeios(e.target.value)}
                className="custom-select"
              >
                <option value=" ">Selecione o Equipamento</option>
                {meio.map((meio) => (
                  <option
                    key={meio.CD_MEIO_LOCOMOCAO}
                    value={meio.CD_MEIO_LOCOMOCAO}
                  >
                    {meio.NM_MEIO_LOCOMOCAO}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="CD_FUNCAO">Função:</Label>
              <Input
                type="select"
                name="CD_FUNCAO"
                id="CD_FUNCAO"
                onChange={(e) => setSelectedFuncaos(e.target.value)}
                className="custom-select"
              >
                <option value=" ">Selecione a Função</option>
                {funcao.map((funcao) => (
                  <option key={funcao.CD_FUNCAO} value={funcao.CD_FUNCAO}>
                    {funcao.NM_FUNCAO}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="ASSISTENCIA">Assistência:</Label>
              <Input
                type="select"
                name="ASSISTENCIA"
                id="ASSISTENCIA"
                value={ASSISTENCIA}
                onChange={(e) => setAssistencia(e.target.value)}
                className="custom-select"
              >
                <option value=" ">Necessita Assistência</option>
                <option value="Sim">Sim</option>
                <option value="Não">Não</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <h2>Dados Responsáveis</h2>
        <Row>
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
                maxLength="15"
                value={CELULAR_PAI}
                onChange={handlePhoneChange}
              />
            </FormGroup>
          </Col>
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
                maxLength="15"
                value={CELULAR_MAE}
                onChange={handleTelefoneCelularMae}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
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
        <Row>
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
        <Row>
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
        <Row>
        <Col md={5}>
            <FormGroup>
              <Label for="TELEFONE_ESCOLA">Telefone da Escola:</Label>
              <Input
                type="tel"
                id="TELEFONE_ESCOLA"
                name="TELEFONE_ESCOLA"
                placeholder="(00) 0000-0000"
                maxLength="15"
                value={TELEFONE_ESCOLA}
                onChange={handleTelefoneEscola}
              />
            </FormGroup>
          </Col>
        </Row>
        <h2>Documentos</h2>
        <Row>
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
        <Row>
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
        <Row>
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
        <Row>
          <Col md={4}>
            <FormGroup>
              <Label for="CD_MODALIDADE">Modalidade:</Label>
              <Input
                type="select"
                name="CD_MODALIDADE"
                id="CD_MODALIDADE"
                onChange={(e) => setSelectedModalidades(e.target.value)}
                className="custom-select"
              >
                <option value=" ">Selecione a Modalidade</option>
                {modalidade.map((modalidade) => (
                  <option
                    key={modalidade.CD_MODALIDADE}
                    value={modalidade.CD_MODALIDADE}
                  >
                    {modalidade.NM_MODALIDADE}
                  </option>
                ))}
              </Input>
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
        <Row>
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
                <option value="P">P</option>
                <option value="M">M</option>
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
                <option value="P">P</option>
                <option value="M">M</option>
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
                <option value="P">P</option>
                <option value="M">M</option>
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
                <option value="30">30</option>
                <option value="31">31</option>
                <option value="32">32</option>
                <option value="33">33</option>
                <option value="34">34</option>
                <option value="35">35</option>
                <option value="36">36</option>
                <option value="37">37</option>
                <option value="38">38</option>
                <option value="39">39</option>
                <option value="40">40</option>
                <option value="41">41</option>
                <option value="42">42</option>
                <option value="43">43</option>
                <option value="44">44</option>
                <option value="45">45</option>
                <option value="46">46</option>
                <option value="47">47</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <h2>Documento Digitalizados</h2>
        <h3>RECOMENDAÇÕES DA FOTO 3X4</h3>
        <h4>
          • A foto deve ser enquadrada a partir do meio do tronco até a cabeça;
          <br></br>• A cabeça deverá manter se <b>RETA</b>, e o atleta deverá
          olhar
          <b> DIRETAMENTE</b> para a lente da câmera;<br></br>• O fundo da
          imagem deve ser clara ou branca, dando importância à foco e nitidez;
          <br></br>• A foto deverá evitar ter reflexos e sombras;<br></br>• Não
          é permitido a utilização de qualquer tipo de adereço que impossibilite
          a identificação do rosto como óculos de sol, chapéus, máscaras e
          outros;<br></br>• É opcional o atleta manter os lábios serrados
          (expressão séria) ou lábios entre abertos (sorrindo);
          <br></br>• Associado devem estar trajadas com camiseta de manga ou
          meia manga (é <b>PROIBIDO</b> posar/enviar fotos com camiseta de cor
          branca);<br></br>• É <b>INADMISSÍVEL</b> o envio de fotos de associado{" "}
          <b>SEM CAMISA.</b>
        </h4>
        <Row>
          <Col md={4}>
            <FormGroup>
              <DropzoneComponent
                // onDrop={(files) => onDrop(files, setFotoAtleta)}
                config={componentConfig}
                djsConfig={{
                  ...djsConfig,
                  params: {
                    tipo: "atleta",
                    nome: FOTO_ATLETA,
                  },
                  dictDefaultMessage: "Foto 3x4 Atual",
                }}
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <DropzoneComponent
                config={componentConfig}
                djsConfig={{
                  ...djsConfig,
                  params: {
                    tipo: "rg",
                    nome: FOTO_RG,
                  },
                  dictDefaultMessage: "Foto do RG do associado",
                }}
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <DropzoneComponent
                config={componentConfig}
                djsConfig={{
                  ...djsConfig,
                  params: {
                    tipo: "resp",
                    nome: FOTO_RG_RESPONS,
                  },
                  dictDefaultMessage: "Foto do RG do responsável",
                }}
              />
            </FormGroup>
          </Col>
        </Row>
        <Button
          color="default"
          className="btn-cad-ass"
          id="botaoCadastrar"
          type="submit"
          onClick={handleCadastrar}
        >
          Cadastrar-se
        </Button>
      </Form>
    </Container>
  );
};

export default CadastroNovoAtleta;
