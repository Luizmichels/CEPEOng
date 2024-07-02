const EquipamentoLocomocao = require('../models/equipamento_locomocao');
module.exports = class EquipamentiLocomocaoController {

    // Função para cadastrar o Equipamenti de locomoção
    static async CadastroEquipamentos(req, res) {
        const { NM_EQUIPAMENTO_LOCOMOCAO, DS_EQUIPAMENTO_LOCOMOCAO } = req.body;

        // Validações
        if (!NM_EQUIPAMENTO_LOCOMOCAO) {
            return res.status(422).json({ message: 'O nome é obrigatório' });
        }

        try {
            // Verificação se o nome de equipamento já existe
            const equipamentoExiste = await EquipamentoLocomocao.findOne({ where: { NM_EQUIPAMENTO_LOCOMOCAO: NM_EQUIPAMENTO_LOCOMOCAO } });
            if (equipamentoExiste) {
                return res.status(422).json({ message: 'Nome já cadastrado!' });
            }

            // Criando equipamento de locomoção
            const equipamentoLocomocao = new EquipamentoLocomocao({
                NM_EQUIPAMENTO_LOCOMOCAO,
                DS_EQUIPAMENTO_LOCOMOCAO
            });

            const novoEquipamentoLocomocao = await equipamentoLocomocao.save();
            return res.status(201).json({ message: 'Equipamento de Locomoção cadastrado com sucesso'});
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao cadastrar o Equipamento de Locomoção', error: error.message });
        }
    }

    // Função para deletar o Equipamentos de locomoção
    static async DeletarEquipamentos(req, res) {
        const { CD_EQUIPAMENTO_LOCOMOCAO } = req.params;
    
        try {
            const equipamentoLocomocao = await EquipamentoLocomocao.findOne({ where: { CD_EQUIPAMENTO_LOCOMOCAO: CD_EQUIPAMENTO_LOCOMOCAO } });
            if (!equipamentoLocomocao) {
                return res.status(404).json({ message: 'Equipamento de Locomoção não encontrado' });
            }
    
            await EquipamentoLocomocao.destroy({ where: { CD_EQUIPAMENTO_LOCOMOCAO: CD_EQUIPAMENTO_LOCOMOCAO } });
    
            return res.status(200).json({ message: 'Equipamento de Locomoção deletado com sucesso' });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao deletar o Equipamento de Locomoção', error: error.message });
        }
    }    

    static async EditarEquipamentos(req, res) {
        try {
            const { CD_EQUIPAMENTO_LOCOMOCAO } = req.params;
            const { NM_EQUIPAMENTO_LOCOMOCAO, DS_EQUIPAMENTO_LOCOMOCAO } = req.body;
    
            const equipamentoLocomocao = await EquipamentoLocomocao.findOne({ where: { CD_EQUIPAMENTO_LOCOMOCAO: CD_EQUIPAMENTO_LOCOMOCAO } });
    
            if (!equipamentoLocomocao) {
                return res.status(404).send({ error: 'Equipamento de locomoção não encontrado' });
            }
    
            await equipamentoLocomocao.update({ NM_EQUIPAMENTO_LOCOMOCAO, DS_EQUIPAMENTO_LOCOMOCAO });
    
            res.send(equipamentoLocomocao);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Erro ao editar equipamento de locomoção' });
        }
    }

    static async BuscarPorID(req, res) {
        const { CD_EQUIPAMENTO_LOCOMOCAO } = req.params;
    
        try {
            const equipamentoLocomocao = await EquipamentoLocomocao.findOne({ where: { CD_EQUIPAMENTO_LOCOMOCAO: CD_EQUIPAMENTO_LOCOMOCAO } });
    
            if (!equipamentoLocomocao) {
                return res.status(404).json({ mensagem: 'Equipamento de Locomoção não encontrado!' });
            }
    
            const equipamentoLocomocaoFormatada = {
                CD_EQUIPAMENTO_LOCOMOCAO: equipamentoLocomocao.CD_EQUIPAMENTO_LOCOMOCAO,
                NM_EQUIPAMENTO_LOCOMOCAO: equipamentoLocomocao.NM_EQUIPAMENTO_LOCOMOCAO,
                DS_EQUIPAMENTO_LOCOMOCAO: equipamentoLocomocao.DS_EQUIPAMENTO_LOCOMOCAO
            };
    
            res.status(200).json({ equipamentoLocomocao: equipamentoLocomocaoFormatada });
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensagem: 'Erro ao buscar Equipamento de Locomoção' });
        }
    }

    static async TodosEquipamentos(req, res) {
        try {
            const equipamentoLocomocaos = await EquipamentoLocomocao.findAll();
    
            if (equipamentoLocomocaos.length === 0) {
                return res.status(404).json({ mensagem: 'Não há nenhum Equipamento de Locomoção cadastrado' });
            }
    
            const equipamentoLocomocaosFormatada = equipamentoLocomocaos.map(meio => ({
                CD_EQUIPAMENTO_LOCOMOCAO: meio.CD_EQUIPAMENTO_LOCOMOCAO,
                NM_EQUIPAMENTO_LOCOMOCAO: meio.NM_EQUIPAMENTO_LOCOMOCAO,
                DS_EQUIPAMENTO_LOCOMOCAO: meio.DS_EQUIPAMENTO_LOCOMOCAO
            }));
    
            res.status(200).json({ equipamentoLocomocaos: equipamentoLocomocaosFormatada });
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensagem: 'Erro ao buscar Equipamento de Locomoção' });
        }
    }
    

};
