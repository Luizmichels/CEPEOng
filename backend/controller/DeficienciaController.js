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
}