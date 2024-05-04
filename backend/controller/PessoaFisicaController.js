const PessoaFisica = require('../models/pessoa_fisica')
const Deficiencia = require('../models/deficiencia');
const DeficienciaPessoa = require('../models/DeficienciaPessoa')
const Modalidade = require('../models/modalidade')
const ModalidadePessoa = require('../models/ModalidadePessoa')

// helpers

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

        const { FOTO_ATLETA, FOTO_RG, FOTO_RG_RESPONS } = req.files;

        await Deficiencia.findAll({ where: { CD_DEFICIENCIA: CD_DEFICIENCIA } });
        
        // await Modalidade.findAll({ where: { CD_MODALIDEDADE: CD_MODALIDEDADE } });

        //const maiorDeIdade = idade > 18;

        // Validações

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

        // Fazer uma verificação para ver se o CPF é valido
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

        // fazer validação se é menor de idada
        if (!CELULAR_PAI) {
            res.status(422).json({ mensagem: 'O número de celular do pai é obrigatório' })
            return
        }

        if (!CELULAR_MAE) {
            res.status(422).json({ mensagem: 'O número do celular da mãe é obrigatório' })
            return
        }

        if (!EMAIL_RESPONS) {
            res.status(422).json({ mensagem: 'O e-mail do responsável é obrigatório' })
            return
        }

        if (!NATURALIDADE_RESPONS) {
            res.status(422).json({ mensagem: 'A naturalidade do responsável é obrigatório' })
            return
        }

        if (!CPF_RESPONS) {
            res.status(422).json({ mensagem: 'O número do CPF do responsável é obrigatório' })
            return
        }

        if (!RG_RESPONS) {
            res.status(422).json({ mensagem: 'O número do RG do responsável é obrigatório' })
            return
        }

        if (!UF_RG_RESPONS) {
            res.status(422).json({ mensagem: 'O estado em que o RG do responsável foi emitido é obrigatório' })
            return
        }

        if (!DT_EMISSAO_RG_RESPONS) {
            res.status(422).json({ mensagem: 'A data de emissão do RG do responsável é obrigatória' })
            return
        }

        if (!FOTO_RG_RESPONS) {
            res.status(422).json({ mensagem: 'A foto do RG do responsável é obrigatória' })
            return
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
                PESO, ALTURA, RENDA, INSTITUICAO, MATRICULA, TELEFONE_ESCOLA,
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
                FOTO_RG_RESPONS: FOTO_RG_RESPONS[0].filename
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
}