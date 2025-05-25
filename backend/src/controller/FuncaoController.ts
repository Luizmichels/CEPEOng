// ../controllers/FuncaoController.js
import Funcao from '../models/funcao.js';

export default class FuncaoController {
    // Criar uma nova função
    static async cadastrarFuncao(req, res) {
        try {
            const { NM_FUNCAO, DS_FUNCAO } = req.body;

            if (!NM_FUNCAO) {
                return res.status(422).json({ message: 'O nome da função é obrigatório!' });
            }

            const novaFuncao = await Funcao.create({ NM_FUNCAO, DS_FUNCAO });
            res.status(200).json({ message: 'Função cadastrada com sucesso!', novaFuncao });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Listar todas as funções
    static async listarFuncoes(req, res) {
        try {
            const funcoes = await Funcao.findAll();

            if (funcoes.length === 0) {
                return res.status(404).json({ message: 'Não há nenhuma função cadastrada' });
            }

            const funcoesFormatadas = funcoes.map(funcao => ({
                CD_FUNCAO: funcao.CD_FUNCAO,
                NM_FUNCAO: funcao.NM_FUNCAO
            }));

            res.status(200).json({ funcoes: funcoesFormatadas });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Obter uma função específica por ID
    static async obterFuncao(req, res) {
        const { CD_FUNCAO } = req.params;

        try {
            const funcao = await Funcao.findOne({ where: { CD_FUNCAO } });

            if (!funcao) {
                return res.status(404).json({ message: 'Função não encontrada' });
            }

            const funcaoFormatada = {
                CD_FUNCAO: funcao.CD_FUNCAO,
                NM_FUNCAO: funcao.NM_FUNCAO,
                DS_FUNCAO: funcao.DS_FUNCAO
            };

            res.status(200).json({ funcao: funcaoFormatada });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Atualizar uma função por ID
    static async atualizarFuncao(req, res) {
        const { CD_FUNCAO } = req.params;
        const { NM_FUNCAO, DS_FUNCAO } = req.body;

        try {
            if (!NM_FUNCAO) {
                return res.status(422).json({ message: 'O nome da função é obrigatório!' });
            }

            const funcao = await Funcao.findOne({ where: { CD_FUNCAO } });

            if (!funcao) {
                return res.status(404).json({ message: 'Função não encontrada!' });
            }

            await funcao.update({ NM_FUNCAO, DS_FUNCAO });

            res.status(200).json({ message: 'Função atualizada com sucesso!', funcao });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Deletar uma função por ID
    static async deletarFuncao(req, res) {
        const { CD_FUNCAO } = req.params;

        try {
            const funcao = await Funcao.findOne({ where: { CD_FUNCAO } });

            if (!funcao) {
                return res.status(404).json({ message: 'Função não encontrada' });
            }

            await Funcao.destroy({ where: { CD_FUNCAO } });

            res.status(200).json({ message: 'Função deletada com sucesso' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
