const PessoaFisica = require('../models/pessoa_fisica')
const Deficiencia = require('../models/deficiencia');
const DeficienciaPessoa = require('../models/DeficienciaPessoa')
const Modalidade = require('../models/modalidade')
const ModalidadePessoa = require('../models/ModalidadePessoa')
const db = require('../db/conn');

// helpers
const { formatarData, formatarTelefone, formatarCPF, formatarRG, formatarCEP } = require('../helpers/FormatarDadosPessoa')

module.exports = class PessoaFisicaController {

    // Criando o Cadastro da pessoa fisica no banco
    static async CadastPessoaFisica(req, res) {

        const { NM_PESSOA, NR_CELULAR, NR_TELEFONE, SEXO, DT_NASCIMENTO, ESTADO_CIVIL, NATURALIDADE,
            EMAIL, /*CD_EQUIPA_LOCOMOCAO,*/ CD_DEFICIENCIA, MEIO_LOCOMOCAO, /*CD_FUNCAO,*/ ASSISTENCIA,
            NM_PAI, CELULAR_PAI, NM_MAE, CELULAR_MAE, EMAIL_RESPONS, NATURALIDADE_RESPONS,
            PESO, ALTURA, RENDA, INSTITUICAO, MATRICULA, TELEFONE_ESCOLA, CPF, RG, UF_RG, DT_EMISSAO_RG,
            NR_PASSAPORTE, CPF_RESPONS, RG_RESPONS, UF_RG_RESPONS, DT_EMISSAO_RG_RESPONS,
            NR_PASSAPORTE_RESPONS, CEP, ENDERECO, NR_ENDERECO, DS_ENDERECO, /*CD_MODALIDEDADE,*/ CLASSIF_FUNC,
            PROVA, TAMANHO_CAMISA, TAMANHO_AGASALHO, TAMANHO_BERM_CAL, NR_CALCADO } = req.body

        const { FOTO_ATLETA, FOTO_RG, FOTO_RG_RESPONS } = req.files

        await Deficiencia.findAll({ where: { CD_DEFICIENCIA: CD_DEFICIENCIA } });

        // await Modalidade.findAll({ where: { CD_MODALIDEDADE: CD_MODALIDEDADE } });

        // Validações

        // Função para calcular a diferença em anos entre duas datas
        function diferencaAnos(dataNascimento) {
            // Convertendo a data de nascimento para um objeto Date
            const dtNascimento = new Date(dataNascimento);
            const dtAtual = new Date();

            // Calculando a diferença em milissegundos
            const diffMs = dtAtual - dtNascimento;

            // Convertendo a diferença de milissegundos para anos
            const diffYears = Math.abs(dtAtual.getFullYear() - dtNascimento.getFullYear());

            // Verificando se a segunda data ainda não ocorreu no ano atual
            if (dtAtual.getMonth() < dtNascimento.getMonth() || (dtAtual.getMonth() === dtNascimento.getMonth() && dtAtual.getDate() < dtNascimento.getDate())) {
                return diffYears - 1;
            }

            return diffYears;
        }

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

        // if (!CD_FUNCAO) {
        //     res.status(422).json({ mensagem: 'A função é obrigatória'})
        //     return
        // }

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

        if (!RENDA) {
            res.status(422).json({ mensagem: 'A renda é obrigatória' })
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

        // if (!CD_MODALIDEDADE) {
        //     res.status(422).json({ mensagem: 'A modalidade é obrigatória'})
        //     return
        // }

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

        //Validação se o CPF valido
        function isValidCPF(cpf) {
            // Validar se é String
            if (typeof cpf !== 'string') return false

            // Tirar formatação
            cpf = cpf.replace(/[^\d]+/g, '')

            // Validar se tem tamanho 11 ou se é uma sequência de digitos repetidos
            if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false

            // String para Array
            cpf = cpf.split('')

            const validator = cpf
                // Pegar os últimos 2 digitos de validação
                .filter((digit, index, array) => index >= array.length - 2 && digit)
                // Transformar digitos em números
                .map(el => +el)

            const toValidate = pop => cpf
                // Pegar Array de items para validar
                .filter((digit, index, array) => index < array.length - pop && digit)
                // Transformar digitos em números
                .map(el => +el)

            const rest = (count, pop) => (toValidate(pop)
                // Calcular Soma dos digitos e multiplicar por 10
                .reduce((soma, el, i) => soma + el * (count - i), 0) * 10)
                // Pegar o resto por 11
                % 11
                // transformar de 10 para 0
                % 10

            return !(rest(10, 2) !== validator[0] || rest(11, 1) !== validator[1])
        }

        if (!isValidCPF(CPF)) {
            res.status(422).json({ mensagem: 'Este CPF não é válido' });
            return;
        }

        //Consulta se o CPF já está cadastrado no banco de dados
        const cpfSemPontuacao = req.body.CPF.replace(/\D/g, '');
        const CPFemUso = await PessoaFisica.findOne({ where: { CPF: cpfSemPontuacao } });
        if (CPFemUso) {
            return res.status(422).json({ mensagem: 'Este CPF já está sendo utilizado!' });
        }

        // Consulta se o RG já está cadastrado no banco de dados
        const RGSemPontuacao = req.body.RG.replace(/\D/g, '');
        const RGemUso = await PessoaFisica.findOne({ where: { RG: RGSemPontuacao } });
        if (RGemUso) {
            return res.status(422).json({ mensagem: 'Este RG já está sendo utilizado!' });
        }

        try {
            // Inserindo os dados
            const pessoaFisica = await PessoaFisica.create({
                NM_PESSOA,
                NR_CELULAR: NR_CELULAR ? NR_CELULAR.toString().match(/\d/g).join("") : null,
                NR_TELEFONE, SEXO, DT_NASCIMENTO,
                ESTADO_CIVIL, NATURALIDADE, EMAIL, /*CD_EQUIPA_LOCOMOCAO,*/
                MEIO_LOCOMOCAO, /*CD_FUNCAO,*/ ASSISTENCIA, NM_PAI,
                CELULAR_PAI: CELULAR_PAI ? CELULAR_PAI.toString().match(/\d/g).join("") : null,
                NM_MAE,
                CELULAR_MAE: CELULAR_MAE ? CELULAR_MAE.toString().match(/\d/g).join("") : null,
                EMAIL_RESPONS, NATURALIDADE_RESPONS,
                PESO, ALTURA, RENDA, INSTITUICAO, MATRICULA,
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
                DS_ENDERECO, CLASSIF_FUNC, PROVA, TAMANHO_CAMISA,
                TAMANHO_AGASALHO, TAMANHO_BERM_CAL, NR_CALCADO,
                FOTO_ATLETA: FOTO_ATLETA[0].filename,
                FOTO_RG: FOTO_RG[0].filename,
                FOTO_RG_RESPONS: req.files.FOTO_RG_RESPONS ? req.files.FOTO_RG_RESPONS[0].filename : null
            })

            for (const CD_DEFICIENCIA of req.body.CD_DEFICIENCIA) {
                // Associar deficiências ao usuário
                await DeficienciaPessoa.create({
                    CD_PESSOA_FISICA: pessoaFisica.CD_PESSOA_FISICA,
                    CD_DEFICIENCIA: CD_DEFICIENCIA
                });
            }

            // for (const CD_MODALIDEDADE of req.body.CD_MODALIDEDADE) {
            //     // Associar modalidade ao usuário
            //     await ModalidadePessoa.create({
            //         CD_PESSOA_FISICA: pessoaFisica.CD_PESSOA_FISICA,
            //         CD_MODALIDEDADE: CD_MODALIDEDADE
            //     });
            // }

            return res.status(201).json({ mensagem: 'Pessoa física cadastrada com sucesso' });
        } catch (error) {
            return res.status(500).json({ mensagem: 'Erro ao cadastrar pessoa física', erro: error.message });
        }
    }

    static async TodosCadastratos(req, res) {

        try {
            // Fazendo um join entre as tabelas PessoaFisica e a tabela de deficiência
            const pessoas = await db.query(
                `
                    SELECT pf.*,
                           d.TP_DEFICIENCIA   -- Ou os campos específicos que você deseja da tabela Deficiencia
                    FROM pessoa_fisicas pf
                    LEFT JOIN deficiencia_pessoas dp ON pf.CD_PESSOA_FISICA = dp.CD_PESSOA_FISICA
                    LEFT JOIN deficiencia d ON dp.CD_DEFICIENCIA = d.CD_DEFICIENCIA
                `, 
                { type: db.QueryTypes.SELECT });


            const dadosFormatados = pessoas.map(pessoa => ({
                NM_PESSOA: pessoa.NM_PESSOA,
                NR_CELULAR: formatarTelefone(pessoa.NR_CELULAR),
                NR_TELEFONE: formatarTelefone(pessoa.NR_TELEFONE),
                SEXO: pessoa.SEXO,
                DT_NASCIMENTO: formatarData(pessoa.DT_NASCIMENTO),
                ESTADO_CIVIL: pessoa.ESTADO_CIVIL,
                NATURALIDADE: pessoa.NATURALIDADE,
                EMAIL: pessoa.EMAIL,
                /*CD_EQUIPA_LOCOMOCAO,*/
                TP_DEFICIENCIA: pessoa.TP_DEFICIENCIA,
                MEIO_LOCOMOCAO: pessoa.MEIO_LOCOMOCAO,
                /*CD_FUNCAO,*/
                ASSISTENCIA: pessoa.ASSISTENCIA,
                NM_PAI: pessoa.NM_PAI,
                CELULAR_PAI: formatarTelefone(pessoa.CELULAR_PAI),
                NM_MAE: pessoa.NM_MAE,
                CELULAR_MAE: formatarTelefone(pessoa.CELULAR_MAE),
                EMAIL_RESPONS: pessoa.EMAIL,
                NATURALIDADE_RESPONS: pessoa.NATURALIDADE_RESPONS,
                PESO: pessoa.PESO,
                ALTURA: pessoa.ALTURA,
                RENDA: pessoa.RENDA,
                INSTITUICAO: pessoa.INSTITUICAO,
                MATRICULA: pessoa.MATRICULA,
                TELEFONE_ESCOLA: formatarTelefone(pessoa.TELEFONE_ESCOLA),
                CPF: formatarCPF(pessoa.CPF),
                RG: formatarRG(pessoa.RG),
                UF_RG: pessoa.UF_RG,
                DT_EMISSAO_RG: formatarData(pessoa.DT_EMISSAO_RG),
                NR_PASSAPORTE: pessoa.NR_PASSAPORTE,
                CPF_RESPONS: formatarCPF.CPF_RESPONS,
                RG_RESPONS: formatarRG(pessoa.RG_RESPONS),
                UF_RG_RESPONS: pessoa.UF_RG_RESPONS,
                DT_EMISSAO_RG_RESPONS: formatarData(pessoa.DT_EMISSAO_RG_RESPONS),
                NR_PASSAPORTE_RESPONS: pessoa.NR_PASSAPORTE_RESPONS,
                CEP: formatarCEP(pessoa.CEP),
                ENDERECO: pessoa.ENDERECO,
                NR_ENDERECO: pessoa.NR_ENDERECO,
                DS_ENDERECO: pessoa.DS_ENDERECO,
                /*CD_MODALIDEDADE,*/
                CLASSIF_FUNC: pessoa.CLASSIF_FUNC,
                PROVA: pessoa.PROVA,
                TAMANHO_CAMISA: pessoa.TAMANHO_CAMISA,
                TAMANHO_AGASALHO: pessoa.TAMANHO_AGASALHO,
                TAMANHO_BERM_CAL: pessoa.TAMANHO_BERM_CAL,
                NR_CALCADO: pessoa.NR_CALCADO,
                FOTO_ATLETA: pessoa.FOTO_ATLETA,
                FOTO_RG: pessoa.FOTO_RG,
                FOTO_RG_RESPONS: pessoa.FOTO_RG_RESPONS
            }));

            res.status(200).json({ pessoas: dadosFormatados });
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro ao buscar os associados.', erro: error.message });
        }
    }
}