import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
import DropzoneComponent from "react-dropzone-component";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CadastroAssociado.scss";
import api from "../../../utlis/api";
import "dropzone/dist/min/dropzone.min.css";

import { NotificacaoManager } from "../../notificacao";
import { getToken, getNivel } from "../../../utlis";
import Select from "react-select";
import ReactDOMServer from "react-dom/server";

const CadastroAssociado = ({ match }) => {
  const [associado, setAssociado] = useState({
    NM_PESSOA: '',
    NR_CELULAR: '',
    NR_TELEFONE: '',
    NATURALIDADE: '',
    SEXO: '',
    DT_NASCIMENTO: '',
    ESTADO_CIVIL: '',
    EMAIL: '',
    CD_EQUIPA_LOCOMOCAO: '',
    CD_DEFICIENCIA: '',
    CD_MEIO_LOCOMOCAO: '',
    CD_FUNCAO: '',
    ASSISTENCIA: '',
    NM_PAI: '',
    CELULAR_PAI: '',
    NM_MAE: '',
    CELULAR_MAE: '',
    EMAIL_RESPONS: '',
    NATURALIDADE_RESPONS: '',
    PESO: '',
    ALTURA: '',
    GP_SANGUE: '',
    RENDA: '',
    ESCOLARIDADE: '',
    INSTITUICAO: '',
    TELEFONE_ESCOLA: '',
    CPF: '',
    RG: '',
    UF_RG: '',
    DT_EMISSAO_RG: '',
    NR_PASSAPORTE: '',
    CPF_RESPONS: '',
    RG_RESPONS: '',
    UF_RG_RESPONS: '',
    DT_EMISSAO_RG_RESPONS: '',
    NR_PASSAPORTE_RESPONS: '',
    ENDERECO: '',
    NR_ENDERECO: '',
    DS_ENDERECO: '',
    CEP: '',
    CD_MODALIDADE: '',
    CLASSIF_FUNC: '',
    PROVA: '',
    TAMANHO_CAMISA: '',
    TAMANHO_AGASALHO: '',
    TAMANHO_BERM_CAL: '',
    NR_CALCADO: '',
    FOTO_ATLETA: '',
    FOTO_RG: '',
    FOTO_RG_RESPONS: '',
  });

  const [meio, setMeios] = useState([]);
  const [selectedMeios, setSelectedMeios] = useState("");
  const [deficiencia, setDeficiencias] = useState([]);
  const [selectedDeficiencias, setSelectedDeficiencias] = useState("");
  const [modalidade, setModalidades] = useState([]);
  const [selectedModalidades, setSelectedModalidades] = useState("");
  const [funcao, setFuncaos] = useState([]);
  const [selectedFuncaos, setSelectedFuncaos] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const associadoResponse = await api.get(`/cadastratos/grid/exportar/${match.params.CD_PESSOA_FISICA}`);
        setAssociado(associadoResponse.data);
        setSelectedModalidades(associadoResponse.data.CD_MODALIDADE);
        setSelectedDeficiencias(associadoResponse.data.CD_DEFICIENCIA);
        setSelectedFuncaos(associadoResponse.data.CD_FUNCAO);
        setSelectedMeios(associadoResponse.data.CD_MEIO_LOCOMOCAO);

        // Fetch meio
        const meiosResponse = await api.get("/meioLocomocao/listar");
        setMeios(meiosResponse.data.meioLocomocaos);

        // Fetch deficiencia
        const deficienciasResponse = await api.get("/deficiencia/listar");
        setDeficiencias(deficienciasResponse.data.deficiencias);

        // Fetch modalidade
        const modalidadesResponse = await api.get("/modalidade/listar");
        setModalidades(modalidadesResponse.data.modalidades);

        // Fetch função
        const funcaosResponse = await api.get("/funcao/listar");
        setFuncaos(funcaosResponse.data.funcoes);

      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };

    fetchData();
  }, [match.params.CD_PESSOA_FISICA]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssociado({
      ...associado,
      [name]: value,
    });

    if (name === 'CD_MODALIDADE') {
      setSelectedModalidades(value);
    }
    if (name === 'CD_DEFICIENCIA') {
      setSelectedDeficiencias(value);
    }
    if (name === 'CD_MEIO_LOCOMOCAO') {
      setSelectedMeios(value);
    }
    if (name === 'CD_FUNCAO') {
      setSelectedFuncaos(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/cadastratos/cadastro/editar${match.params.CD_PESSOA_FISICA}`, associado);
      alert('Dados atualizados com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar os dados do associado:', error);
      NotificacaoManager.error(error.response.data.message, '', 1500, 'filled');
    }
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

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="NM_PESSOA">Nome:</Label>
              <Input
                type="text"
                name="NM_PESSOA"
                value={associado.NM_PESSOA}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="NR_CELULAR">Celular:</Label>
              <Input
                type="text"
                name="NR_CELULAR"
                value={associado.NR_CELULAR}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="NR_TELEFONE">Telefone:</Label>
              <Input
                type="text"
                name="NR_TELEFONE"
                value={associado.NR_TELEFONE}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="NATURALIDADE">Naturalidade:</Label>
              <Input
                type="text"
                name="NATURALIDADE"
                value={associado.NATURALIDADE}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
        </Row>
        {/* Adicione todos os outros campos aqui da mesma forma */}
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="CD_MODALIDADE">Modalidade:</Label>
              <Input
                type="select"
                name="CD_MODALIDADE"
                id="CD_MODALIDADE"
                value={selectedModalidades}
                onChange={handleChange}
                className="custom-select"
              >
                <option value="">Selecione a Modalidade</option>
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
          <Col md={6}>
            <FormGroup>
              <Label for="CD_DEFICIENCIA">Deficiência:</Label>
              <Input
                type="select"
                name="CD_DEFICIENCIA"
                id="CD_DEFICIENCIA"
                value={selectedDeficiencias}
                onChange={handleChange}
                className="custom-select"
              >
                <option value="">Selecione a Deficiência</option>
                {deficiencia.map((deficiencia) => (
                  <option
                    key={deficiencia.CD_DEFICIENCIA}
                    value={deficiencia.CD_DEFICIENCIA}
                  >
                    {deficiencia.NM_DEFICIENCIA}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="CD_MEIO_LOCOMOCAO">Meio de Locomoção:</Label>
              <Input
                type="select"
                name="CD_MEIO_LOCOMOCAO"
                id="CD_MEIO_LOCOMOCAO"
                value={selectedMeios}
                onChange={handleChange}
                className="custom-select"
              >
                <option value="">Selecione o Meio de Locomoção</option>
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
          <Col md={6}>
            <FormGroup>
              <Label for="CD_FUNCAO">Função:</Label>
              <Input
                type="select"
                name="CD_FUNCAO"
                id="CD_FUNCAO"
                value={selectedFuncaos}
                onChange={handleChange}
                className="custom-select"
              >
                <option value="">Selecione a Função</option>
                {funcao.map((funcao) => (
                  <option
                    key={funcao.CD_FUNCAO}
                    value={funcao.CD_FUNCAO}
                  >
                    {funcao.NM_FUNCAO}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Button type="submit">Salvar</Button>
        <Button type="button" onClick={handleCadastrar}>Cadastrar</Button>
      </Form>
    </Container>
  );
};

export default CadastroAssociado;
