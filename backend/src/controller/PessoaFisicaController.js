const PessoaFisica = require("../models/pessoa_fisica").default;
const ExcelJS = require("exceljs");
const fs = require("fs");
const { mkdir } = require("fs/promises");
const Deficiencia = require("../models/deficiencia").default;
const DeficienciaPessoa = require("../models/DeficienciaPessoa").default;
const AtletaModalidade = require("../models/AtletaModalidade").default;

const db = require("../db/conn").default;
const { existsSync, copyFileSync, realpathSync } = fs;

// helpers
const {
  formatarData,
  formatarTelefone,
  formatarCPF,
  formatarRG,
  formatarCEP,
} = require("../helpers/FormatarDadosPessoa");
const {
  EmailValido,
  cpfValido,
  diferencaAnos,
} = require("../helpers/Validacoes");
const ObterToken = require("../helpers/ObterToken");
const ObterUsuarioToken = require("../helpers/ObterUsuarioToken");
const { Console } = require("console");

module.exports = class PessoaFisicaController {
  static async CadastImagens(req, res) {
    const file = req.file;
    const { tipo, nome } = req.body;

    if (!existsSync(`../uploads/${tipo}`)) {
      await mkdir(`../uploads/${tipo}`, {
        recursive: true,
      });
    }

    copyFileSync(file.path, `../uploads/${tipo}/${nome}.jpg`);

    res.send("jose");
  }

  // Criando o Cadastro da pessoa fisica no banco
  static async CadastPessoaFisica(req, res) {
    try {
      const token = ObterToken(req);
      const user = await ObterUsuarioToken(token);

      const usuario = await PessoaFisica.findOne({
        where: { CD_USUARIO: user.CD_USUARIO },
      });

      //   if (usuario) return res.status(422).json({ message: "Você já está cadastrado" });

      const {
        NM_PESSOA,
        NR_CELULAR,
        NR_TELEFONE,
        SEXO,
        DT_NASCIMENTO,
        ESTADO_CIVIL,
        NATURALIDADE,
        EMAIL,
        CD_EQUIPA_LOCOMOCAO,
        CD_DEFICIENCIA,
        CD_MEIO_LOCOMOCAO,
        CD_FUNCAO,
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
        MATRICULA,
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
        CEP,
        ENDERECO,
        NR_ENDERECO,
        DS_ENDERECO,
        CD_MODALIDADE,
        CLASSIF_FUNC,
        PROVA,
        TAMANHO_CAMISA,
        TAMANHO_AGASALHO,
        TAMANHO_BERM_CAL,
        NR_CALCADO,
        FOTO_ATLETA,
        FOTO_RG,
        FOTO_RG_RESPONS,
      } = req.body;

      await Deficiencia.findAll({ where: { CD_DEFICIENCIA: CD_DEFICIENCIA } });

      // Validações

      // Calculando a idade
      const idade = diferencaAnos(req.body.DT_NASCIMENTO);

      if (!NM_PESSOA)
        return res.status(422).json({ message: "O seu nome é obrigatório" });
      if (!NR_CELULAR)
        return res
          .status(422)
          .json({ message: "O número de celular é obrigatório" });
      if (!SEXO)
        return res.status(422).json({ message: "O sexo é obrigatório" });
      if (!DT_NASCIMENTO)
        return res
          .status(422)
          .json({ message: "A data de nascimento é obrigatória" });
      if (!ESTADO_CIVIL)
        return res
          .status(422)
          .json({ message: "O estado civil é obrigatório" });
      if (!NATURALIDADE)
        return res
          .status(422)
          .json({ message: "A naturalidade é obrigatória" });
      if (!EMAIL)
        return res.status(422).json({ message: "O email é obrigatório" });
      if (!CD_EQUIPA_LOCOMOCAO)
        return res
          .status(422)
          .json({ message: "O equipamento de locomoção é obrigatório" });
      if (!CD_DEFICIENCIA)
        return res
          .status(422)
          .json({ message: "A escolha de uma deficiencia é obrigatória" });
      if (!CD_MEIO_LOCOMOCAO)
        return res
          .status(422)
          .json({ message: "O meio de locomoção é obrigatório" });
      if (!CD_FUNCAO)
        return res.status(422).json({ message: "A função é obrigatória" });
      if (!ASSISTENCIA)
        return res
          .status(422)
          .json({ message: "A opção de assistencia é obrigatória" });
      if (!NM_PAI)
        return res.status(422).json({ message: "O nome do pai é obrigatório" });
      if (!NM_MAE)
        return res.status(422).json({ message: "O nome do mãe é obrigatório" });
      if (idade < 18 && !CELULAR_PAI)
        return res
          .status(422)
          .json({ message: "O número de celular do pai é obrigatório" });
      if (idade < 18 && !CELULAR_MAE)
        return res
          .status(422)
          .json({ message: "O número do celular da mãe é obrigatório" });
      if (idade < 18 && !EMAIL_RESPONS)
        return res
          .status(422)
          .json({ message: "O e-mail do responsável é obrigatório" });
      if (idade < 18 && !NATURALIDADE_RESPONS)
        return res
          .status(422)
          .json({ message: "A naturalidade do responsável é obrigatório" });
      if (idade < 18 && !CPF_RESPONS)
        return res
          .status(422)
          .json({ message: "O número do CPF do responsável é obrigatório" });
      if (idade < 18 && !RG_RESPONS)
        return res
          .status(422)
          .json({ message: "O número do RG do responsável é obrigatório" });
      if (idade < 18 && !UF_RG_RESPONS)
        return res
          .status(422)
          .json({
            message:
              "O estado em que o RG do responsável foi emitido é obrigatório",
          });
      if (idade < 18 && !DT_EMISSAO_RG_RESPONS)
        return res
          .status(422)
          .json({
            message: "A data de emissão do RG do responsável é obrigatória",
          });
      if (!PESO)
        return res.status(422).json({ message: "O peso é obrigatório" });
      if (!ALTURA)
        return res.status(422).json({ message: "A altura é obrigatória" });
      if (!GP_SANGUE)
        return res
          .status(422)
          .json({ message: "O grupo sanguíneo é obrigatório" });
      if (!RENDA)
        return res.status(422).json({ message: "A renda é obrigatória" });
      if (!ESCOLARIDADE)
        return res
          .status(422)
          .json({ message: "A sua escolaridade é obrigatória" });
      if (!INSTITUICAO)
        return res
          .status(422)
          .json({
            message:
              "A instituição em que você estuda ou estudou é obrigatória",
          });
      if (idade < 18 && !TELEFONE_ESCOLA)
        return res
          .status(422)
          .json({ message: "O telefone da instituição é obrigatório" });
      if (!CPF)
        return res
          .status(422)
          .json({ message: "O seu numero de CPF é obrigatório" });
      if (!RG)
        return res
          .status(422)
          .json({ message: "O seu numero de RG é obrigatório" });
      if (!UF_RG)
        return res
          .status(422)
          .json({ message: "O estado em que o RG foi emitido é obrigatório" });
      if (!DT_EMISSAO_RG)
        return res
          .status(422)
          .json({ message: "A data de emissão do RG é obrigatória" });
      if (!CEP)
        return res
          .status(422)
          .json({ message: "O número do cep é obrigatório" });
      if (!ENDERECO)
        return res.status(422).json({ message: "O endereço é obrigatório" });
      if (!NR_ENDERECO)
        return res
          .status(422)
          .json({ message: "O número do endereço é obrigatório" });
      if (!CLASSIF_FUNC)
        return res
          .status(422)
          .json({ message: "A classificação funcional é obrigatória" });
      if (!CD_MODALIDADE)
        return res.status(422).json({ message: "A modalidade é obrigatória" });
      if (!PROVA)
        return res.status(422).json({ message: "A prova é obrigatória" });
      if (!TAMANHO_CAMISA)
        return res
          .status(422)
          .json({ message: "O tamanho da camisa é obrigatória" });
      if (!TAMANHO_AGASALHO)
        return res
          .status(422)
          .json({ message: "O tamanho do agasalho é obrigatório" });
      if (!TAMANHO_BERM_CAL)
        return res
          .status(422)
          .json({ message: "O tamanho da bermuda/calça é obrigatório" });
      if (!NR_CALCADO)
        return res
          .status(422)
          .json({ message: "O número do calçado é obrigatório" });
      if (!FOTO_ATLETA)
        return res
          .status(422)
          .json({ message: "A foto do associado é obrigatória" });
      if (!FOTO_RG)
        return res.status(422).json({ message: "A foto do RG é obrigatória" });
      if (idade < 18 && !FOTO_RG_RESPONS)
        return res
          .status(422)
          .json({ message: "A foto do RG do responsável é obrigatória" });
      if (!EmailValido(EMAIL))
        return res.status(422).json({ message: "Esta e-mail não é válido" });
      if (!EmailValido(EMAIL_RESPONS))
        return res.status(422).json({ message: "Esta e-mail não é válido" });
      if (!cpfValido(CPF))
        return res.status(422).json({ message: "Este CPF não é válido" });

      // //Consulta se o CPF já está cadastrado no banco de dados
      // const cpfSemPontuacao = req.body.CPF.replace(/\D/g, '')
      // const CPFemUso = await PessoaFisica.findOne({ where: { CPF: cpfSemPontuacao } })
      // if (CPFemUso) return res.status(422).json({ message: 'Este CPF já está sendo utilizado!' })

      // // Consulta se o RG já está cadastrado no banco de dados
      // const RGSemPontuacao = req.body.RG.replace(/\D/g, '')
      // const RGemUso = await PessoaFisica.findOne({ where: { RG: RGSemPontuacao } })
      // if (RGemUso) return res.status(422).json({ message: 'Este RG já está sendo utilizado!' })

      // Inserindo os dados
      const pessoaFisica = await PessoaFisica.create({
        NM_PESSOA,
        NR_CELULAR: NR_CELULAR
          ? NR_CELULAR.toString().match(/\d/g).join("")
          : null,
        NR_TELEFONE,
        SEXO,
        DT_NASCIMENTO,
        ESTADO_CIVIL,
        NATURALIDADE,
        EMAIL,
        CD_EQUIPA_LOCOMOCAO,
        MEIO_LOCOMOCAO: CD_MEIO_LOCOMOCAO,
        CD_EQUIPA_LOCOMOCAO: CD_MEIO_LOCOMOCAO,
        CD_FUNCAO,
        ASSISTENCIA,
        NM_PAI,
        CELULAR_PAI: CELULAR_PAI
          ? CELULAR_PAI.toString().match(/\d/g).join("")
          : null,
        NM_MAE,
        CELULAR_MAE: CELULAR_MAE
          ? CELULAR_MAE.toString().match(/\d/g).join("")
          : null,
        EMAIL_RESPONS,
        NATURALIDADE_RESPONS,
        PESO,
        ALTURA,
        GP_SANGUE,
        RENDA,
        ESCOLARIDADE,
        INSTITUICAO,
        MATRICULA,
        TELEFONE_ESCOLA: TELEFONE_ESCOLA
          ? TELEFONE_ESCOLA.toString().match(/\d/g).join("")
          : null,
        CPF: CPF ? CPF.toString().match(/\d/g).join("") : null,
        RG: RG ? RG.toString().match(/\d/g).join("") : null,
        UF_RG,
        DT_EMISSAO_RG,
        NR_PASSAPORTE: NR_PASSAPORTE
          ? NR_PASSAPORTE.toString().match(/\d/g).join("")
          : null,
        CPF_RESPONS: CPF_RESPONS
          ? CPF_RESPONS.toString().match(/\d/g).join("")
          : null,
        RG_RESPONS: RG_RESPONS
          ? RG_RESPONS.toString().match(/\d/g).join("")
          : null,
        UF_RG_RESPONS,
        DT_EMISSAO_RG_RESPONS,
        NR_PASSAPORTE_RESPONS: NR_PASSAPORTE_RESPONS
          ? NR_PASSAPORTE_RESPONS.toString().match(/\d/g).join("")
          : null,
        CEP: CEP ? CEP.toString().match(/\d/g).join("") : null,
        ENDERECO,
        NR_ENDERECO,
        DS_ENDERECO,
        CD_MODALIDADE,
        CLASSIF_FUNC,
        PROVA,
        TAMANHO_CAMISA,
        TAMANHO_AGASALHO,
        TAMANHO_BERM_CAL,
        NR_CALCADO,
        FOTO_ATLETA: FOTO_ATLETA,
        FOTO_RG: FOTO_RG,
        FOTO_RG_RESPONS: FOTO_RG_RESPONS,
        CD_USUARIO: user.CD_USUARIO,
      });

      for (const CD_DEFICIENCIA of req.body.CD_DEFICIENCIA) {
        // Associar deficiências ao usuário
        await DeficienciaPessoa.create({
          CD_PESSOA_FISICA: pessoaFisica.CD_PESSOA_FISICA,
          CD_DEFICIENCIA: CD_DEFICIENCIA,
        });
      }

      for (const MODALIDADE of req.body.CD_MODALIDADE) {
        // Associar modalidade ao usuário
        await AtletaModalidade.create({
          CD_PESSOA_FISICA: pessoaFisica.CD_PESSOA_FISICA,
          CD_MODALIDADE: MODALIDADE,
        });
      }

      return res
        .status(201)
        .json({ message: "Pessoa física cadastrada com sucesso" });
    } catch (error) {
      return res
        .status(500)
        .json({
          message: "Erro ao cadastrar pessoa física",
          erro: error.message,
        });
    }
  }

  static async TodosCadastratos(req, res) {
    const { nome } = req.query;
    const { Modalidade } = req.query;
    const { Deficiencia } = req.query;
    const { Funcao } = req.query;
    console.log(Modalidade, Deficiencia, Funcao);

    try {
      let sql_nome = "";
      let sql_modalidade = "";
      let sql_deficiencia = "";
      let sql_funcao = "";

      if (nome != null) {
        sql_nome = `AND "NM_PESSOA" LIKE '%${nome}%'`;
      }
      if (Modalidade != null) {
        sql_modalidade = `AND m."NM_MODALIDADE" LIKE '%${Modalidade}%'`;
      }
      if (Deficiencia != null) {
        sql_deficiencia = `AND d."TP_DEFICIENCIA" LIKE '%${Deficiencia}%'`;
      }
      if (Funcao != null) {
        sql_funcao = `AND f."NM_FUNCAO" LIKE '%${Funcao}%'`;
      }

      const pessoas = await db.query(
        `SELECT pf."CD_PESSOA_FISICA",
                             pf."FOTO_ATLETA",
                             pf."NM_PESSOA",
                             pf."CPF",
                             STRING_AGG(d."TP_DEFICIENCIA", ',' ORDER BY d."TP_DEFICIENCIA") AS Deficiencia,
                             m."NM_MODALIDADE" as Modalidade,
                             f."NM_FUNCAO" as Funcao
                      FROM cepe.public."PESSOA_FISICA" pf
                      LEFT JOIN cepe.public."DEFICIENCIA_PESSOA" dp ON pf."CD_PESSOA_FISICA" = dp."CD_PESSOA_FISICA"
                      LEFT JOIN cepe.public."DEFICIENCIA" d ON dp."CD_DEFICIENCIA" = d."CD_DEFICIENCIA"
                      LEFT JOIN cepe.public."MODALIDADE" m ON pf."CD_MODALIDADE" = m."CD_MODALIDADE"
                      LEFT JOIN cepe.public."FUNCAO" f ON pf."CD_FUNCAO" = f."CD_FUNCAO"
                      WHERE 1 = 1
                        ${sql_nome}
                        ${sql_modalidade}
                        ${sql_deficiencia}
                        ${sql_funcao}
                      GROUP BY pf."CD_PESSOA_FISICA", pf."FOTO_ATLETA", pf."NM_PESSOA", pf."CPF", m."NM_MODALIDADE", f."NM_FUNCAO"
                      order by pf."NM_PESSOA"
                    `,
        { type: db.QueryTypes.SELECT }
      );

      const dadosFormatados = pessoas.map((pessoa) => ({
        id: pessoa.CD_PESSOA_FISICA,
        Foto: pessoa.FOTO_ATLETA,
        CPF: formatarCPF(pessoa.CPF),
        Nome: pessoa.NM_PESSOA,
        Deficiencia: pessoa.deficiencia,
        Modalidade: pessoa.modalidade,
        Função: pessoa.funcao,
      }));

      res.status(200).json({ pessoas: dadosFormatados });
    } catch (error) {
      res.status(500).json({
        message: "Erro ao buscar os associados.",
        erro: error.message,
      });
    }
  }

  static async TodosCadastratosTec(req, res) {
    const { nome, Modalidade, userId, Deficiencia, Funcao } = req.query;
    console.log(userId);

    try {
      let sql_nome = "";
      let sql_modalidade = "";
      let sql_deficiencia = "";
      let sql_funcao = "";

      if (nome != null) {
        sql_nome = `AND "NM_PESSOA" LIKE '%${nome}%'`;
      }
      if (Modalidade != null) {
        sql_modalidade = `AND m."NM_MODALIDADE" LIKE '%${Modalidade}%'`;
      }
      if (Deficiencia != null) {
        sql_deficiencia = `AND d."TP_DEFICIENCIA" LIKE '%${Deficiencia}%'`;
      }
      if (Funcao != null) {
        sql_funcao = `AND f."NM_FUNCAO" LIKE '%${Funcao}%'`;
      }

      console.log()

      const pessoas = await db.query(
        `SELECT pf."CD_PESSOA_FISICA",
                pf."FOTO_ATLETA",
                pf."NM_PESSOA",
                pf."CPF",
                STRING_AGG(d."TP_DEFICIENCIA", ',' ORDER BY d."TP_DEFICIENCIA") AS Deficiencia,
                m."NM_MODALIDADE" as Modalidade,
                f."NM_FUNCAO" as Funcao
         FROM cepe.public."PESSOA_FISICA" pf
         LEFT JOIN cepe.public."DEFICIENCIA_PESSOA" dp ON pf."CD_PESSOA_FISICA" = dp."CD_PESSOA_FISICA"
         LEFT JOIN cepe.public."DEFICIENCIA" d ON dp."CD_DEFICIENCIA" = d."CD_DEFICIENCIA"
         LEFT JOIN cepe.public."MODALIDADE" m ON pf."CD_MODALIDADE" = m."CD_MODALIDADE"
         LEFT JOIN cepe.public."FUNCAO" f ON pf."CD_FUNCAO" = f."CD_FUNCAO"
         left join cepe.public."TECNICO_MODALIDADE" tm on tm."CD_MODALIDADE" = m."CD_MODALIDADE"
         WHERE 1 = 1
           and tm."CD_USUARIO" = ${userId}
           ${sql_nome}
           ${sql_modalidade}
           ${sql_deficiencia}
           ${sql_funcao}
         GROUP BY pf."CD_PESSOA_FISICA", pf."FOTO_ATLETA", pf."NM_PESSOA", pf."CPF", m."NM_MODALIDADE", f."NM_FUNCAO"
         order by pf."NM_PESSOA"
                        `,
        { type: db.QueryTypes.SELECT }
      );

      console.log(pessoas)

      const dadosFormatados = pessoas.map((pessoa) => ({
        id: pessoa.CD_PESSOA_FISICA,
        Foto: pessoa.FOTO_ATLETA,
        CPF: formatarCPF(pessoa.CPF),
        Nome: pessoa.NM_PESSOA,
        Deficiencia: pessoa.deficiencia,
        Modalidade: pessoa.modalidade,
        Função: pessoa.funcao,
      }));

      res.status(200).json({ pessoas: dadosFormatados });
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: "Erro ao buscar os associados.",
        erro: error.message,
      });
    }
  }

  static async editarPessoaFisica(req, res) {
    const { CD_PESSOA_FISICA } = req.params;

    try {
      // Verificando se o usuário existe
      const token = ObterToken(req);
      const user = await ObterUsuarioToken(token);

      const pessoaFisica = await PessoaFisica.findByPk(CD_PESSOA_FISICA);

      if (!pessoaFisica) {
        return res
          .status(404)
          .json({ message: "Pessoa física não encontrada" });
      }

      // Verifica se o usuário logado tem permissão para editar essa pessoa física
      if (pessoaFisica.CD_USUARIO !== user.CD_USUARIO) {
        return res.status(403).json({ message: "Usuário não autorizado" });
      }

      // Realiza as atualizações necessárias
      const {
        NM_PESSOA,
        NR_CELULAR,
        NR_TELEFONE,
        SEXO,
        DT_NASCIMENTO,
        ESTADO_CIVIL,
        NATURALIDADE,
        EMAIL,
        CD_EQUIPA_LOCOMOCAO,
        CD_DEFICIENCIA,
        CD_MEIO_LOCOMOCAO,
        CD_FUNCAO,
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
        MATRICULA,
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
        CEP,
        ENDERECO,
        NR_ENDERECO,
        DS_ENDERECO,
        CD_MODALIDADE,
        CLASSIF_FUNC,
        PROVA,
        TAMANHO_CAMISA,
        TAMANHO_AGASALHO,
        TAMANHO_BERM_CAL,
        NR_CALCADO,
        FOTO_ATLETA,
        FOTO_RG,
        FOTO_RG_RESPONS,
      } = req.body;

      // Validações

      // Calculando a idade
      const idade = diferencaAnos(req.body.DT_NASCIMENTO);

      if (!NM_PESSOA) {
        res.status(422).json({ message: "O seu nome é obrigatório" });
        return;
      }

      pessoaFisica.NM_PESSOA = NM_PESSOA;

      if (!NR_CELULAR) {
        res.status(422).json({ message: "O número de celular é obrigatório" });
        return;
      }

      pessoaFisica.NR_CELULAR = NR_CELULAR;

      if (!SEXO) {
        res.status(422).json({ message: "O sexo é obrigatório" });
        return;
      }

      pessoaFisica.SEXO = SEXO;

      if (!DT_NASCIMENTO) {
        res.status(422).json({ message: "A data de nascimento é obrigatória" });
        return;
      }

      pessoaFisica.DT_NASCIMENTO = DT_NASCIMENTO;

      if (!ESTADO_CIVIL) {
        res.status(422).json({ message: "O estado civil é obrigatório" });
        return;
      }

      pessoaFisica.ESTADO_CIVIL = ESTADO_CIVIL;

      if (!NATURALIDADE) {
        res.status(422).json({ message: "A naturalidade é obrigatória" });
        return;
      }

      pessoaFisica.NATURALIDADE = NATURALIDADE;

      if (!EMAIL) {
        res.status(422).json({ message: "O email é obrigatório" });
        return;
      }

      pessoaFisica.EMAIL = EMAIL;

      if (!CD_EQUIPA_LOCOMOCAO) {
        res
          .status(422)
          .json({ message: "O equipamento de locomoção é obrigatório" });
        return;
      }

      pessoaFisica.CD_EQUIPA_LOCOMOCAO = CD_EQUIPA_LOCOMOCAO;

      if (!CD_DEFICIENCIA) {
        res
          .status(422)
          .json({ message: "A escolha de uma deficiencia é obrigatória" });
        return;
      }

      pessoaFisica.CD_DEFICIENCIA = CD_DEFICIENCIA;

      if (!CD_MEIO_LOCOMOCAO) {
        res.status(422).json({ message: "O meio de locomoção é obrigatório" });
        return;
      }

      pessoaFisica.MEIO_LOCOMOCAO = MEIO_LOCOMOCAO;

      if (!CD_FUNCAO) {
        res.status(422).json({ message: "A função é obrigatória" });
        return;
      }

      pessoaFisica.CD_FUNCAO = CD_FUNCAO;

      if (!ASSISTENCIA) {
        res
          .status(422)
          .json({ message: "A opção de assistencia é obrigatória" });
        return;
      }

      pessoaFisica.ASSISTENCIA = ASSISTENCIA;

      if (!NM_PAI) {
        res.status(422).json({ message: "O nome do pai é obrigatório" });
        return;
      }

      pessoaFisica.NM_PAI = NM_PAI;

      if (!NM_MAE) {
        res.status(422).json({ message: "O nome do mãe é obrigatório" });
        return;
      }

      pessoaFisica.NM_MAE = NM_MAE;

      if (idade < 18 && !CELULAR_PAI) {
        res
          .status(422)
          .json({ message: "O número de celular do pai é obrigatório" });
        return;
      }

      pessoaFisica.CELULAR_PAI = CELULAR_PAI;

      if (idade < 18 && !CELULAR_MAE) {
        res
          .status(422)
          .json({ message: "O número do celular da mãe é obrigatório" });
        return;
      }

      pessoaFisica.CELULAR_MAE = CELULAR_MAE;

      if (idade < 18 && !EMAIL_RESPONS) {
        res
          .status(422)
          .json({ message: "O e-mail do responsável é obrigatório" });
        return;
      }

      pessoaFisica.EMAIL_RESPONS = EMAIL_RESPONS;

      if (idade < 18 && !NATURALIDADE_RESPONS) {
        res
          .status(422)
          .json({ message: "A naturalidade do responsável é obrigatório" });
        return;
      }

      pessoaFisica.NATURALIDADE_RESPONS = NATURALIDADE_RESPONS;

      if (idade < 18 && !CPF_RESPONS) {
        res
          .status(422)
          .json({ message: "O número do CPF do responsável é obrigatório" });
        return;
      }

      pessoaFisica.CPF_RESPONS = CPF_RESPONS;

      if (idade < 18 && !RG_RESPONS) {
        res
          .status(422)
          .json({ message: "O número do RG do responsável é obrigatório" });
        return;
      }

      pessoaFisica.RG_RESPONS = RG_RESPONS;

      if (idade < 18 && !UF_RG_RESPONS) {
        res.status(422).json({
          message:
            "O estado em que o RG do responsável foi emitido é obrigatório",
        });
        return;
      }

      pessoaFisica.UF_RG_RESPONS = UF_RG_RESPONS;

      if (idade < 18 && !DT_EMISSAO_RG_RESPONS) {
        res.status(422).json({
          message: "A data de emissão do RG do responsável é obrigatória",
        });
        return;
      }

      pessoaFisica.DT_EMISSAO_RG_RESPONS = DT_EMISSAO_RG_RESPONS;

      if (!PESO) {
        res.status(422).json({ message: "O peso é obrigatório" });
        return;
      }

      pessoaFisica.PESO = PESO;

      if (!ALTURA) {
        res.status(422).json({ message: "A altura é obrigatória" });
        return;
      }

      pessoaFisica.ALTURA = ALTURA;

      if (!GP_SANGUE) {
        res.status(422).json({ message: "O grupo sanguíneo é obrigatório" });
        return;
      }

      pessoaFisica.GP_SANGUE = GP_SANGUE;

      if (!RENDA) {
        res.status(422).json({ message: "A renda é obrigatória" });
        return;
      }

      pessoaFisica.RENDA = RENDA;

      if (!ESCOLARIDADE) {
        res.status(422).json({ message: "A sua escolaridade é obrigatória" });
        return;
      }

      pessoaFisica.ESCOLARIDADE = ESCOLARIDADE;

      if (!INSTITUICAO) {
        res.status(422).json({
          message: "A instituição em que você estuda ou estudou é obrigatória",
        });
        return;
      }

      pessoaFisica.INSTITUICAO = INSTITUICAO;

      if (idade < 18 && !TELEFONE_ESCOLA) {
        res
          .status(422)
          .json({ message: "O telefone da instituição é obrigatório" });
        return;
      }

      pessoaFisica.TELEFONE_ESCOLA = TELEFONE_ESCOLA;

      if (!CPF) {
        res.status(422).json({ message: "O seu numero de CPF é obrigatório" });
        return;
      }

      pessoaFisica.CPF = CPF;

      if (!RG) {
        res.status(422).json({ message: "O seu numero de RG é obrigatório" });
        return;
      }

      pessoaFisica.RG = RG;

      if (!UF_RG) {
        res
          .status(422)
          .json({ message: "O estado em que o RG foi emitido é obrigatório" });
        return;
      }

      pessoaFisica.UF_RG = UF_RG;

      if (!DT_EMISSAO_RG) {
        res
          .status(422)
          .json({ message: "A data de emissão do RG é obrigatória" });
        return;
      }

      pessoaFisica.DT_EMISSAO_RG = DT_EMISSAO_RG;

      if (!CEP) {
        res.status(422).json({ message: "O número do cep é obrigatório" });
        return;
      }

      pessoaFisica.CEP = CEP;

      if (!ENDERECO) {
        res.status(422).json({ message: "O endereço é obrigatório" });
        return;
      }

      pessoaFisica.ENDERECO = ENDERECO;

      if (!NR_ENDERECO) {
        res.status(422).json({ message: "O número do endereço é obrigatório" });
        return;
      }

      pessoaFisica.NR_ENDERECO = NR_ENDERECO;

      if (!CLASSIF_FUNC) {
        res
          .status(422)
          .json({ message: "A classificação funcional é obrigatória" });
        return;
      }

      pessoaFisica.CLASSIF_FUNC = CLASSIF_FUNC;

      if (!CD_MODALIDADE) {
        res.status(422).json({ message: "A modalidade é obrigatória" });
        return;
      }

      pessoaFisica.CD_MODALIDADE = CD_MODALIDADE;

      if (!PROVA) {
        res.status(422).json({ message: "A prova é obrigatória" });
        return;
      }

      pessoaFisica.PROVA = PROVA;

      if (!TAMANHO_CAMISA) {
        res.status(422).json({ message: "O tamanho da camisa é obrigatória" });
        return;
      }

      pessoaFisica.TAMANHO_CAMISA = TAMANHO_CAMISA;

      if (!TAMANHO_AGASALHO) {
        res
          .status(422)
          .json({ message: "O tamanho do agasalho é obrigatório" });
        return;
      }

      pessoaFisica.TAMANHO_AGASALHO = TAMANHO_AGASALHO;

      if (!TAMANHO_BERM_CAL) {
        res
          .status(422)
          .json({ message: "O tamanho da bermuda/calça é obrigatório" });
        return;
      }

      pessoaFisica.TAMANHO_BERM_CAL = TAMANHO_BERM_CAL;

      if (!NR_CALCADO) {
        res.status(422).json({ message: "O número do calçado é obrigatório" });
        return;
      }

      pessoaFisica.NR_CALCADO = NR_CALCADO;

      if (!FOTO_ATLETA) {
        res.status(422).json({ message: "A foto do associado é obrigatória" });
        return;
      }

      pessoaFisica.FOTO_ATLETA = FOTO_ATLETA;

      if (!FOTO_RG) {
        res.status(422).json({ message: "A foto do RG é obrigatória" });
        return;
      }

      pessoaFisica.FOTO_RG = FOTO_RG;

      if (idade < 18 && !FOTO_RG_RESPONS) {
        res
          .status(422)
          .json({ message: "A foto do RG do responsável é obrigatória" });
        return;
      }

      pessoaFisica.FOTO_RG_RESPONS = FOTO_RG_RESPONS;

      if (!EmailValido(EMAIL)) {
        res.status(422).json({ message: "Esta e-mail não é válido" });
        return;
      }

      if (!EmailValido(EMAIL_RESPONS)) {
        res.status(422).json({ message: "Esta e-mail não é válido" });
        return;
      }

      if (!cpfValido(CPF)) {
        res.status(422).json({ message: "Este CPF não é válido" });
        return;
      }

      // //Consulta se o CPF já está cadastrado no banco de dados
      // const cpfSemPontuacao = req.body.CPF.replace(/\D/g, '')
      // const CPFemUso = await PessoaFisica.findOne({ where: { CPF: cpfSemPontuacao } })
      // if (CPFemUso) {
      //     return res.status(422).json({ message: 'Este CPF já está sendo utilizado!' })
      // }

      // // Consulta se o RG já está cadastrado no banco de dados
      // const RGSemPontuacao = req.body.RG.replace(/\D/g, '')
      // const RGemUso = await PessoaFisica.findOne({ where: { RG: RGSemPontuacao } })
      // if (RGemUso) {
      //     return res.status(422).json({ message: 'Este RG já está sendo utilizado!' })
      // }

      // Atualiza os campos necessários
      await pessoaFisica.update({
        NM_PESSOA,
        NR_CELULAR: NR_CELULAR
          ? NR_CELULAR.toString().match(/\d/g).join("")
          : null,
        NR_TELEFONE,
        SEXO,
        DT_NASCIMENTO,
        ESTADO_CIVIL,
        NATURALIDADE,
        EMAIL,
        CD_EQUIPA_LOCOMOCAO,
        MEIO_LOCOMOCAO,
        CD_FUNCAO,
        ASSISTENCIA,
        NM_PAI,
        CELULAR_PAI: CELULAR_PAI
          ? CELULAR_PAI.toString().match(/\d/g).join("")
          : null,
        NM_MAE,
        CELULAR_MAE: CELULAR_MAE
          ? CELULAR_MAE.toString().match(/\d/g).join("")
          : null,
        EMAIL_RESPONS,
        NATURALIDADE_RESPONS,
        PESO,
        ALTURA,
        GP_SANGUE,
        RENDA,
        ESCOLARIDADE,
        INSTITUICAO,
        MATRICULA,
        TELEFONE_ESCOLA: TELEFONE_ESCOLA
          ? TELEFONE_ESCOLA.toString().match(/\d/g).join("")
          : null,
        CPF: CPF ? CPF.toString().match(/\d/g).join("") : null,
        RG: RG ? RG.toString().match(/\d/g).join("") : null,
        UF_RG,
        DT_EMISSAO_RG,
        NR_PASSAPORTE: NR_PASSAPORTE
          ? NR_PASSAPORTE.toString().match(/\d/g).join("")
          : null,
        CPF_RESPONS: CPF_RESPONS
          ? CPF_RESPONS.toString().match(/\d/g).join("")
          : null,
        RG_RESPONS: RG_RESPONS
          ? RG_RESPONS.toString().match(/\d/g).join("")
          : null,
        UF_RG_RESPONS,
        DT_EMISSAO_RG_RESPONS,
        NR_PASSAPORTE_RESPONS: NR_PASSAPORTE_RESPONS
          ? NR_PASSAPORTE_RESPONS.toString().match(/\d/g).join("")
          : null,
        CEP: CEP ? CEP.toString().match(/\d/g).join("") : null,
        ENDERECO,
        NR_ENDERECO,
        DS_ENDERECO,
        CD_MODALIDADE,
        CLASSIF_FUNC,
        PROVA,
        TAMANHO_CAMISA,
        TAMANHO_AGASALHO,
        TAMANHO_BERM_CAL,
        NR_CALCADO,
        FOTO_ATLETA: FOTO_ATLETA,
        FOTO_RG: FOTO_RG,
        FOTO_RG_RESPONS: FOTO_RG_RESPONS,
      });

      // Atualizar deficiências associadas
      await DeficienciaPessoa.destroy({
        where: { CD_PESSOA_FISICA: pessoaFisica.CD_PESSOA_FISICA },
      });
      for (const CD_DEFICIENCIA of req.body.CD_DEFICIENCIA) {
        await DeficienciaPessoa.create({
          CD_PESSOA_FISICA: pessoaFisica.CD_PESSOA_FISICA,
          CD_DEFICIENCIA: CD_DEFICIENCIA,
        });
      }

      return res
        .status(200)
        .json({ message: "Pessoa física atualizada com sucesso" });
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao atualizar pessoa física",
        erro: error.message,
      });
    }
  }

  static async editarPessoaFisicaGrid(req, res) {
    const { CD_PESSOA_FISICA } = req.params;

    try {
      const pessoaFisica = await PessoaFisica.findByPk(CD_PESSOA_FISICA);

      if (!pessoaFisica) {
        return res
          .status(404)
          .json({ message: "Pessoa física não encontrada" });
      }

      // Realiza as atualizações necessárias
      const {
        NM_PESSOA,
        NR_CELULAR,
        NR_TELEFONE,
        SEXO,
        DT_NASCIMENTO,
        ESTADO_CIVIL,
        NATURALIDADE,
        EMAIL,
        CD_EQUIPA_LOCOMOCAO,
        CD_DEFICIENCIA,
        MEIO_LOCOMOCAO,
        CD_FUNCAO,
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
        MATRICULA,
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
        CEP,
        ENDERECO,
        NR_ENDERECO,
        DS_ENDERECO,
        CD_MODALIDADE,
        CLASSIF_FUNC,
        PROVA,
        TAMANHO_CAMISA,
        TAMANHO_AGASALHO,
        TAMANHO_BERM_CAL,
        NR_CALCADO,
      } = req.body;

      const { FOTO_ATLETA, FOTO_RG, FOTO_RG_RESPONS } = req.files;

      // Validações

      // Calculando a idade
      const idade = diferencaAnos(req.body.DT_NASCIMENTO);

      if (!NM_PESSOA) {
        res.status(422).json({ message: "O seu nome é obrigatório" });
        return;
      }

      pessoaFisica.NM_PESSOA = NM_PESSOA;

      if (!NR_CELULAR) {
        res.status(422).json({ message: "O número de celular é obrigatório" });
        return;
      }

      pessoaFisica.NR_CELULAR = NR_CELULAR;

      if (!SEXO) {
        res.status(422).json({ message: "O sexo é obrigatório" });
        return;
      }

      pessoaFisica.SEXO = SEXO;

      if (!DT_NASCIMENTO) {
        res.status(422).json({ message: "A data de nascimento é obrigatória" });
        return;
      }

      pessoaFisica.DT_NASCIMENTO = DT_NASCIMENTO;

      if (!ESTADO_CIVIL) {
        res.status(422).json({ message: "O estado civil é obrigatório" });
        return;
      }

      pessoaFisica.ESTADO_CIVIL = ESTADO_CIVIL;

      if (!NATURALIDADE) {
        res.status(422).json({ message: "A naturalidade é obrigatória" });
        return;
      }

      pessoaFisica.NATURALIDADE = NATURALIDADE;

      if (!EMAIL) {
        res.status(422).json({ message: "O email é obrigatório" });
        return;
      }

      pessoaFisica.EMAIL = EMAIL;

      if (!CD_EQUIPA_LOCOMOCAO) {
        res
          .status(422)
          .json({ message: "O equipamento de locomoção é obrigatório" });
        return;
      }

      pessoaFisica.CD_EQUIPA_LOCOMOCAO = CD_EQUIPA_LOCOMOCAO;

      if (!CD_DEFICIENCIA) {
        res
          .status(422)
          .json({ message: "A escolha de uma deficiencia é obrigatória" });
        return;
      }

      pessoaFisica.CD_DEFICIENCIA = CD_DEFICIENCIA;

      if (!MEIO_LOCOMOCAO) {
        res.status(422).json({ message: "O meio de locomoção é obrigatório" });
        return;
      }

      pessoaFisica.MEIO_LOCOMOCAO = MEIO_LOCOMOCAO;

      if (!CD_FUNCAO) {
        res.status(422).json({ message: "A função é obrigatória" });
        return;
      }

      pessoaFisica.CD_FUNCAO = CD_FUNCAO;

      if (!ASSISTENCIA) {
        res
          .status(422)
          .json({ message: "A opção de assistencia é obrigatória" });
        return;
      }

      pessoaFisica.ASSISTENCIA = ASSISTENCIA;

      if (!NM_PAI) {
        res.status(422).json({ message: "O nome do pai é obrigatório" });
        return;
      }

      pessoaFisica.NM_PAI = NM_PAI;

      if (!NM_MAE) {
        res.status(422).json({ message: "O nome do mãe é obrigatório" });
        return;
      }

      pessoaFisica.NM_MAE = NM_MAE;

      if (idade < 18 && !CELULAR_PAI) {
        res
          .status(422)
          .json({ message: "O número de celular do pai é obrigatório" });
        return;
      }

      pessoaFisica.CELULAR_PAI = CELULAR_PAI;

      if (idade < 18 && !CELULAR_MAE) {
        res
          .status(422)
          .json({ message: "O número do celular da mãe é obrigatório" });
        return;
      }

      pessoaFisica.CELULAR_MAE = CELULAR_MAE;

      if (idade < 18 && !EMAIL_RESPONS) {
        res
          .status(422)
          .json({ message: "O e-mail do responsável é obrigatório" });
        return;
      }

      pessoaFisica.EMAIL_RESPONS = EMAIL_RESPONS;

      if (idade < 18 && !NATURALIDADE_RESPONS) {
        res
          .status(422)
          .json({ message: "A naturalidade do responsável é obrigatório" });
        return;
      }

      pessoaFisica.NATURALIDADE_RESPONS = NATURALIDADE_RESPONS;

      if (idade < 18 && !CPF_RESPONS) {
        res
          .status(422)
          .json({ message: "O número do CPF do responsável é obrigatório" });
        return;
      }

      pessoaFisica.CPF_RESPONS = CPF_RESPONS;

      if (idade < 18 && !RG_RESPONS) {
        res
          .status(422)
          .json({ message: "O número do RG do responsável é obrigatório" });
        return;
      }

      pessoaFisica.RG_RESPONS = RG_RESPONS;

      if (idade < 18 && !UF_RG_RESPONS) {
        res.status(422).json({
          message:
            "O estado em que o RG do responsável foi emitido é obrigatório",
        });
        return;
      }

      pessoaFisica.UF_RG_RESPONS = UF_RG_RESPONS;

      if (idade < 18 && !DT_EMISSAO_RG_RESPONS) {
        res.status(422).json({
          message: "A data de emissão do RG do responsável é obrigatória",
        });
        return;
      }

      pessoaFisica.DT_EMISSAO_RG_RESPONS = DT_EMISSAO_RG_RESPONS;

      if (!PESO) {
        res.status(422).json({ message: "O peso é obrigatório" });
        return;
      }

      pessoaFisica.PESO = PESO;

      if (!ALTURA) {
        res.status(422).json({ message: "A altura é obrigatória" });
        return;
      }

      pessoaFisica.ALTURA = ALTURA;

      if (!GP_SANGUE) {
        res.status(422).json({ message: "O grupo sanguíneo é obrigatório" });
        return;
      }

      pessoaFisica.GP_SANGUE = GP_SANGUE;

      if (!RENDA) {
        res.status(422).json({ message: "A renda é obrigatória" });
        return;
      }

      pessoaFisica.RENDA = RENDA;

      if (!ESCOLARIDADE) {
        res.status(422).json({ message: "A sua escolaridade é obrigatória" });
        return;
      }

      pessoaFisica.ESCOLARIDADE = ESCOLARIDADE;

      if (!INSTITUICAO) {
        res.status(422).json({
          message: "A instituição em que você estuda ou estudou é obrigatória",
        });
        return;
      }

      pessoaFisica.INSTITUICAO = INSTITUICAO;

      if (idade < 18 && !TELEFONE_ESCOLA) {
        res
          .status(422)
          .json({ message: "O telefone da instituição é obrigatório" });
        return;
      }

      pessoaFisica.TELEFONE_ESCOLA = TELEFONE_ESCOLA;

      if (!CPF) {
        res.status(422).json({ message: "O seu numero de CPF é obrigatório" });
        return;
      }

      pessoaFisica.CPF = CPF;

      if (!RG) {
        res.status(422).json({ message: "O seu numero de RG é obrigatório" });
        return;
      }

      pessoaFisica.RG = RG;

      if (!UF_RG) {
        res
          .status(422)
          .json({ message: "O estado em que o RG foi emitido é obrigatório" });
        return;
      }

      pessoaFisica.UF_RG = UF_RG;

      if (!DT_EMISSAO_RG) {
        res
          .status(422)
          .json({ message: "A data de emissão do RG é obrigatória" });
        return;
      }

      pessoaFisica.DT_EMISSAO_RG = DT_EMISSAO_RG;

      if (!CEP) {
        res.status(422).json({ message: "O número do cep é obrigatório" });
        return;
      }

      pessoaFisica.CEP = CEP;

      if (!ENDERECO) {
        res.status(422).json({ message: "O endereço é obrigatório" });
        return;
      }

      pessoaFisica.ENDERECO = ENDERECO;

      if (!NR_ENDERECO) {
        res.status(422).json({ message: "O número do endereço é obrigatório" });
        return;
      }

      pessoaFisica.NR_ENDERECO = NR_ENDERECO;

      if (!CLASSIF_FUNC) {
        res
          .status(422)
          .json({ message: "A classificação funcional é obrigatória" });
        return;
      }

      pessoaFisica.CLASSIF_FUNC = CLASSIF_FUNC;

      if (!CD_MODALIDADE) {
        res.status(422).json({ message: "A modalidade é obrigatória" });
        return;
      }

      pessoaFisica.CD_MODALIDADE = CD_MODALIDADE;

      if (!PROVA) {
        res.status(422).json({ message: "A prova é obrigatória" });
        return;
      }

      pessoaFisica.PROVA = PROVA;

      if (!TAMANHO_CAMISA) {
        res.status(422).json({ message: "O tamanho da camisa é obrigatória" });
        return;
      }

      pessoaFisica.TAMANHO_CAMISA = TAMANHO_CAMISA;

      if (!TAMANHO_AGASALHO) {
        res
          .status(422)
          .json({ message: "O tamanho do agasalho é obrigatório" });
        return;
      }

      pessoaFisica.TAMANHO_AGASALHO = TAMANHO_AGASALHO;

      if (!TAMANHO_BERM_CAL) {
        res
          .status(422)
          .json({ message: "O tamanho da bermuda/calça é obrigatório" });
        return;
      }

      pessoaFisica.TAMANHO_BERM_CAL = TAMANHO_BERM_CAL;

      if (!NR_CALCADO) {
        res.status(422).json({ message: "O número do calçado é obrigatório" });
        return;
      }

      pessoaFisica.NR_CALCADO = NR_CALCADO;

      if (!FOTO_ATLETA) {
        res.status(422).json({ message: "A foto do associado é obrigatória" });
        return;
      }

      pessoaFisica.FOTO_ATLETA = FOTO_ATLETA;

      if (!FOTO_RG) {
        res.status(422).json({ message: "A foto do RG é obrigatória" });
        return;
      }

      pessoaFisica.FOTO_RG = FOTO_RG;

      if (idade < 18 && !FOTO_RG_RESPONS) {
        res
          .status(422)
          .json({ message: "A foto do RG do responsável é obrigatória" });
        return;
      }

      pessoaFisica.FOTO_RG_RESPONS = FOTO_RG_RESPONS;

      if (!EmailValido(EMAIL)) {
        res.status(422).json({ message: "Esta e-mail não é válido" });
        return;
      }

      if (!EmailValido(EMAIL_RESPONS)) {
        res.status(422).json({ message: "Esta e-mail não é válido" });
        return;
      }

      if (!cpfValido(CPF)) {
        res.status(422).json({ message: "Este CPF não é válido" });
        return;
      }

      // //Consulta se o CPF já está cadastrado no banco de dados
      // const cpfSemPontuacao = req.body.CPF.replace(/\D/g, '');
      // const CPFemUso = await PessoaFisica.findOne({ where: { CPF: cpfSemPontuacao } });
      // if (CPFemUso) {
      //     return res.status(422).json({ message: 'Este CPF já está sendo utilizado!' });
      // }

      // // Consulta se o RG já está cadastrado no banco de dados
      // const RGSemPontuacao = req.body.RG.replace(/\D/g, '');
      // const RGemUso = await PessoaFisica.findOne({ where: { RG: RGSemPontuacao } });
      // if (RGemUso) {
      //     return res.status(422).json({ message: 'Este RG já está sendo utilizado!' });
      // }

      // Atualiza os campos necessários
      await pessoaFisica.update({
        NM_PESSOA,
        NR_CELULAR: NR_CELULAR
          ? NR_CELULAR.toString().match(/\d/g).join("")
          : null,
        NR_TELEFONE,
        SEXO,
        DT_NASCIMENTO,
        ESTADO_CIVIL,
        NATURALIDADE,
        EMAIL,
        CD_EQUIPA_LOCOMOCAO,
        MEIO_LOCOMOCAO,
        CD_FUNCAO,
        ASSISTENCIA,
        NM_PAI,
        CELULAR_PAI: CELULAR_PAI
          ? CELULAR_PAI.toString().match(/\d/g).join("")
          : null,
        NM_MAE,
        CELULAR_MAE: CELULAR_MAE
          ? CELULAR_MAE.toString().match(/\d/g).join("")
          : null,
        EMAIL_RESPONS,
        NATURALIDADE_RESPONS,
        PESO,
        ALTURA,
        GP_SANGUE,
        RENDA,
        ESCOLARIDADE,
        INSTITUICAO,
        MATRICULA,
        TELEFONE_ESCOLA: TELEFONE_ESCOLA
          ? TELEFONE_ESCOLA.toString().match(/\d/g).join("")
          : null,
        CPF: CPF ? CPF.toString().match(/\d/g).join("") : null,
        RG: RG ? RG.toString().match(/\d/g).join("") : null,
        UF_RG,
        DT_EMISSAO_RG,
        NR_PASSAPORTE: NR_PASSAPORTE
          ? NR_PASSAPORTE.toString().match(/\d/g).join("")
          : null,
        CPF_RESPONS: CPF_RESPONS
          ? CPF_RESPONS.toString().match(/\d/g).join("")
          : null,
        RG_RESPONS: RG_RESPONS
          ? RG_RESPONS.toString().match(/\d/g).join("")
          : null,
        UF_RG_RESPONS,
        DT_EMISSAO_RG_RESPONS,
        NR_PASSAPORTE_RESPONS: NR_PASSAPORTE_RESPONS
          ? NR_PASSAPORTE_RESPONS.toString().match(/\d/g).join("")
          : null,
        CEP: CEP ? CEP.toString().match(/\d/g).join("") : null,
        ENDERECO,
        NR_ENDERECO,
        DS_ENDERECO,
        CD_MODALIDADE,
        CLASSIF_FUNC,
        PROVA,
        TAMANHO_CAMISA,
        TAMANHO_AGASALHO,
        TAMANHO_BERM_CAL,
        NR_CALCADO,
        FOTO_ATLETA: FOTO_ATLETA[0].filename,
        FOTO_RG: FOTO_RG[0].filename,
        FOTO_RG_RESPONS: FOTO_RG_RESPONS[0].filename,
      });

      // Atualizar deficiências associadas
      await DeficienciaPessoa.destroy({
        where: { CD_PESSOA_FISICA: pessoaFisica.CD_PESSOA_FISICA },
      });
      for (const CD_DEFICIENCIA of req.body.CD_DEFICIENCIA) {
        await DeficienciaPessoa.create({
          CD_PESSOA_FISICA: pessoaFisica.CD_PESSOA_FISICA,
          CD_DEFICIENCIA: CD_DEFICIENCIA,
        });
      }

      return res
        .status(200)
        .json({ message: "Pessoa física atualizada com sucesso" });
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao atualizar pessoa física",
        erro: error.message,
      });
    }
  }

  static async excluirPessoaId(req, res) {
    const { CD_PESSOA_FISICA } = req.params;

    try {
      // Verificando se o usuário existe

      const pessoaFisica = await PessoaFisica.findByPk(CD_PESSOA_FISICA);

      if (!pessoaFisica) {
        return res
          .status(404)
          .json({ message: "Pessoa física não encontrada" });
      }

      // Deleta o registro
      await pessoaFisica.destroy(pessoaFisica);

      return res
        .status(200)
        .json({ message: "Pessoa física excluída com sucesso" });
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao excluir pessoa física",
        erro: error.message,
      });
    }
  }

  static async DadosFormatados(req, res) {
    const { CD_PESSOA_FISICA } = req.params;

    try {
      if (!CD_PESSOA_FISICA) {
        return res.status(404).send("Usuário não encontrado");
      }

      const pessoas = await db.query(
        `SELECT pf.*,
                STRING_AGG(d."TP_DEFICIENCIA", ',' ORDER BY d."TP_DEFICIENCIA") AS Deficiencia,
                m."NM_MODALIDADE" as Modalidade,
                f."NM_FUNCAO" as Funcao
         FROM cepe.public."PESSOA_FISICA" pf
         LEFT JOIN cepe.public."DEFICIENCIA_PESSOA" dp ON pf."CD_PESSOA_FISICA" = dp."CD_PESSOA_FISICA"
         LEFT JOIN cepe.public."DEFICIENCIA" d ON dp."CD_DEFICIENCIA" = d."CD_DEFICIENCIA"
         LEFT JOIN cepe.public."MODALIDADE" m ON pf."CD_MODALIDADE" = m."CD_MODALIDADE"
         LEFT JOIN cepe.public."FUNCAO" f ON pf."CD_FUNCAO" = f."CD_FUNCAO"
         WHERE pf."CD_PESSOA_FISICA" in (${CD_PESSOA_FISICA})
         GROUP BY pf."CD_PESSOA_FISICA", pf."NM_PESSOA", pf."NR_CELULAR", pf."NR_TELEFONE", 
                  pf."SEXO", pf."DT_NASCIMENTO", pf."ESTADO_CIVIL", pf."NATURALIDADE", pf."EMAIL",
                  pf."MEIO_LOCOMOCAO", pf."ASSISTENCIA", pf."NM_PAI", pf."CELULAR_PAI", pf."NM_MAE", 
                  pf."CELULAR_MAE", pf."EMAIL_RESPONS", pf."NATURALIDADE_RESPONS", pf."PESO", pf."ALTURA", 
                  pf."GP_SANGUE", pf."RENDA", pf."ESCOLARIDADE", pf."INSTITUICAO", pf."MATRICULA", pf."TELEFONE_ESCOLA", 
                  pf."CPF", pf."RG", pf."UF_RG", pf."DT_EMISSAO_RG", pf."NR_PASSAPORTE", pf."CPF_RESPONS", pf."RG_RESPONS",
                  pf."UF_RG_RESPONS", pf."DT_EMISSAO_RG_RESPONS", pf."NR_PASSAPORTE_RESPONS", pf."CEP", pf."ENDERECO", pf."NR_ENDERECO",
                  pf."DS_ENDERECO", pf."CLASSIF_FUNC", pf."PROVA", pf."TAMANHO_CAMISA", pf."TAMANHO_AGASALHO", pf."TAMANHO_BERM_CAL", 
                  pf."NR_CALCADO", m."NM_MODALIDADE", f."NM_FUNCAO"
        `,
        { replacements: { CD_PESSOA_FISICA }, type: db.QueryTypes.SELECT }
      );

      const dadosFormatados = pessoas.map((pessoa) => ({
        CD_PESSOA_FISICA: pessoa.CD_PESSOA_FISICA,
        NM_PESSOA: pessoa.NM_PESSOA,
        NR_CELULAR: formatarTelefone(pessoa.NR_CELULAR),
        NR_TELEFONE: formatarTelefone(pessoa.NR_TELEFONE),
        SEXO: pessoa.SEXO,
        DT_NASCIMENTO: formatarData(pessoa.DT_NASCIMENTO),
        ESTADO_CIVIL: pessoa.ESTADO_CIVIL,
        NATURALIDADE: pessoa.NATURALIDADE,
        EMAIL: pessoa.EMAIL,
        NM_MODALIDADE: pessoa.NM_MODALIDADE,
        MEIO_LOCOMOCAO: pessoa.MEIO_LOCOMOCAO,
        CD_FUNCAO: pessoa.Funcao,
        ASSISTENCIA: pessoa.ASSISTENCIA,
        NM_PAI: pessoa.NM_PAI,
        CELULAR_PAI: formatarTelefone(pessoa.CELULAR_PAI),
        NM_MAE: pessoa.NM_MAE,
        CELULAR_MAE: formatarTelefone(pessoa.CELULAR_MAE),
        EMAIL_RESPONS: pessoa.EMAIL_RESPONS,
        NATURALIDADE_RESPONS: pessoa.NATURALIDADE_RESPONS,
        PESO: pessoa.PESO,
        ALTURA: pessoa.ALTURA,
        GP_SANGUE: pessoa.GP_SANGUE,
        RENDA: pessoa.RENDA,
        ESCOLARIDADE: pessoa.ESCOLARIDADE,
        INSTITUICAO: pessoa.INSTITUICAO,
        MATRICULA: pessoa.MATRICULA,
        TELEFONE_ESCOLA: formatarTelefone(pessoa.TELEFONE_ESCOLA),
        CPF: formatarCPF(pessoa.CPF),
        RG: formatarRG(pessoa.RG),
        UF_RG: pessoa.UF_RG,
        DT_EMISSAO_RG: formatarData(pessoa.DT_EMISSAO_RG),
        NR_PASSAPORTE: pessoa.NR_PASSAPORTE,
        CPF_RESPONS: formatarCPF(pessoa.CPF_RESPONS),
        RG_RESPONS: formatarRG(pessoa.RG_RESPONS),
        UF_RG_RESPONS: pessoa.UF_RG_RESPONS,
        DT_EMISSAO_RG_RESPONS: formatarData(pessoa.DT_EMISSAO_RG_RESPONS),
        NR_PASSAPORTE_RESPONS: pessoa.NR_PASSAPORTE_RESPONS,
        CEP: formatarCEP(pessoa.CEP),
        ENDERECO: pessoa.ENDERECO,
        NR_ENDERECO: pessoa.NR_ENDERECO,
        DS_ENDERECO: pessoa.DS_ENDERECO,
        CD_MODALIDADE: pessoa.CD_MODALIDADE,
        CLASSIF_FUNC: pessoa.CLASSIF_FUNC,
        PROVA: pessoa.PROVA,
        TAMANHO_CAMISA: pessoa.TAMANHO_CAMISA,
        TAMANHO_AGASALHO: pessoa.TAMANHO_AGASALHO,
        TAMANHO_BERM_CAL: pessoa.TAMANHO_BERM_CAL,
        NR_CALCADO: pessoa.NR_CALCADO,
        FOTO_ATLETA: pessoa.FOTO_ATLETA,
        FOTO_RG: pessoa.FOTO_RG,
        FOTO_RG_RESPONS: pessoa.FOTO_RG_RESPONS,
      }));

      // Enviar os dados formatados como JSON
      res.status(200).json(dadosFormatados);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar o usuário", erro: error.message });
    }
  }

  static async BuscarPorID(req, res) {
    const { CD_USUARIO } = req.params;

    try {
      const token = ObterToken(req);
      const user = await ObterUsuarioToken(token);

      const usuario = await PessoaFisica.findOne({
        where: { CD_USUARIO: user.CD_USUARIO },
      });

      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const usuarioFormatado = {
        CD_USUARIO: usuario.CD_USUARIO,
        NM_USUARIO: usuario.NM_USUARIO,
      };

      res.status(200).json({ usuario: usuarioFormatado });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar Usuário" });
    }
  }

  static async TodasAssociados(req, res) {
    try {
      const associados = await PessoaFisica.findAll();

      if (associados.length === 0) {
        return res
          .status(404)
          .json({ mensagem: "Não há nenhum associado cadastrado" });
      }

      const associadoFormatada = associados.map((associado) => ({
        CD_PESSOA_FISICA: associado.CD_PESSOA_FISICA,
        NM_PESSOA: associado.NM_PESSOA,
      }));

      res.status(200).json({ associados: associadoFormatada });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: "Erro ao buscar associado" });
    }
  }

  static async BuscarPorID(req, res) {
    try {
      const token = ObterToken(req);
      const user = await ObterUsuarioToken(token);

      const usuario = await PessoaFisica.findOne({
        where: { CD_USUARIO: user.CD_USUARIO },
      });

      if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      }

      const usuarioFormatado = {
        CD_USUARIO: usuario.CD_USUARIO,
      };

      res.status(200).json({ usuario: usuarioFormatado });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: "Erro ao buscar Usuário" });
    }
  }

  static async getTotalAssociados(req, res) {
    try {
      const totalAssociadosResult = await db.query(
        `SELECT count(*) as TOTAL FROM cepe.public."PESSOA_FISICA" pf WHERE 1 = 1`,
        { type: db.QueryTypes.SELECT }
      );

      res.status(200).json({ totalAssociados: totalAssociadosResult[0].total });
    } catch (error) {
      console.error("Erro ao buscar total de associados:", error);
      res.status(500).json({ error: "Erro ao buscar total de associados" });
    }
  }

  static async getModalidades(req, res) {
    try {
      const modalidadesResult = await db.query(
        `SELECT m."NM_MODALIDADE", 
                count(*) as TOTAL 
         FROM cepe.public."PESSOA_FISICA" pf 
         LEFT JOIN cepe.public."MODALIDADE" m ON pf."CD_MODALIDADE" = m."CD_MODALIDADE" 
         WHERE 1 = 1 
         GROUP BY m."NM_MODALIDADE" 
         ORDER BY TOTAL DESC`,
        { type: db.QueryTypes.SELECT }
      );

      const modalidades = modalidadesResult.map((modalidade) => ({
        NM_MODALIDADE: modalidade.NM_MODALIDADE,
        TOTAL: modalidade.total,
      }));

      res.status(200).json(modalidades);
    } catch (error) {
      console.error("Erro ao buscar modalidades:", error);
      res.status(500).json({ error: "Erro ao buscar modalidades" });
    }
  }

  static async getTotalTecnico(req, res) {
    const { CD_USUARIO } = req.params;

    try {
      const totalAssociadosResult = await db.query(
        `SELECT COUNT(am."CD_PESSOA_FISICA") AS TOTAL
         FROM cepe.public."TECNICO_MODALIDADE" tm
         LEFT JOIN cepe.public."MODALIDADE" m ON m."CD_MODALIDADE" = tm."CD_MODALIDADE"
         LEFT JOIN cepe.public."ATLETA_MODALIDADE" am ON tm."CD_MODALIDADE" = am."CD_MODALIDADE"
         WHERE 1 = 1
           AND tm."CD_USUARIO" = ${CD_USUARIO}`,
        { type: db.QueryTypes.SELECT }
      );

      res.status(200).json({ totalAssociados: totalAssociadosResult[0].total });
    } catch (error) {
      console.error("Erro ao buscar total de associados:", error);
      res.status(500).json({ error: "Erro ao buscar total de associados" });
    }
  }

  static async getModalidadesTecnico(req, res) {
    const { CD_USUARIO } = req.params;

    try {
      const modalidadesResult = await db.query(
        `SELECT COUNT(am."CD_PESSOA_FISICA") AS TOTAL,
                m."NM_MODALIDADE"
         FROM cepe.public."TECNICO_MODALIDADE" tm
         LEFT JOIN cepe.public."MODALIDADE" m ON m."CD_MODALIDADE" = tm."CD_MODALIDADE"
         LEFT JOIN cepe.public."ATLETA_MODALIDADE" am ON tm."CD_MODALIDADE" = am."CD_MODALIDADE"
         WHERE 1 = 1
           AND tm."CD_USUARIO" = ${CD_USUARIO}
         GROUP BY m."NM_MODALIDADE"
         ORDER BY TOTAL DESC`,
        { type: db.QueryTypes.SELECT }
      );

      const modalidades = modalidadesResult.map((modalidade) => ({
        NM_MODALIDADE: modalidade.NM_MODALIDADE,
        TOTAL: modalidade.total,
      }));

      res.status(200).json(modalidades);
    } catch (error) {
      console.error("Erro ao buscar modalidades:", error);
      res.status(500).json({ error: "Erro ao buscar modalidades" });
    }
  }
};
