const Funcao = require('../models/funcao');

module.exports = class FuncaoController {
    // criar uma nova função
    static async cadastrarFuncao(req, res) {
        try {
            const { NM_FUNCAO, DS_FUNCAO } = req.body
            await Funcao.create({ NM_FUNCAO, DS_FUNCAO })
            res.status(201).json({ mensagem: 'Função cadastrada com sucesso!' })
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    // listar todas as funções
    static async listarFuncoes(req, res) {
        try {

            const funcoes = await Funcao.findAll();

            if (funcoes.length === 0) {
                return res.status(404).json({ mensagem: 'Não há nenhuma função cadastrada' });
            }

            const funcaoFormatada = funcoes.map(funcao => ({
                CD_FUNCAO: funcao.CD_FUNCAO,
                NM_FUNCAO: funcao.NM_FUNCAO
            }));

            res.status(200).json({ funcoes: funcaoFormatada });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    // obter uma função específica por ID
    static async obterFuncao(req, res) {
        const { CD_FUNCAO } = req.params

        try {

            const funcoes = await Funcao.findOne({ where: { CD_FUNCAO: CD_FUNCAO } });
    
            if (!funcoes) {
                return res.status(404).json({ mensagem: 'Função não encontrada' });
            }
    
            const funcaoFormatada = {
                CD_FUNCAO: funcoes.CD_FUNCAO,
                NM_FUNCAO: funcoes.NM_FUNCAO
            };
    
            res.status(200).json({ funcoes: funcaoFormatada });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    // atualizar uma função por ID
    static async atualizarFuncao(req, res) {
        const { CD_FUNCAO } = req.params;
        const { NM_FUNCAO, DS_FUNCAO } = req.body;
        const updateData = {};
    
        try {
            // Validação
            if (!NM_FUNCAO) {
                return res.status(422).json({ message: 'Função é obrigatório!' });
            }
    
            // Atualizando os campos apenas se forem fornecidos
            updateData.NM_FUNCAO = NM_FUNCAO;
            if (DS_FUNCAO) {
                updateData.DS_FUNCAO = DS_FUNCAO;
            }
    
            // Encontrar a deficiência para atualizar
            const funcao = await Funcao.findOne({ where: { CD_FUNCAO: CD_FUNCAO } });
    
            if (!funcao) {
                return res.status(404).json({ message: 'Função não encontrada!' });
            }
    
            // Atualizar a deficiência
            await funcao.update(updateData);
    
            return res.status(200).json({message: 'Função atualizada com sucesso!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    // deletar uma função por ID
    static async deletarFuncao(req, res) {
        const { CD_FUNCAO } = req.params;

        try {
            // Verificação se a Deficiência existe
            const funcaoExiste = await Funcao.findOne({ where: { CD_FUNCAO: CD_FUNCAO } })
            if (!funcaoExiste) {
                return res.status(404).json({ message: 'Função não encontrado' })
            }

            // Deletando Deficiência
            await Funcao.destroy({ where: { CD_FUNCAO: CD_FUNCAO } })

            return res.status(200).json({ message: 'Função deletada com sucesso' })
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}
