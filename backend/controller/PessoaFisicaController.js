const PessoaFisica = require('../models/pessoa_fisica')
const Deficiencia = require('../models/deficiencia')
const DeficienciaPessoa = require('../models/DeficienciaPessoa')

const db = require('../db/conn')

// helpers
const { formatarData, formatarTelefone, formatarCPF, formatarRG, formatarCEP } = require('../helpers/FormatarDadosPessoa')
const { EmailValido, cpfValido, diferencaAnos } = require('../helpers/Validacoes')
const getToken = require('../helpers/ObterToken')
const getUserByToken = require('../helpers/ObterUsuarioToken')
module.exports = class PessoaFisicaController {

    // Criando o Cadastro da pessoa fisica no banco
    static async CadastPessoaFisica(req, res) {
        try {
            const token = getToken(req)
            const user = await getUserByToken(token) // Informações do usuário extraídas do token

            console.log(user)

            const { NM_PESSOA, NR_CELULAR, NR_TELEFONE, SEXO, DT_NASCIMENTO, ESTADO_CIVIL, NATURALIDADE,
                EMAIL, CD_EQUIPA_LOCOMOCAO, CD_DEFICIENCIA, MEIO_LOCOMOCAO, CD_FUNCAO, ASSISTENCIA,
                NM_PAI, CELULAR_PAI, NM_MAE, CELULAR_MAE, EMAIL_RESPONS, NATURALIDADE_RESPONS,
                PESO, ALTURA, GP_SANGUE, RENDA, ESCOLARIDADE, INSTITUICAO, MATRICULA, TELEFONE_ESCOLA, CPF, RG, UF_RG, DT_EMISSAO_RG,
                NR_PASSAPORTE, CPF_RESPONS, RG_RESPONS, UF_RG_RESPONS, DT_EMISSAO_RG_RESPONS,
                NR_PASSAPORTE_RESPONS, CEP, ENDERECO, NR_ENDERECO, DS_ENDERECO, CD_MODALIDADE, CLASSIF_FUNC,
                PROVA, TAMANHO_CAMISA, TAMANHO_AGASALHO, TAMANHO_BERM_CAL, NR_CALCADO } = req.body

            const { FOTO_ATLETA, FOTO_RG, FOTO_RG_RESPONS } = req.files

            await Deficiencia.findAll({ where: { CD_DEFICIENCIA: CD_DEFICIENCIA } });

            // Validações

            // Calculando a idade
            const idade = diferencaAnos(req.body.DT_NASCIMENTO);

            if (!NM_PESSOA) {
                res.status(422).json({ mensagem: 'O seu nome é obrigatório' })
                return
            }

            if (!NR_CELULAR) {
                res.status(422).json({ mensagem: 'O número de celular é obrigatório' })
                return
            }

            if (!SEXO) {
                res.status(422).json({ mensagem: 'O sexo é obrigatório' })
                return
            }

            if (!DT_NASCIMENTO) {
                res.status(422).json({ mensagem: 'A data de nascimento é obrigatória' })
                return
            }

            if (!ESTADO_CIVIL) {
                res.status(422).json({ mensagem: 'O estado civil é obrigatório' })
                return
            }

            if (!NATURALIDADE) {
                res.status(422).json({ mensagem: 'A naturalidade é obrigatória' })
                return
            }

            if (!EMAIL) {
                res.status(422).json({ mensagem: 'O email é obrigatório' })
                return
            }

            // if (!CD_EQUIPA_LOCOMOCAO) {
            //     res.status(422).json({ mensagem: 'O equipamento de locomoção é obrigatório'})
            //     return
            // }

            if (!CD_DEFICIENCIA) {
                res.status(422).json({ mensagem: 'A escolha de uma deficiencia é obrigatória' })
                return
            }

            if (!MEIO_LOCOMOCAO) {
                res.status(422).json({ mensagem: 'O meio de locomoção é obrigatório' })
                return
            }

            if (!CD_FUNCAO) {
                res.status(422).json({ mensagem: 'A função é obrigatória' })
                return
            }

            if (!ASSISTENCIA) {
                res.status(422).json({ mensagem: 'A opção de assistencia é obrigatória' })
                return
            }

            if (!NM_PAI) {
                res.status(422).json({ mensagem: 'O nome do pai é obrigatório' })
                return
            }

            if (!NM_MAE) {
                res.status(422).json({ mensagem: 'O nome do mãe é obrigatório' })
                return
            }

            if (idade < 18 && !CELULAR_PAI) {
                res.status(422).json({ mensagem: 'O número de celular do pai é obrigatório' })
                return
            }

            if (idade < 18 && !CELULAR_MAE) {
                res.status(422).json({ mensagem: 'O número do celular da mãe é obrigatório' })
                return
            }

            if (idade < 18 && !EMAIL_RESPONS) {
                res.status(422).json({ mensagem: 'O e-mail do responsável é obrigatório' })
                return
            }

            if (idade < 18 && !NATURALIDADE_RESPONS) {
                res.status(422).json({ mensagem: 'A naturalidade do responsável é obrigatório' })
                return
            }

            if (idade < 18 && !CPF_RESPONS) {
                res.status(422).json({ mensagem: 'O número do CPF do responsável é obrigatório' })
                return
            }

            if (idade < 18 && !RG_RESPONS) {
                res.status(422).json({ mensagem: 'O número do RG do responsável é obrigatório' })
                return
            }

            if (idade < 18 && !UF_RG_RESPONS) {
                res.status(422).json({ mensagem: 'O estado em que o RG do responsável foi emitido é obrigatório' })
                return
            }

            if (idade < 18 && !DT_EMISSAO_RG_RESPONS) {
                res.status(422).json({ mensagem: 'A data de emissão do RG do responsável é obrigatória' })
                return
            }

            if (!PESO) {
                res.status(422).json({ mensagem: 'O peso é obrigatório' })
                return
            }

            if (!ALTURA) {
                res.status(422).json({ mensagem: 'A altura é obrigatória' })
                return
            }

            if (!GP_SANGUE) {
                res.status(422).json({ mensagem: 'O grupo sanguíneo é obrigatório' })
                return
            }

            if (!RENDA) {
                res.status(422).json({ mensagem: 'A renda é obrigatória' })
                return
            }

            if (!ESCOLARIDADE) {
                res.status(422).json({ mensagem: 'A sua escolaridade é obrigatória' })
                return
            }

            if (!INSTITUICAO) {
                res.status(422).json({ mensagem: 'A instituição em que você estuda ou estudou é obrigatória' })
                return
            }

            if (idade < 18 && !TELEFONE_ESCOLA) {
                res.status(422).json({ mensagem: 'O telefone da instituição é obrigatório' })
                return
            }

            if (!CPF) {
                res.status(422).json({ mensagem: 'O seu numero de CPF é obrigatório' })
                return
            }

            if (!RG) {
                res.status(422).json({ mensagem: 'O seu numero de RG é obrigatório' })
                return
            }

            if (!UF_RG) {
                res.status(422).json({ mensagem: 'O estado em que o RG foi emitido é obrigatório' })
                return
            }

            if (!DT_EMISSAO_RG) {
                res.status(422).json({ mensagem: 'A data de emissão do RG é obrigatória' })
                return
            }

            if (!CEP) {
                res.status(422).json({ mensagem: 'O número do cep é obrigatório' })
                return
            }

            if (!ENDERECO) {
                res.status(422).json({ mensagem: 'O endereço é obrigatório' })
                return
            }

            if (!NR_ENDERECO) {
                res.status(422).json({ mensagem: 'O número do endereço é obrigatório' })
                return
            }

            if (!CLASSIF_FUNC) {
                res.status(422).json({ mensagem: 'A classificação funcional é obrigatória' })
                return
            }

            if (!CD_MODALIDADE) {
                res.status(422).json({ mensagem: 'A modalidade é obrigatória' })
                return
            }

            if (!PROVA) {
                res.status(422).json({ mensagem: 'A prova é obrigatória' })
                return
            }

            if (!TAMANHO_CAMISA) {
                res.status(422).json({ mensagem: 'O tamanho da camisa é obrigatória' })
                return
            }

            if (!TAMANHO_AGASALHO) {
                res.status(422).json({ mensagem: 'O tamanho do agasalho é obrigatório' })
                return
            }

            if (!TAMANHO_BERM_CAL) {
                res.status(422).json({ mensagem: 'O tamanho da bermuda/calça é obrigatório' })
                return
            }

            if (!NR_CALCADO) {
                res.status(422).json({ mensagem: 'O número do calçado é obrigatório' })
                return
            }

            if (!FOTO_ATLETA) {
                res.status(422).json({ mensagem: 'A foto do associado é obrigatória' })
                return
            }

            if (!FOTO_RG) {
                res.status(422).json({ mensagem: 'A foto do RG é obrigatória' })
                return
            }

            if (idade < 18 && !FOTO_RG_RESPONS) {
                res.status(422).json({ mensagem: 'A foto do RG do responsável é obrigatória' })
                return
            }

            if (!EmailValido(EMAIL)) {
                res.status(422).json({ mensagem: 'Esta e-mail não é válido' })
                return
            }

            if (!EmailValido(EMAIL_RESPONS)) {
                res.status(422).json({ mensagem: 'Esta e-mail não é válido' })
                return
            }

            if (!cpfValido(CPF)) {
                res.status(422).json({ mensagem: 'Este CPF não é válido' });
                return;
            }

            // //Consulta se o CPF já está cadastrado no banco de dados
            // const cpfSemPontuacao = req.body.CPF.replace(/\D/g, '');
            // const CPFemUso = await PessoaFisica.findOne({ where: { CPF: cpfSemPontuacao } });
            // if (CPFemUso) {
            //     return res.status(422).json({ mensagem: 'Este CPF já está sendo utilizado!' });
            // }

            // // Consulta se o RG já está cadastrado no banco de dados
            // const RGSemPontuacao = req.body.RG.replace(/\D/g, '');
            // const RGemUso = await PessoaFisica.findOne({ where: { RG: RGSemPontuacao } });
            // if (RGemUso) {
            //     return res.status(422).json({ mensagem: 'Este RG já está sendo utilizado!' });
            // }

            // Inserindo os dados
            const pessoaFisica = {
                NM_PESSOA,
                NR_CELULAR: NR_CELULAR ? NR_CELULAR.toString().match(/\d/g).join("") : null,
                NR_TELEFONE, SEXO, DT_NASCIMENTO,
                ESTADO_CIVIL, NATURALIDADE, EMAIL, CD_EQUIPA_LOCOMOCAO,
                MEIO_LOCOMOCAO, CD_FUNCAO, ASSISTENCIA, NM_PAI,
                CELULAR_PAI: CELULAR_PAI ? CELULAR_PAI.toString().match(/\d/g).join("") : null,
                NM_MAE,
                CELULAR_MAE: CELULAR_MAE ? CELULAR_MAE.toString().match(/\d/g).join("") : null,
                EMAIL_RESPONS, NATURALIDADE_RESPONS,
                PESO, ALTURA, GP_SANGUE, RENDA, ESCOLARIDADE, INSTITUICAO, MATRICULA,
                TELEFONE_ESCOLA: TELEFONE_ESCOLA ? TELEFONE_ESCOLA.toString().match(/\d/g).join("") : null,
                CPF: CPF ? CPF.toString().match(/\d/g).join("") : null,
                RG: RG ? RG.toString().match(/\d/g).join("") : null,
                UF_RG, DT_EMISSAO_RG,
                NR_PASSAPORTE: NR_PASSAPORTE ? NR_PASSAPORTE.toString().match(/\d/g).join("") : null,
                CPF_RESPONS: CPF_RESPONS ? CPF_RESPONS.toString().match(/\d/g).join("") : null,
                RG_RESPONS: RG_RESPONS ? RG_RESPONS.toString().match(/\d/g).join("") : null,
                UF_RG_RESPONS, DT_EMISSAO_RG_RESPONS,
                NR_PASSAPORTE_RESPONS: NR_PASSAPORTE_RESPONS ? NR_PASSAPORTE_RESPONS.toString().match(/\d/g).join("") : null,
                CEP: CEP ? CEP.toString().match(/\d/g).join("") : null,
                ENDERECO, NR_ENDERECO,
                DS_ENDERECO, CD_MODALIDADE, CLASSIF_FUNC, PROVA, TAMANHO_CAMISA,
                TAMANHO_AGASALHO, TAMANHO_BERM_CAL, NR_CALCADO,
                FOTO_ATLETA: FOTO_ATLETA[0].filename,
                FOTO_RG: FOTO_RG[0].filename,
                FOTO_RG_RESPONS: req.files.FOTO_RG_RESPONS ? req.files.FOTO_RG_RESPONS[0].filename : null,
                CD_USUARIO: user.CD_USUARIO
            }

            await PessoaFisica.create(pessoaFisica)

            for (const CD_DEFICIENCIA of req.body.CD_DEFICIENCIA) {
                // Associar deficiências ao usuário
                await DeficienciaPessoa.create({
                    CD_PESSOA_FISICA: pessoaFisica.CD_PESSOA_FISICA,
                    CD_DEFICIENCIA: CD_DEFICIENCIA
                });
            }

            return res.status(201).json({ mensagem: 'Pessoa física cadastrada com sucesso' });
        } catch (error) {
            return res.status(500).json({ mensagem: 'Erro ao cadastrar pessoa física', erro: error.message });
        }
    }

    static async TodosCadastratos(req, res) {

        try {
            const pessoas = await db.query(
                `
                    SELECT pf.FOTO_ATLETA,
                           pf.NM_PESSOA,
                           pf.CPF,
                           GROUP_CONCAT(d.TP_DEFICIENCIA ORDER BY d.TP_DEFICIENCIA SEPARATOR ',') AS deficiencia,
                           'futebol de 7' as modalidade,
                           'atleta' as funcao
                           FROM pessoa_fisicas pf
                    JOIN deficiencia_pessoas dp ON pf.CD_PESSOA_FISICA = dp.CD_PESSOA_FISICA
                    JOIN deficiencia d ON dp.CD_DEFICIENCIA = d.CD_DEFICIENCIA
                    GROUP BY pf.CD_PESSOA_FISICA
                `,
                { type: db.QueryTypes.SELECT });

            const dadosFormatados = pessoas.map(pessoa => ({
                FOTO_ATLETA: pessoa.FOTO_ATLETA,
                CPF: formatarCPF(pessoa.CPF),
                NM_PESSOA: pessoa.NM_PESSOA,
                deficiencia: pessoa.deficiencia
            }));

            res.status(200).json({ pessoas: dadosFormatados });
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro ao buscar os associados.', erro: error.message });
        }
    }

    static async editarPessoaFisica(req, res) {
        const { CD_PESSOA_FISICA } = req.params

        try {
            // Verificando se o usuário existe
            const token = getToken(req)
            const user = await getUserByToken(token)

            const pessoaFisica = await PessoaFisica.findByPk(CD_PESSOA_FISICA)

            if (!pessoaFisica) {
                return res.status(404).json({ mensagem: 'Pessoa física não encontrada' });
            }

            // Verifica se o usuário logado tem permissão para editar essa pessoa física
            if (pessoaFisica.CD_USUARIO !== user.CD_USUARIO) {
                return res.status(403).json({ mensagem: 'Usuário não autorizado' });
            }

            // Realiza as atualizações necessárias
            const {
                NM_PESSOA, NR_CELULAR, NR_TELEFONE, SEXO, DT_NASCIMENTO, ESTADO_CIVIL, NATURALIDADE,
                EMAIL, CD_EQUIPA_LOCOMOCAO, CD_DEFICIENCIA, MEIO_LOCOMOCAO, CD_FUNCAO, ASSISTENCIA,
                NM_PAI, CELULAR_PAI, NM_MAE, CELULAR_MAE, EMAIL_RESPONS, NATURALIDADE_RESPONS,
                PESO, ALTURA, GP_SANGUE, RENDA, ESCOLARIDADE, INSTITUICAO, MATRICULA, TELEFONE_ESCOLA, CPF, RG, UF_RG, DT_EMISSAO_RG,
                NR_PASSAPORTE, CPF_RESPONS, RG_RESPONS, UF_RG_RESPONS, DT_EMISSAO_RG_RESPONS,
                NR_PASSAPORTE_RESPONS, CEP, ENDERECO, NR_ENDERECO, DS_ENDERECO, CD_MODALIDADE, CLASSIF_FUNC,
                PROVA, TAMANHO_CAMISA, TAMANHO_AGASALHO, TAMANHO_BERM_CAL, NR_CALCADO
            } = req.body

            const { FOTO_ATLETA, FOTO_RG, FOTO_RG_RESPONS } = req.files

            // Validações

            // Calculando a idade
            const idade = diferencaAnos(req.body.DT_NASCIMENTO);

            if (!NM_PESSOA) {
                res.status(422).json({ mensagem: 'O seu nome é obrigatório' })
                return
            }

            pessoaFisica.NM_PESSOA = NM_PESSOA

            if (!NR_CELULAR) {
                res.status(422).json({ mensagem: 'O número de celular é obrigatório' })
                return
            }

            pessoaFisica.NR_CELULAR = NR_CELULAR

            if (!SEXO) {
                res.status(422).json({ mensagem: 'O sexo é obrigatório' })
                return
            }

            pessoaFisica.SEXO = SEXO

            if (!DT_NASCIMENTO) {
                res.status(422).json({ mensagem: 'A data de nascimento é obrigatória' })
                return
            }

            pessoaFisica.DT_NASCIMENTO = DT_NASCIMENTO

            if (!ESTADO_CIVIL) {
                res.status(422).json({ mensagem: 'O estado civil é obrigatório' })
                return
            }

            pessoaFisica.ESTADO_CIVIL = ESTADO_CIVIL

            if (!NATURALIDADE) {
                res.status(422).json({ mensagem: 'A naturalidade é obrigatória' })
                return
            }

            pessoaFisica.NATURALIDADE = NATURALIDADE

            if (!EMAIL) {
                res.status(422).json({ mensagem: 'O email é obrigatório' })
                return
            }

            pessoaFisica.EMAIL = EMAIL

            // if (!CD_EQUIPA_LOCOMOCAO) {
            //     res.status(422).json({ mensagem: 'O equipamento de locomoção é obrigatório'})
            //     return
            // }

            if (!CD_DEFICIENCIA) {
                res.status(422).json({ mensagem: 'A escolha de uma deficiencia é obrigatória' })
                return
            }

            pessoaFisica.CD_DEFICIENCIA = CD_DEFICIENCIA

            if (!MEIO_LOCOMOCAO) {
                res.status(422).json({ mensagem: 'O meio de locomoção é obrigatório' })
                return
            }

            pessoaFisica.MEIO_LOCOMOCAO = MEIO_LOCOMOCAO

            if (!CD_FUNCAO) {
                res.status(422).json({ mensagem: 'A função é obrigatória' })
                return
            }

            pessoaFisica.CD_FUNCAO = CD_FUNCAO

            if (!ASSISTENCIA) {
                res.status(422).json({ mensagem: 'A opção de assistencia é obrigatória' })
                return
            }

            pessoaFisica.ASSISTENCIA = ASSISTENCIA

            if (!NM_PAI) {
                res.status(422).json({ mensagem: 'O nome do pai é obrigatório' })
                return
            }

            pessoaFisica.NM_PAI = NM_PAI

            if (!NM_MAE) {
                res.status(422).json({ mensagem: 'O nome do mãe é obrigatório' })
                return
            }

            pessoaFisica.NM_MAE = NM_MAE

            if (idade < 18 && !CELULAR_PAI) {
                res.status(422).json({ mensagem: 'O número de celular do pai é obrigatório' })
                return
            }

            pessoaFisica.CELULAR_PAI = CELULAR_PAI

            if (idade < 18 && !CELULAR_MAE) {
                res.status(422).json({ mensagem: 'O número do celular da mãe é obrigatório' })
                return
            }

            pessoaFisica.CELULAR_MAE = CELULAR_MAE

            if (idade < 18 && !EMAIL_RESPONS) {
                res.status(422).json({ mensagem: 'O e-mail do responsável é obrigatório' })
                return
            }

            pessoaFisica.EMAIL_RESPONS = EMAIL_RESPONS

            if (idade < 18 && !NATURALIDADE_RESPONS) {
                res.status(422).json({ mensagem: 'A naturalidade do responsável é obrigatório' })
                return
            }

            pessoaFisica.NATURALIDADE_RESPONS = NATURALIDADE_RESPONS

            if (idade < 18 && !CPF_RESPONS) {
                res.status(422).json({ mensagem: 'O número do CPF do responsável é obrigatório' })
                return
            }

            pessoaFisica.CPF_RESPONS = CPF_RESPONS

            if (idade < 18 && !RG_RESPONS) {
                res.status(422).json({ mensagem: 'O número do RG do responsável é obrigatório' })
                return
            }

            pessoaFisica.RG_RESPONS = RG_RESPONS

            if (idade < 18 && !UF_RG_RESPONS) {
                res.status(422).json({ mensagem: 'O estado em que o RG do responsável foi emitido é obrigatório' })
                return
            }

            pessoaFisica.UF_RG_RESPONS = UF_RG_RESPONS

            if (idade < 18 && !DT_EMISSAO_RG_RESPONS) {
                res.status(422).json({ mensagem: 'A data de emissão do RG do responsável é obrigatória' })
                return
            }

            pessoaFisica.DT_EMISSAO_RG_RESPONS = DT_EMISSAO_RG_RESPONS

            if (!PESO) {
                res.status(422).json({ mensagem: 'O peso é obrigatório' })
                return
            }

            pessoaFisica.PESO = PESO

            if (!ALTURA) {
                res.status(422).json({ mensagem: 'A altura é obrigatória' })
                return
            }

            pessoaFisica.ALTURA = ALTURA

            if (!GP_SANGUE) {
                res.status(422).json({ mensagem: 'O grupo sanguíneo é obrigatório' })
                return
            }

            pessoaFisica.GP_SANGUE = GP_SANGUE

            if (!RENDA) {
                res.status(422).json({ mensagem: 'A renda é obrigatória' })
                return
            }

            pessoaFisica.RENDA = RENDA

            if (!ESCOLARIDADE) {
                res.status(422).json({ mensagem: 'A sua escolaridade é obrigatória' })
                return
            }

            pessoaFisica.ESCOLARIDADE = ESCOLARIDADE

            if (!INSTITUICAO) {
                res.status(422).json({ mensagem: 'A instituição em que você estuda ou estudou é obrigatória' })
                return
            }

            pessoaFisica.INSTITUICAO = INSTITUICAO

            if (idade < 18 && !TELEFONE_ESCOLA) {
                res.status(422).json({ mensagem: 'O telefone da instituição é obrigatório' })
                return
            }

            pessoaFisica.TELEFONE_ESCOLA = TELEFONE_ESCOLA

            if (!CPF) {
                res.status(422).json({ mensagem: 'O seu numero de CPF é obrigatório' })
                return
            }

            pessoaFisica.CPF = CPF

            if (!RG) {
                res.status(422).json({ mensagem: 'O seu numero de RG é obrigatório' })
                return
            }

            pessoaFisica.RG = RG

            if (!UF_RG) {
                res.status(422).json({ mensagem: 'O estado em que o RG foi emitido é obrigatório' })
                return
            }

            pessoaFisica.UF_RG = UF_RG

            if (!DT_EMISSAO_RG) {
                res.status(422).json({ mensagem: 'A data de emissão do RG é obrigatória' })
                return
            }

            pessoaFisica.DT_EMISSAO_RG = DT_EMISSAO_RG

            if (!CEP) {
                res.status(422).json({ mensagem: 'O número do cep é obrigatório' })
                return
            }

            pessoaFisica.CEP = CEP

            if (!ENDERECO) {
                res.status(422).json({ mensagem: 'O endereço é obrigatório' })
                return
            }

            pessoaFisica.ENDERECO = ENDERECO

            if (!NR_ENDERECO) {
                res.status(422).json({ mensagem: 'O número do endereço é obrigatório' })
                return
            }

            pessoaFisica.NR_ENDERECO = NR_ENDERECO

            if (!CLASSIF_FUNC) {
                res.status(422).json({ mensagem: 'A classificação funcional é obrigatória' })
                return
            }

            pessoaFisica.CLASSIF_FUNC = CLASSIF_FUNC

            if (!CD_MODALIDADE) {
                res.status(422).json({ mensagem: 'A modalidade é obrigatória' })
                return
            }

            pessoaFisica.CD_MODALIDADE = CD_MODALIDADE

            if (!PROVA) {
                res.status(422).json({ mensagem: 'A prova é obrigatória' })
                return
            }

            pessoaFisica.PROVA = PROVA

            if (!TAMANHO_CAMISA) {
                res.status(422).json({ mensagem: 'O tamanho da camisa é obrigatória' })
                return
            }

            pessoaFisica.TAMANHO_CAMISA = TAMANHO_CAMISA

            if (!TAMANHO_AGASALHO) {
                res.status(422).json({ mensagem: 'O tamanho do agasalho é obrigatório' })
                return
            }

            pessoaFisica.TAMANHO_AGASALHO = TAMANHO_AGASALHO

            if (!TAMANHO_BERM_CAL) {
                res.status(422).json({ mensagem: 'O tamanho da bermuda/calça é obrigatório' })
                return
            }

            pessoaFisica.TAMANHO_BERM_CAL = TAMANHO_BERM_CAL

            if (!NR_CALCADO) {
                res.status(422).json({ mensagem: 'O número do calçado é obrigatório' })
                return
            }

            pessoaFisica.NR_CALCADO = NR_CALCADO

            if (!FOTO_ATLETA) {
                res.status(422).json({ mensagem: 'A foto do associado é obrigatória' })
                return
            }

            pessoaFisica.FOTO_ATLETA = FOTO_ATLETA

            if (!FOTO_RG) {
                res.status(422).json({ mensagem: 'A foto do RG é obrigatória' })
                return
            }

            pessoaFisica.FOTO_RG = FOTO_RG

            if (idade < 18 && !FOTO_RG_RESPONS) {
                res.status(422).json({ mensagem: 'A foto do RG do responsável é obrigatória' })
                return
            }

            pessoaFisica.FOTO_RG_RESPONS = FOTO_RG_RESPONS

            if (!EmailValido(EMAIL)) {
                res.status(422).json({ mensagem: 'Esta e-mail não é válido' })
                return
            }

            if (!EmailValido(EMAIL_RESPONS)) {
                res.status(422).json({ mensagem: 'Esta e-mail não é válido' })
                return
            }

            if (!cpfValido(CPF)) {
                res.status(422).json({ mensagem: 'Este CPF não é válido' });
                return;
            }

            // //Consulta se o CPF já está cadastrado no banco de dados
            // const cpfSemPontuacao = req.body.CPF.replace(/\D/g, '');
            // const CPFemUso = await PessoaFisica.findOne({ where: { CPF: cpfSemPontuacao } });
            // if (CPFemUso) {
            //     return res.status(422).json({ mensagem: 'Este CPF já está sendo utilizado!' });
            // }

            // // Consulta se o RG já está cadastrado no banco de dados
            // const RGSemPontuacao = req.body.RG.replace(/\D/g, '');
            // const RGemUso = await PessoaFisica.findOne({ where: { RG: RGSemPontuacao } });
            // if (RGemUso) {
            //     return res.status(422).json({ mensagem: 'Este RG já está sendo utilizado!' });
            // }

            // Atualiza os campos necessários
            await pessoaFisica.update({
                NM_PESSOA,
                NR_CELULAR: NR_CELULAR ? NR_CELULAR.toString().match(/\d/g).join("") : null,
                NR_TELEFONE, SEXO, DT_NASCIMENTO,
                ESTADO_CIVIL, NATURALIDADE, EMAIL, CD_EQUIPA_LOCOMOCAO,
                MEIO_LOCOMOCAO, CD_FUNCAO, ASSISTENCIA, NM_PAI,
                CELULAR_PAI: CELULAR_PAI ? CELULAR_PAI.toString().match(/\d/g).join("") : null,
                NM_MAE,
                CELULAR_MAE: CELULAR_MAE ? CELULAR_MAE.toString().match(/\d/g).join("") : null,
                EMAIL_RESPONS, NATURALIDADE_RESPONS,
                PESO, ALTURA, GP_SANGUE, RENDA, ESCOLARIDADE, INSTITUICAO, MATRICULA,
                TELEFONE_ESCOLA: TELEFONE_ESCOLA ? TELEFONE_ESCOLA.toString().match(/\d/g).join("") : null,
                CPF: CPF ? CPF.toString().match(/\d/g).join("") : null,
                RG: RG ? RG.toString().match(/\d/g).join("") : null,
                UF_RG, DT_EMISSAO_RG,
                NR_PASSAPORTE: NR_PASSAPORTE ? NR_PASSAPORTE.toString().match(/\d/g).join("") : null,
                CPF_RESPONS: CPF_RESPONS ? CPF_RESPONS.toString().match(/\d/g).join("") : null,
                RG_RESPONS: RG_RESPONS ? RG_RESPONS.toString().match(/\d/g).join("") : null,
                UF_RG_RESPONS, DT_EMISSAO_RG_RESPONS,
                NR_PASSAPORTE_RESPONS: NR_PASSAPORTE_RESPONS ? NR_PASSAPORTE_RESPONS.toString().match(/\d/g).join("") : null,
                CEP: CEP ? CEP.toString().match(/\d/g).join("") : null,
                ENDERECO, NR_ENDERECO,
                DS_ENDERECO, CD_MODALIDADE, CLASSIF_FUNC, PROVA, TAMANHO_CAMISA,
                TAMANHO_AGASALHO, TAMANHO_BERM_CAL, NR_CALCADO,
                FOTO_ATLETA: FOTO_ATLETA[0].filename,
                FOTO_RG: FOTO_RG[0].filename,
                FOTO_RG_RESPONS: FOTO_RG_RESPONS[0].filename
            });

            // Atualizar deficiências associadas
            await DeficienciaPessoa.destroy({ where: { CD_PESSOA_FISICA: pessoaFisica.CD_PESSOA_FISICA } });
            for (const CD_DEFICIENCIA of req.body.CD_DEFICIENCIA) {
                await DeficienciaPessoa.create({
                    CD_PESSOA_FISICA: pessoaFisica.CD_PESSOA_FISICA,
                    CD_DEFICIENCIA: CD_DEFICIENCIA
                });
            }

            return res.status(200).json({ mensagem: 'Pessoa física atualizada com sucesso' });
        } catch (error) {
            return res.status(500).json({ mensagem: 'Erro ao atualizar pessoa física', erro: error.message });
        }
    }

    static async excluirPessoaId(req, res) {
        const { CD_PESSOA_FISICA } = req.params

        try {
            // Verificando se o usuário existe

            const pessoaFisica = await PessoaFisica.findByPk(CD_PESSOA_FISICA)

            if (!pessoaFisica) {
                return res.status(404).json({ mensagem: 'Pessoa física não encontrada' })
            }

            // Deleta o registro
            await pessoaFisica.destroy(pessoaFisica);

            return res.status(200).json({ mensagem: 'Pessoa física excluída com sucesso' });
        } catch (error) {
            return res.status(500).json({ mensagem: 'Erro ao excluir pessoa física', erro: error.message });
        }
    }
}