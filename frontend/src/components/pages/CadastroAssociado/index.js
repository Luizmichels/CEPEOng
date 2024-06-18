import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./CadastroAssociado.scss"
 
const CadastroNovoAtleta = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        NM_PESSOA: '',
        NR_CELULAR: '',
        NATURALIDADE: '',
        SEXO: '',
        data_nasc: '',
        ESTADO_CIVIL: '',
        EMAIL: '',
        CD_EQUIPA_LOCOMOCAO: '',
        CD_DEFICIENCIA: '',
        MEIO_LOCOMOCAO: '',
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
        MATRICULA: '',
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
        FOTO_ATLETA: null,
        FOTO_RG: null,
        FOTO_RG_RESPONS: null,
    });
 
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData({
                ...formData,
                [name]: files[0]
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };
 
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
    };
 
    return (
        <Container>
            <header>
                <nav>
                    <Row>
                        <Col>
                            <img src="../img/cepe_joinville_laranja 2.png" alt="logo" />
                        </Col>
                        <Col className="titulo">
                            <h1>Cadastro Novo Atleta</h1>
                        </Col>
                    </Row>
                </nav>
            </header>
 
            <main>
                <Form onSubmit={handleSubmit}>
                    <h2>Dados Pessoais</h2>
                    <FormGroup>
                        <Label for="NM_PESSOA">Nome Completo:</Label>
                        <Input type="text" id="NM_PESSOA" name="NM_PESSOA" value={formData.NM_PESSOA} onChange={handleChange} />
                    </FormGroup>
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="NR_CELULAR">Telefone Celular:</Label>
                                <Input type="tel" id="NR_CELULAR" name="NR_CELULAR" placeholder="(00) 00000-0000" maxlength="15" pattern="\(\d{2}\) \d{5}-\d{4}" value={formData.NR_CELULAR} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="NATURALIDADE">Naturalidade:</Label>
                                <Input type="text" id="NATURALIDADE" name="NATURALIDADE" value={formData.NATURALIDADE} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="SEXO">Sexo:</Label>
                                <Input type="select" name="SEXO" id="SEXO" value={formData.SEXO} onChange={handleChange}>
                                    <option value=" "> </option>
                                    <option value="masculino">Masculino</option>
                                    <option value="feminino">Feminino</option>
                                    <option value="outro">Outro</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="data_nasc">Data de Nascimento:</Label>
                                <Input type="date" id="data_nasc" name="data_nasc" value={formData.data_nasc} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="ESTADO_CIVIL">Estado Civil:</Label>
                                <Input type="select" name="ESTADO_CIVIL" id="ESTADO_CIVIL" value={formData.ESTADO_CIVIL} onChange={handleChange}>
                                    <option value=" "> </option>
                                    <option value="solteiro">Solteiro(a)</option>
                                    <option value="casado">Casado(a)</option>
                                    <option value="divorciado">Divorciado(a)</option>
                                    <option value="viuvo">Viúvo(a)</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="EMAIL">E-mail:</Label>
                                <Input type="email" id="EMAIL" name="EMAIL" value={formData.EMAIL} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="CD_EQUIPA_LOCOMOCAO">Equipamento de Locomoção:</Label>
                                <Input type="text" id="CD_EQUIPA_LOCOMOCAO" name="CD_EQUIPA_LOCOMOCAO" value={formData.CD_EQUIPA_LOCOMOCAO} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="CD_DEFICIENCIA">Deficiência:</Label>
                                <Input type="text" id="CD_DEFICIENCIA" name="CD_DEFICIENCIA" value={formData.CD_DEFICIENCIA} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="MEIO_LOCOMOCAO">Meio de locomoção:</Label>
                                <Input type="text" id="MEIO_LOCOMOCAO" name="MEIO_LOCOMOCAO" value={formData.MEIO_LOCOMOCAO} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="CD_FUNCAO">Função:</Label>
                                <Input type="text" id="CD_FUNCAO" name="CD_FUNCAO" value={formData.CD_FUNCAO} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="ASSISTENCIA">Assistência:</Label>
                                <Input type="text" id="ASSISTENCIA" name="ASSISTENCIA" value={formData.ASSISTENCIA} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="NM_PAI">Nome do Pai:</Label>
                                <Input type="text" id="NM_PAI" name="NM_PAI" value={formData.NM_PAI} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="CELULAR_PAI">Telefone Celular:</Label>
                                <Input type="number" id="CELULAR_PAI" name="CELULAR_PAI" placeholder="(00) 00000-0000" maxlength="15" pattern="\(\d{2}\) \d{5}-\d{4}" value={formData.CELULAR_PAI} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="NM_MAE">Nome da Mãe:</Label>
                                <Input type="text" id="NM_MAE" name="NM_MAE" value={formData.NM_MAE} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Input type="text" id="CELULAR_MAE" name="CELULAR_MAE" placeholder="(00) 00000-0000" maxLength="15" pattern="\(\d{2}\) \d{5}-\d{4}" value={formData.CELULAR_MAE} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="EMAIL_RESPONS">E-mail do Responsável:</Label>
                                <Input type="email" id="EMAIL_RESPONS" name="EMAIL_RESPONS" value={formData.EMAIL_RESPONS} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="NATURALIDADE_RESPONS">Naturalidade do Responsável:</Label>
                                <Input type="text" id="NATURALIDADE_RESPONS" name="NATURALIDADE_RESPONS" value={formData.NATURALIDADE_RESPONS} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <h2>Informações Físicas</h2>
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="PESO">Peso (kg):</Label>
                                <Input type="number" id="PESO" name="PESO" step="0.1" value={formData.PESO} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="ALTURA">Altura (cm):</Label>
                                <Input type="number" id="ALTURA" name="ALTURA" value={formData.ALTURA} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="GP_SANGUE">Grupo Sanguíneo:</Label>
                                <Input type="text" id="GP_SANGUE" name="GP_SANGUE" value={formData.GP_SANGUE} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="RENDA">Renda Familiar:</Label>
                                <Input type="text" id="RENDA" name="RENDA" value={formData.RENDA} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="ESCOLARIDADE">Escolaridade:</Label>
                                <Input type="text" id="ESCOLARIDADE" name="ESCOLARIDADE" value={formData.ESCOLARIDADE} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="INSTITUICAO">Instituição de Ensino:</Label>
                                <Input type="text" id="INSTITUICAO" name="INSTITUICAO" value={formData.INSTITUICAO} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="MATRICULA">Matrícula:</Label>
                                <Input type="text" id="MATRICULA" name="MATRICULA" value={formData.MATRICULA} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="TELEFONE_ESCOLA">Telefone da Escola:</Label>
                                <Input type="text" id="TELEFONE_ESCOLA" name="TELEFONE_ESCOLA" value={formData.TELEFONE_ESCOLA} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <h2>Documentos</h2>
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="CPF">CPF:</Label>
                                <Input type="text" id="CPF" name="CPF" value={formData.CPF} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="RG">RG:</Label>
                                <Input type="text" id="RG" name="RG" value={formData.RG} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="UF_RG">UF do RG:</Label>
                                <Input type="text" id="UF_RG" name="UF_RG" value={formData.UF_RG} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="DT_EMISSAO_RG">Data de Emissão do RG:</Label>
                                <Input type="date" id="DT_EMISSAO_RG" name="DT_EMISSAO_RG" value={formData.DT_EMISSAO_RG} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="NR_PASSAPORTE">Número do Passaporte:</Label>
                                <Input type="text" id="NR_PASSAPORTE" name="NR_PASSAPORTE" value={formData.NR_PASSAPORTE} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <h2>Dados Responsável Legal</h2>
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="CPF_RESPONS">CPF do Responsável:</Label>
                                <Input type="text" id="CPF_RESPONS" name="CPF_RESPONS" value={formData.CPF_RESPONS} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="RG_RESPONS">RG do Responsável:</Label>
                                <Input type="text" id="RG_RESPONS" name="RG_RESPONS" value={formData.RG_RESPONS} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="UF_RG_RESPONS">UF do RG do Responsável:</Label>
                                <Input type="text" id="UF_RG_RESPONS" name="UF_RG_RESPONS" value={formData.UF_RG_RESPONS} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="DT_EMISSAO_RG_RESPONS">Data de Emissão do RG do Responsável:</Label>
                                <Input type="date" id="DT_EMISSAO_RG_RESPONS" name="DT_EMISSAO_RG_RESPONS" value={formData.DT_EMISSAO_RG_RESPONS} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="NR_PASSAPORTE_RESPONS">Número do Passaporte do Responsável:</Label>
                                <Input type="text" id="NR_PASSAPORTE_RESPONS" name="NR_PASSAPORTE_RESPONS" value={formData.NR_PASSAPORTE_RESPONS} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <h2>Endereço</h2>
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="ENDERECO">Endereço:</Label>
                                <Input type="text" id="ENDERECO" name="ENDERECO" value={formData.ENDERECO} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label for="NR_ENDERECO">Número:</Label>
                                <Input type="text" id="NR_ENDERECO" name="NR_ENDERECO" value={formData.NR_ENDERECO} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="DS_ENDERECO">Complemento:</Label>
                                <Input type="text" id="DS_ENDERECO" name="DS_ENDERECO" value={formData.DS_ENDERECO} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="CEP">CEP:</Label>
                                <Input type="text" id="CEP" name="CEP" value={formData.CEP} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <h2>Informações Esportivas</h2>
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="CD_MODALIDADE">Modalidade:</Label>
                                <Input type="text" id="CD_MODALIDADE" name="CD_MODALIDADE" value={formData.CD_MODALIDADE} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="CLASSIF_FUNC">Classificação Funcional:</Label>
                                <Input type="text" id="CLASSIF_FUNC" name="CLASSIF_FUNC" value={formData.                                CLASSIF_FUNC} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="PROVA">Prova:</Label>
                                <Input type="text" id="PROVA" name="PROVA" value={formData.PROVA} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <h2>Medidas</h2>
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="TAMANHO_CAMISA">Tamanho da Camisa:</Label>
                                <Input type="text" id="TAMANHO_CAMISA" name="TAMANHO_CAMISA" value={formData.TAMANHO_CAMISA} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="TAMANHO_AGASALHO">Tamanho do Agasalho:</Label>
                                <Input type="text" id="TAMANHO_AGASALHO" name="TAMANHO_AGASALHO" value={formData.TAMANHO_AGASALHO} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="TAMANHO_BERM_CAL">Tamanho da Bermuda/Calça:</Label>
                                <Input type="text" id="TAMANHO_BERM_CAL" name="TAMANHO_BERM_CAL" value={formData.TAMANHO_BERM_CAL} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="NR_CALCADO">Número do Calçado:</Label>
                                <Input type="number" id="NR_CALCADO" name="NR_CALCADO" value={formData.NR_CALCADO} onChange={handleChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <h2>Fotos</h2>
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="FOTO_ATLETA">Foto do Atleta:</Label>
                                <Input type="file" id="FOTO_ATLETA" name="FOTO_ATLETA" onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="FOTO_RG">Foto do RG:</Label>
                                <Input type="file" id="FOTO_RG" name="FOTO_RG" onChange={handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="FOTO_RG_RESPONS">Foto do RG do Responsável:</Label>
                                <Input type="file" id="FOTO_RG_RESPONS" name="FOTO_RG_RESPONS" onChange={handleChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button type="submit">Enviar</Button>
                </Form>
            </main>
        </Container>
    );
};
 
export default CadastroNovoAtleta;