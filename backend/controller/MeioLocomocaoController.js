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
};
