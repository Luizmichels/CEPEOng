const Usuario = require("../models/usuario").default;
const TecnicoModalidade = require('../models/TecnicoModalidade').default
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../db/conn").default;

// helpers
const CriarUsuarioToken = require("../helpers/CriarUsuarioToken");
const ObterToken = require("../helpers/ObterToken");
const ObterUsuarioToken = require("../helpers/ObterUsuarioToken");

module.exports = class UsuarioController {
  // Função para cadastrar o usuário
  static async CadastroUsuario(req, res) {
    const { NM_USUARIO, SENHA } = req.body;

    // Validações
    if (!NM_USUARIO) {
      return res.status(422).json({ message: "O nome é obrigatório" });
    }

    if (!SENHA) {
      return res.status(422).json({ message: "A senha é obrigatória" });
    }

    try {
      // Verificação se o usuario já existe
      const usuarioExiste = await Usuario.findOne({
        where: { NM_USUARIO: NM_USUARIO },
      });
      if (usuarioExiste) {
        return res
          .status(422)
          .json({ message: "Nome de usuário já está em uso" });
      }

      // Criando a senha e criptografando a senha
      const salt = await bcrypt.genSalt(12);
      const senhaHash = await bcrypt.hash(SENHA, salt);

      // Criando usuário
      const usuario = new Usuario({
        NM_USUARIO,
        SENHA: senhaHash,
      });

      const novoUsuario = await usuario.save();
      return res
        .status(201)
        .json({ message: "Usuário cadastrado com sucesso" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao cadastrar o Usuário", error: error.message });
    }
  }

  // Função de login
  static async login(req, res) {
    const { NM_USUARIO, SENHA } = req.body;

    // Validação
    if (!NM_USUARIO) {
      return res
        .status(422)
        .json({ message: "O nome de usuário é obrigatório" });
    }

    if (!SENHA) {
      return res.status(422).json({ message: "A senha é obrigatória" });
    }

    try {
      // Verificação se o usuario já existe
      const usuario = await Usuario.findOne({
        where: { NM_USUARIO: NM_USUARIO },
      });
      if (!usuario) {
        return res
          .status(422)
          .json({ message: "Não há usuário cadastrado com este Nome!" });
      }

      // Verificando se a senha enviada está batendo com a senha do banco de dados
      const checarSenha = await bcrypt.compare(SENHA, usuario.SENHA);

      if (!checarSenha) {
        return res.status(422).json({ message: "Senha inválida!" });
      }

      await CriarUsuarioToken(usuario, req, res);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro no servidor. Tente novamente mais tarde." });
    }
  }

  static async login2(req, res) {
    const { token } = req.body;

    // Validação

    try {
      const user = await ObterUsuarioToken(token);

      const usuario = await Usuario.findOne({
        where: { CD_USUARIO: user.CD_USUARIO },
      });

      return res.json({
        ok: usuario.NIVEL_ACESSO,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro no servidor. Tente novamente mais tarde." });
    }
  }

  // Função para deletar o Usuario
  static async DeletarUsuario(req, res) {
    const { CD_USUARIO } = req.params;

    try {
      // Verificação se o meio de locomoção existe
      const usuarioExiste = await Usuario.findOne({
        where: { CD_USUARIO: CD_USUARIO },
      });
      if (!usuarioExiste) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      // Deletando meio de locomoção
      await Usuario.destroy({ where: { CD_USUARIO: CD_USUARIO } });

      return res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao deletar o Usuário", error: error.message });
    }
  }

  static async EditarUsuario(req, res) {
    const { CD_USUARIO } = req.params;
    const { SENHA } = req.body;
    const updateData = {};

    try {
      // Pegando o token do usuário logado
      const token = ObterToken(req);

      /*// Verificando se o usuário logado é o mesmo que está sendo editado
            if (usuario.CD_USUARIO !== CD_USUARIO) {
                return res.status(403).json({ message: 'Você não tem permissão para editar este usuário' })
            }*/

      if (!SENHA) {
        return res.status(422).json({ message: "A Senha é obrigatória!" });
      } else {
        const salt = await bcrypt.genSalt(12);
        const senhaHash = await bcrypt.hash(SENHA, salt);
        updateData.SENHA = senhaHash;
      }

      // Atualizando o usuário com a nova senha
      const usu = await Usuario.findOne({ where: { CD_USUARIO: CD_USUARIO } });

      if (!usu) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }

      await usu.update(updateData);

      return res
        .status(200)
        .json({ message: "Usuário atualizado com sucesso!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao editar Usuário" });
    }
  }

  static async BuscarPorID(req, res) {
    const { CD_USUARIO } = req.params;

    try {
      const usuario = await Usuario.findOne({
        where: { CD_USUARIO: CD_USUARIO },
      });

      if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      }

      const usuarioFormatado = {
        CD_USUARIO: usuario.CD_USUARIO,
        NM_USUARIO: usuario.NM_USUARIO,
      };

      res.status(200).json({ usuario: usuarioFormatado });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: "Erro ao buscar Usuário" });
    }
  }

  static async TodosUsuario(req, res) {
    try {
      const usuario = await Usuario.findAll();

      if (usuario.length === 0) {
        return res
          .status(404)
          .json({ mensagem: "Não há nenhuma usuario cadastrada" });
      }

      const usuarioFormatados = usuario.map((usuario) => ({
        CD_USUARIO: usuario.CD_USUARIO,
        NM_USUARIO: usuario.NM_USUARIO,
        SENHA: usuario.SENHA,
      }));

      res.status(200).json({ usuario: usuarioFormatados });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: "Erro ao buscar usuario" });
    }
  }

  static async EditarNivelAcesso(req, res) {
    const { CD_USUARIO } = req.params;
    const { NIVEL_ACESSO } = req.body;

    // Verificar se o nível de acesso está presente
    if (!NIVEL_ACESSO) {
      return res
        .status(422)
        .json({ message: "O nível de acesso é obrigatório" });
    }

    try {
      const usuario = await Usuario.findOne({ where: { CD_USUARIO } });

      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      usuario.NIVEL_ACESSO = NIVEL_ACESSO;
      await usuario.save();

      return res
        .status(200)
        .json({ message: "Nível de acesso atualizado com sucesso" });
    } catch (error) {
      return res
        .status(500)
        .json({
          message: "Erro ao atualizar o nível de acesso",
          error: error.message,
        });
    }
  }

  static async DeletarTecModali(req, res) {
    const { CD_TECNICO_MODALIDADE } = req.params;

    try {
      // Deletando meio de locomoção
      await TecnicoModalidade.destroy({ where: { CD_TECNICO_MODALIDADE: CD_TECNICO_MODALIDADE } });

      return res.status(200).json({ message: "Técnico deletado com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao deletar o Técnico", error: error.message });
    }
  }

  static async TodosNivel2(req, res) {
    try {
      const usuarios = await db.query(
        `
                      select u.CD_USUARIO, pf.NM_PESSOA 
                      from usuarios u 
                      inner join pessoa_fisicas pf on u.CD_USUARIO = pf.CD_USUARIO 
                      where 1 = 1
                        and u.NIVEL_ACESSO = 2
                  `,
        { type: db.QueryTypes.SELECT }
      );

      if (usuarios.length === 0) {
        return res
          .status(404)
          .json({ mensagem: "Não há nenhum técnico cadastrado" });
      }

      const usuarioFormatados = usuarios.map((usuario) => ({
        CD_USUARIO: usuario.CD_USUARIO,
        NM_PESSOA: usuario.NM_PESSOA,
      }));

      res.status(200).json({ usuario: usuarioFormatados });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: "Erro ao buscar técnico" });
    }
  }

  static async TecnicoModalidade(req, res) {
    try {
      const usuarios = await db.query(
        `
                select tm.CD_TECNICO_MODALIDADE, 
                        concat(pf.NM_PESSOA,' - ', M.NM_MODALIDADE) as NM_PESSOA
                from usuarios u 
                inner join tecnico_modalidades tm on u.CD_USUARIO = tm.CD_USUARIO
                inner join modalidades m on m.CD_MODALIDADE = tm.CD_MODALIDADE
                inner join pessoa_fisicas pf on u.CD_USUARIO = pf.CD_USUARIO 
                where 1 = 1
                  and U.NIVEL_ACESSO = 2
            `,
        { type: db.QueryTypes.SELECT }
      );

      const dadosFormatados = usuarios.map((usuario) => ({
          CD_TECNICO_MODALIDADE: usuario.CD_TECNICO_MODALIDADE,
          NM_PESSOA: usuario.NM_PESSOA,
      }));

      res.status(200).json({ usuarios: dadosFormatados });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Erro ao buscar os técnicos.",
          erro: error.message,
        });
    }
  }

  static async CadastroTecModali(req, res) {
        const { CD_USUARIO, CD_MODALIDADE } = req.body

        // Validações
        if (!CD_USUARIO) {
            return res.status(422).json({ message: 'O nome é obrigatório' })
        }

        if (!CD_MODALIDADE) {
            return res.status(422).json({ message: 'A modalidade é obrigatória' })
        }

        try {

            const novoUsuario = await TecnicoModalidade.create({CD_USUARIO,
                CD_MODALIDADE})
            return res.status(201).json({ message: 'Técnico cadastrado com sucesso'})
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao cadastrar o técnico', error: error.message })
        }
    }

    static async EditarTecModali(req, res) {
        const { CD_TECNICO_MODALIDADE } = req.params;
        const { CD_USUARIO, CD_MODALIDADE } = req.body;
    
        try {
          // Atualizando o usuário com a nova senha
        //   const usu = await TecnicoModalidade.findOne({ where: { CD_TECNICO_MODALIDADE: CD_TECNICO_MODALIDADE } });
          const usu = await TecnicoModalidade.findByPk(CD_TECNICO_MODALIDADE);
    
          if (!usu) {
            return res.status(404).json({ message: "Técnico não encontrado!" });
          }
    
          await usu.update({ CD_USUARIO, CD_MODALIDADE });
    
          return res.status(200).json({ message: "Técnico atualizado com sucesso!" });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: "Erro ao editar técnico" });
        }
      }

      static async ObterTecnicoModalidade(req, res) {
        const { CD_TECNICO_MODALIDADE } = req.params;
        try {
          const usuarios = await db.query(
            `
                    select tm.CD_TECNICO_MODALIDADE, 
                           pf.NM_PESSOA,
                           M.NM_MODALIDADE
                    from usuarios u 
                    inner join tecnico_modalidades tm on u.CD_USUARIO = tm.CD_USUARIO
                    inner join modalidades m on m.CD_MODALIDADE = tm.CD_MODALIDADE
                    inner join pessoa_fisicas pf on u.CD_USUARIO = pf.CD_USUARIO 
                    where 1 = 1
                      and U.NIVEL_ACESSO = 2
                      and tm.CD_TECNICO_MODALIDADE = :CD_TECNICO_MODALIDADE
                `,
            { 
                type: db.QueryTypes.SELECT,
                replacements: { CD_TECNICO_MODALIDADE: CD_TECNICO_MODALIDADE}
            }
          );

          if (!usuarios.length) {
            return res.status(404).json({ message: "Técnico não encontrado" });
          }
    
          const dadosFormatados = usuarios.map((usuario) => ({
              CD_TECNICO_MODALIDADE: usuario.CD_TECNICO_MODALIDADE,
              NM_PESSOA: usuario.NM_PESSOA,
              NM_MODALIDADE: usuario.NM_MODALIDADE,
          }));
    
          res.status(200).json({ usuarios: dadosFormatados });
        } catch (error) {
          res
            .status(500)
            .json({
              message: "Erro ao buscar os técnicos.",
              erro: error.message,
            });
        }
      }
};
