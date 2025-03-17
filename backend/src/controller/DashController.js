const PessoaFisica = require("../models/pessoa_fisica").default;
const Deficiencia = require("../models/deficiencia").default;
const DeficienciaPessoa = require("../models/DeficienciaPessoa").default;
const AtletaModalidade = require("../models/AtletaModalidade").default;

const db = require("../db/conn").default;

module.exports = class DashController {

  static async getTotalAssociados(req, res) {
    try {
      const totalAssociadosResult = await db.query(
        `SELECT count(*) as TOTAL FROM cepe.public."PESSOA_FISICA" pf WHERE 1 = 1`,
        { type: db.QueryTypes.SELECT }
      );

      res.status(200).json({ totalAssociados: totalAssociadosResult[0].total });
    } catch (error) {
      console.error("Erro ao buscar total de associados:", error);
      res.status(500).json({ error: "Erro ao buscar total de associados" });
    }
  }

  static async getModalidades(req, res) {
    try {
      const modalidadesResult = await db.query(
        `SELECT m."NM_MODALIDADE", 
                count(*) as TOTAL 
         FROM cepe.public."PESSOA_FISICA" pf 
         LEFT JOIN cepe.public."MODALIDADE" m ON pf."CD_MODALIDADE" = m."CD_MODALIDADE" 
         WHERE 1 = 1 
         GROUP BY m."NM_MODALIDADE" 
         ORDER BY TOTAL DESC`,
        { type: db.QueryTypes.SELECT }
      );

      const modalidades = modalidadesResult.map((modalidade) => ({
        NM_MODALIDADE: modalidade.NM_MODALIDADE,
        TOTAL: modalidade.total,
      }));

      res.status(200).json(modalidades);
    } catch (error) {
      console.error("Erro ao buscar modalidades:", error);
      res.status(500).json({ error: "Erro ao buscar modalidades" });
    }
  }

  static async getTotalTecnico(req, res) {
    const { CD_USUARIO } = req.params;

    try {
      const totalAssociadosResult = await db.query(
        `SELECT COUNT(am."CD_PESSOA_FISICA") AS TOTAL
         FROM cepe.public."TECNICO_MODALIDADE" tm
         LEFT JOIN cepe.public."MODALIDADE" m ON m."CD_MODALIDADE" = tm."CD_MODALIDADE"
         LEFT JOIN cepe.public."ATLETA_MODALIDADE" am ON tm."CD_MODALIDADE" = am."CD_MODALIDADE"
         WHERE 1 = 1
           AND tm."CD_USUARIO" = ${CD_USUARIO}`,
        { type: db.QueryTypes.SELECT }
      );

      res.status(200).json({ totalAssociados: totalAssociadosResult[0].total });
    } catch (error) {
      console.error("Erro ao buscar total de associados:", error);
      res.status(500).json({ error: "Erro ao buscar total de associados" });
    }
  }

  static async getModalidadesTecnico(req, res) {
    const { CD_USUARIO } = req.params;

    try {
      const modalidadesResult = await db.query(
        `SELECT COUNT(am."CD_PESSOA_FISICA") AS TOTAL,
                m."NM_MODALIDADE"
         FROM cepe.public."TECNICO_MODALIDADE" tm
         LEFT JOIN cepe.public."MODALIDADE" m ON m."CD_MODALIDADE" = tm."CD_MODALIDADE"
         LEFT JOIN cepe.public."ATLETA_MODALIDADE" am ON tm."CD_MODALIDADE" = am."CD_MODALIDADE"
         WHERE 1 = 1
           AND tm."CD_USUARIO" = ${CD_USUARIO}
         GROUP BY m."NM_MODALIDADE"
         ORDER BY TOTAL DESC`,
        { type: db.QueryTypes.SELECT }
      );

      const modalidades = modalidadesResult.map((modalidade) => ({
        NM_MODALIDADE: modalidade.NM_MODALIDADE,
        TOTAL: modalidade.total,
      }));

      res.status(200).json(modalidades);
    } catch (error) {
      console.error("Erro ao buscar modalidades:", error);
      res.status(500).json({ error: "Erro ao buscar modalidades" });
    }
  }
};