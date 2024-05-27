const MeioLocomocao = require('../models/meio_locomocao');

// 500 -> servidor
// 201 -> deu bom
// 422 -> faltando infos

module.exports = class MeioLocomocaoController {

    // Função para cadastrar o Meio de locomoção
    static async CadastroMeioLocomocao(req, res) {
        const { NM_MEIO_LOCOMOCAO, DS_MEIO_LOCOMOCAO } = req.body;

        // Validações
        if (!NM_MEIO_LOCOMOCAO) {
            return res.status(422).json({ message: 'O nome é obrigatório' });
        }

        try {
            // Verificação se o nome de meio já existe
            const meioExiste = await MeioLocomocao.findOne({ where: { NM_MEIO_LOCOMOCAO: NM_MEIO_LOCOMOCAO } });
            if (meioExiste) {
                return res.status(422).json({ message: 'Nome já cadastrado!' });
            }

            // Criando meio de locomoção
            const meioLocomocao = new MeioLocomocao({
                NM_MEIO_LOCOMOCAO,
                DS_MEIO_LOCOMOCAO
            });

            const novoMeioLocomocao = await meioLocomocao.save();
            return res.status(201).json({ message: 'Meio de Locomoção cadastrado com sucesso', meioLocomocao: novoMeioLocomocao });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao cadastrar o Meio de Locomoção', error: error.message });
        }
    }

    // Função para deletar o Meio de locomoção
    static async DeletarMeioLocomocao(req, res) {
        const { CD_MEIO_LOCOMOCAO } = req.params;
    
        try {
            // Verificação se o meio de locomoção existe
            const meioLocomocao = await MeioLocomocao.findOne({ where: { CD_MEIO_LOCOMOCAO: CD_MEIO_LOCOMOCAO } });
            if (!meioLocomocao) {
                return res.status(404).json({ message: 'Meio de Locomoção não encontrado' });
            }
    
            // Deletando meio de locomoção
            await MeioLocomocao.destroy({ where: { CD_MEIO_LOCOMOCAO: CD_MEIO_LOCOMOCAO } });
    
            return res.status(200).json({ message: 'Meio de Locomoção deletado com sucesso' });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao deletar o Meio de Locomoção', error: error.message });
        }
    }    

    static async EditarMeioLocomocao(req, res) {
        try {
            const { CD_MEIO_LOCOMOCAO } = req.params;
            const { NM_MEIO_LOCOMOCAO, DS_MEIO_LOCOMOCAO } = req.body;
    
            const meioLocomocao = await MeioLocomocao.findOne({ where: { CD_MEIO_LOCOMOCAO: CD_MEIO_LOCOMOCAO } });
    
            if (!meioLocomocao) {
                return res.status(404).send({ error: 'Meio de locomoção não encontrado' });
            }
    
            await meioLocomocao.update({ NM_MEIO_LOCOMOCAO, DS_MEIO_LOCOMOCAO });
    
            res.send(meioLocomocao);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Erro ao editar meio de locomoção' });
        }
    }

    static async BuscarPorID(req, res) {
        const { CD_MEIO_LOCOMOCAO } = req.params;
    
        try {
            const meioLocomocao = await MeioLocomocao.findOne({ where: { CD_MEIO_LOCOMOCAO: CD_MEIO_LOCOMOCAO } });
    
            if (!meioLocomocao) {
                return res.status(404).json({ mensagem: 'Meio de Locomoção não encontrado!' });
            }
    
            const meioLocomocaoFormatada = {
                CD_MEIO_LOCOMOCAO: meioLocomocao.CD_MEIO_LOCOMOCAO,
                NM_MEIO_LOCOMOCAO: meioLocomocao.NM_MEIO_LOCOMOCAO,
                DS_MEIO_LOCOMOCAO: meioLocomocao.DS_MEIO_LOCOMOCAO
            };
    
            res.status(200).json({ meioLocomocao: meioLocomocaoFormatada });
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensagem: 'Erro ao buscar Meio de Locomoção' });
        }
    }

    static async TodosMeios(req, res) {
        try {
            const meioLocomocaos = await MeioLocomocao.findAll();
    
            if (meioLocomocaos.length === 0) {
                return res.status(404).json({ mensagem: 'Não há nenhum Meio de Locomoção cadastrado' });
            }
    
            const meioLocomocaosFormatada = meioLocomocaos.map(meio => ({
                CD_MEIO_LOCOMOCAO: meio.CD_MEIO_LOCOMOCAO,
                NM_MEIO_LOCOMOCAO: meio.NM_MEIO_LOCOMOCAO,
                DS_MEIO_LOCOMOCAO: meio.DS_MEIO_LOCOMOCAO
            }));
    
            res.status(200).json({ meioLocomocaos: meioLocomocaosFormatada });
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensagem: 'Erro ao buscar Meio de Locomoção' });
        }
    }
    

};
