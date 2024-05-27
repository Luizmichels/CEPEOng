const Deficiencia = require('../models/deficiencia');

module.exports = class DeficienciaController {

    // Criando a deficiencia
    static async CadastDeficiencia(req, res) {

        const { TP_DEFICIENCIA, NOMENCLATURA } = req.body;

        // Validação
        if (!TP_DEFICIENCIA) {
            res.status(422).json({ mensagem: 'O tipo de deficiência é obrigatório' });
            return;
        }

        try {
            // Inserindo a deficiencia no banco
            const deficiencia = await Deficiencia.create({
                TP_DEFICIENCIA: TP_DEFICIENCIA,
                NOMENCLATURA: NOMENCLATURA
            });

            res.status(201).json({ mensagem: 'Deficiência cadastrada com sucesso!' });
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro ao cadastrar a deficiência', erro: error.message });
        }
    }

    static async TodasDeficiencias(req, res) {
        try {
            const deficiencias = await Deficiencia.findAll();

            if (deficiencias.length === 0) {
                return res.status(404).json({ mensagem: 'Não há nenhuma deficiência cadastrada' });
            }

            const deficienciaFormatada = deficiencias.map(deficiencia => ({
                CD_DEFICIENCIA: deficiencia.CD_DEFICIENCIA,
                TP_DEFICIENCIA: deficiencia.TP_DEFICIENCIA
            }));

            res.status(200).json({ deficiencias: deficienciaFormatada });
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensagem: 'Erro ao buscar deficiências' });
        }
    }

    // Função para deletar a Deficiência
    static async DeletarDeficiencias(req, res) {
        const { CD_DEFICIENCIA } = req.params;

        try {
            // Verificação se a Deficiência existe
            const deficienciaExiste = await Deficiencia.findOne({ where: { CD_DEFICIENCIA: CD_DEFICIENCIA } });
            if (!deficienciaExiste) {
                return res.status(404).json({ message: 'Deficiência não encontrado' });
            }

            // Deletando Deficiência
            await Deficiencia.destroy({ where: { CD_DEFICIENCIA: CD_DEFICIENCIA } });

            return res.status(200).json({ message: 'Deficiência deletado com sucesso' });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao deletar o Deficiência', error: error.message });
        }
    }

    static async EditarDeficiencias(req, res) {
        const { CD_DEFICIENCIA } = req.params;
        const { TP_DEFICIENCIA, NOMENCLATURA } = req.body;
        const updateData = {};
    
        try {
            // Validação
            if (!TP_DEFICIENCIA) {
                return res.status(422).json({ message: 'Tipo de Deficiência é obrigatório!' });
            }
    
            // Atualizando os campos apenas se forem fornecidos
            updateData.TP_DEFICIENCIA = TP_DEFICIENCIA;
            if (NOMENCLATURA) {
                updateData.NOMENCLATURA = NOMENCLATURA;
            }
    
            // Encontrar a deficiência para atualizar
            const def = await Deficiencia.findOne({ where: { CD_DEFICIENCIA: CD_DEFICIENCIA } });
    
            if (!def) {
                return res.status(404).json({ message: 'Deficiência não encontrada!' });
            }
    
            // Atualizar a deficiência
            await def.update(updateData);
    
            return res.status(200).json({ def: def, message: 'Deficiência atualizada com sucesso!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao editar a Deficiência' });
        }
    }

    static async BuscarPorID(req, res) {
        const { CD_DEFICIENCIA } = req.params;
    
        try {
            const deficiencia = await Deficiencia.findOne({ where: { CD_DEFICIENCIA: CD_DEFICIENCIA } });
    
            if (!deficiencia) {
                return res.status(404).json({ mensagem: 'Deficiência não encontrada' });
            }
    
            const deficienciaFormatada = {
                CD_DEFICIENCIA: deficiencia.CD_DEFICIENCIA,
                TP_DEFICIENCIA: deficiencia.TP_DEFICIENCIA,
                NOMENCLATURA: deficiencia.NOMENCLATURA
            };
    
            res.status(200).json({ deficiencia: deficienciaFormatada });
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensagem: 'Erro ao buscar deficiência' });
        }
    }
}