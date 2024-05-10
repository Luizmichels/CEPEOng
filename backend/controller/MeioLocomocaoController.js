const MeioLocomocao = require('../models/meio_locomocao')

// 500 -> servidor
// 201 -> deu bom
// 422 -> faltando infos

module.exports = class MeioLocomocaoController {

    // Criando o Meio de Locomoção
    static async CadastroMeioLocomocao(req, res) {

        const {NM_MEIO_LOCOMOCAO, DS_MEIO_LOCOMOCAO} = req.body

            // Validações
            if (!NM_MEIO_LOCOMOCAO) {
                res.status(422).json({ message: 'O nome é obrigatório!' });
                return;
            }

            try {
                // Vterificação se o meio de locomoção já exise
                const meioExiste = await MeioLocomocao.findOne({ where: { NM_MEIO_LOCOMOCAO: NM_MEIO_LOCOMOCAO } });
                if (meioExiste) {
                    return res.status(422).json({ message: 'O Nome do Meio de Locomoção já está em uso!' });
                }
        
                // Criando instância do meio de locomoção
                const meio = new MeioLocomocao({
                    NM_MEIO_LOCOMOCAO,
                    DS_MEIO_LOCOMOCAO
                });
        
                // Salvando o meio de locomoção no banco de dados
                const novoMeioLocomocao = await meio.save();
        
                // Retornando a resposta
                res.status(201).json({ message: 'Meio de Locomoção cadastrado com sucesso!', novoMeioLocomocao });
            } catch (error) {
                res.status(500).json({ message: 'Erro ao cadastrar o Meio de Locomoção', error: error.message });
            }

    } 

    static async EditarMeioLocomocao(req, res) {
        const { NM_MEIO_LOCOMOCAO, DS_MEIO_LOCOMOCAO } = req.body;
    
        // Validações
        if (!NM_MEIO_LOCOMOCAO) {
            res.status(422).json({ message: 'O nome é obrigatório' });
            return;
        }
    
        try {
            // Verifica se o meio de locomoção já existe
            const meioExistente = await MeioLocomocao.findOne({ where: { NM_MEIO_LOCOMOCAO: NM_MEIO_LOCOMOCAO } });
            if (meioExistente) {
                res.status(422).json({ message: 'Por favor, utilize outro nome!' });
                return;
            }
    
            // Encontra o meio de locomoção a ser atualizado usando o CD_MEIO_LOCOMOCAO passado nos parâmetros da solicitação
            const meio = await MeioLocomocao.findOne({ where: { NM_MEIO_LOCOMOCAO: req.params.NM_MEIO_LOCOMOCAO } });
            if (!meio) {
                res.status(404).json({ message: 'Meio de locomoção não encontrado' });
                return;
            }
    
            // Atualiza os dados do meio de locomoção
            await meio.update({ NM_MEIO_LOCOMOCAO, DS_MEIO_LOCOMOCAO });
    
            res.status(200).json({ message: 'Meio de locomoção atualizado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar o meio de locomoção', error: error.message });
        }
    }

}