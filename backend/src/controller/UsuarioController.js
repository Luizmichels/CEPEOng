import Usuario from "../models/usuario";
import TecnicoModalidade from "../models/TecnicoModalidade";
import bcrypt from "bcrypt";
import { sendMail, sendMailTo } from "../helpers/mail";
import {EmailValido} from "../helpers/Validacoes"
import db from "../db/conn";

// helpers
import CriarUsuarioToken from "../helpers/CriarUsuarioToken";
import ObterToken from "../helpers/ObterToken";
import ObterUsuarioToken from "../helpers/ObterUsuarioToken";
import AnuidadeService from "../services/AnuidadeService";

export default class UsuarioController {
  // Função para cadastrar o usuário
  static async CadastroUsuario(req, res) {
    const { NM_USUARIO, SENHA, EMAIL } = req.body;

    // Validações
    if (!NM_USUARIO) {
      return res.status(422).json({ message: "O nome é obrigatório" });
    }
    if (!SENHA) {
      return res.status(422).json({ message: "A senha é obrigatória" });
    }
    if (!EMAIL) {
      return res.status(422).json({ message: "O e-mail é obrigatório" });
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
      const emailExiste = await Usuario.findOne({
        where: { EMAIL: EMAIL },
      });
      if (emailExiste) {
        return res
          .status(422)
          .json({ message: "Nome de usuário já está em uso" });
      }
      if (!EmailValido(EMAIL)) {
        res.status(422).json({ message: "Este e-mail não é válido" });
        return;
      }

      // Criando a senha e criptografando a senha
      const salt = await bcrypt.genSalt(12);
      const senhaHash = await bcrypt.hash(SENHA, salt);

      // Criando usuário
      const usuario = new Usuario({
        NM_USUARIO,
        SENHA: senhaHash,
        EMAIL: EMAIL,
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
        where: { NM_USUARIO: NM_USUARIO }
      });
      if (!usuario) return res.status(422).json({ message: "Não há usuário cadastrado com este Nome!" });

      // Verificando se a senha enviada está batendo com a senha do banco de dados
      const checarSenha = await bcrypt.compare(SENHA, usuario.SENHA);

      if (!checarSenha) return res.status(422).json({ message: "Senha inválida!" });

      // **** INÍCIO DA INTEGRAÇÃO DA VERIFICAÇÃO DE ANUIDADE ****
      if (usuario.CD_USUARIO) { // Garante que temos o ID do usuário
        const userId = usuario.CD_USUARIO;
        console.log(`Login bem-sucedido para usuário ${userId}. Verificando status da anuidade...`);
        // Chama o serviço para verificar/criar cobrança em background
        // Não usamos 'await' aqui para não atrasar a resposta do login
        AnuidadeService.verificarECriarCobrancaAnual(userId)
          .then(() => {
             console.log(`Verificação de anuidade concluída (background) para usuário ${userId}.`);
          })
          .catch(err => {
            // Logar erro que pode ter ocorrido na verificação/criação da anuidade
            console.error(`Erro background na verificação de anuidade para user ${userId}:`, err);
        });
      } else {
          console.warn(`CD_USUARIO não encontrado para ${NM_USUARIO} após login. Verificação de anuidade pulada.`);
      }
      // **** FIM DA INTEGRAÇÃO ****

      // Continua com a criação do token e resposta do login
      await CriarUsuarioToken(usuario, req, res);

    } catch (error) {
       console.error("Erro durante o processo de login:", error); // Log do erro no servidor
      return res
        .status(500)
        .json({ message: "Erro no servidor durante o login. Tente novamente mais tarde." });
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
    const { SENHA, CONFIRMASENHA } = req.body;
    const updateData = {};

    try {
        // Pegando o token do usuário logado
        const token = ObterToken(req);
        const user = await ObterUsuarioToken(token);

        console.log(CD_USUARIO, 'CD_USUARIO')
        console.log(user.CD_USUARIO, 'user.CD_USUARIO')

        const CD_USUARIO_str = String(CD_USUARIO).trim();
        const user_CD_USUARIO_str = String(user.CD_USUARIO).trim();
            
        if (CD_USUARIO_str !== user_CD_USUARIO_str) {
            return res.status(403).json({ message: 'Você não tem permissão para editar este usuário' });
        }

        // Validações
        if (!CONFIRMASENHA) {
            return res.status(422).json({ message: 'Confirmar a senha é obrigatório' });
        }

        // Verificação se a senha e a confirmação de senha são iguais
        if (SENHA !== CONFIRMASENHA) {
            return res.status(422).json({ message: 'A senha e a confirmação de senha precisam ser iguais!' });
        }

        if (!SENHA) {
            return res.status(422).json({ message: 'A Senha é obrigatória!' });
        } else {
            const salt = await bcrypt.genSalt(12);
            const senhaHash = await bcrypt.hash(SENHA, salt);
            updateData.SENHA = senhaHash;
        }

        // Atualizando o usuário com a nova senha
        const usu = await Usuario.findOne({ where: { CD_USUARIO: CD_USUARIO } });

        if (!usu) {
            return res.status(404).json({ message: 'Usuário não encontrado!' });
        }

        await usu.update(updateData);

        return res.status(200).json({ usu: usu, message: 'Usuário atualizado com sucesso!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao editar Usuário' });
    }
  }

  static async BuscarPorID(req, res) {
    const { CD_USUARIO } = req.params;

    try {
      const usuario = await Usuario.findOne({
        where: { CD_USUARIO: CD_USUARIO },
      });

      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const usuarioFormatado = {
        CD_USUARIO: usuario.CD_USUARIO,
        NM_USUARIO: usuario.NM_USUARIO,
        NIVEL_ACESSO: usuario.NIVEL_ACESSO,
      };

      res.status(200).json({ usuario: usuarioFormatado });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar Usuário" });
    }
  }

  static async TodosUsuario(req, res) {
    try {
      const usuario = await Usuario.findAll();

      if (usuario.length === 0) {
        return res
          .status(404)
          .json({ message: "Não há nenhuma usuario cadastrada" });
      }

      const usuarioFormatados = usuario.map((usuario) => ({
        CD_USUARIO: usuario.CD_USUARIO,
        NM_USUARIO: usuario.NM_USUARIO,
        SENHA: usuario.SENHA,
      }));

      res.status(200).json({ usuario: usuarioFormatados });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar usuario" });
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
      return res.status(500).json({
        message: "Erro ao atualizar o nível de acesso",
        error: error.message,
      });
    }
  }

  static async DeletarTecModali(req, res) {
    const { CD_TECNICO_MODALIDADE } = req.params;

    try {
      // Deletando meio de locomoção
      await TecnicoModalidade.destroy({
        where: { CD_TECNICO_MODALIDADE: CD_TECNICO_MODALIDADE },
      });

      return res.status(200).json({ message: "Técnico deletado com sucesso" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao deletar o Técnico", error: error.message });
    }
  }

  static async TodosNivel2(req, res) {
    try {
      const usuarios = await db.query(
        `
          select u."CD_USUARIO", pf."NM_PESSOA"
          from cepe.public."USUARIO"  u 
          inner join cepe.public."PESSOA_FISICA" pf on u."CD_USUARIO" = pf."CD_USUARIO" 
          where 1 = 1
            and u."NIVEL_ACESSO" = 2
                  `,
        { type: db.QueryTypes.SELECT }
      );

      if (usuarios.length === 0) {
        return res
          .status(404)
          .json({ message: "Não há nenhum técnico cadastrado" });
      }

      const usuarioFormatados = usuarios.map((usuario) => ({
        CD_USUARIO: usuario.CD_USUARIO,
        NM_PESSOA: usuario.NM_PESSOA,
      }));

      res.status(200).json({ usuario: usuarioFormatados });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar técnico" });
    }
  }

  static async TecnicoModalidade(req, res) {
    try {
      const usuarios = await db.query(
        `
          select tm."CD_TECNICO_MODALIDADE", 
                 concat(pf."NM_PESSOA", ' - ', m."NM_MODALIDADE") as "NM_PESSOA"
          from cepe.public."USUARIO" u
          inner join cepe.public."TECNICO_MODALIDADE" tm on u."CD_USUARIO" = tm."CD_USUARIO"
          inner join cepe.public."MODALIDADE" m on m."CD_MODALIDADE" = tm."CD_MODALIDADE"
          inner join cepe.public."PESSOA_FISICA" pf on u."CD_USUARIO" = pf."CD_USUARIO"
          where 1 = 1
            and u."NIVEL_ACESSO" = 2
            `,
        { type: db.QueryTypes.SELECT }
      );

      const dadosFormatados = usuarios.map((usuario) => ({
        CD_TECNICO_MODALIDADE: usuario.CD_TECNICO_MODALIDADE,
        NM_PESSOA: usuario.NM_PESSOA,
      }));

      res.status(200).json({ usuarios: dadosFormatados });
    } catch (error) {
      res.status(500).json({
        message: "Erro ao buscar os técnicos.",
        erro: error.message,
      });
    }
  }

  static async CadastroTecModali(req, res) {
    const { CD_USUARIO, CD_MODALIDADE } = req.body;

    // Validações
    if (!CD_USUARIO) {
      return res.status(422).json({ message: "O nome é obrigatório" });
    }

    if (!CD_MODALIDADE) {
      return res.status(422).json({ message: "A modalidade é obrigatória" });
    }

    try {
      const novoUsuario = await TecnicoModalidade.create({
        CD_USUARIO,
        CD_MODALIDADE,
      });
      return res
        .status(201)
        .json({ message: "Técnico cadastrado com sucesso" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao cadastrar o técnico", error: error.message });
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

      return res
        .status(200)
        .json({ message: "Técnico atualizado com sucesso!" });
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
          replacements: { CD_TECNICO_MODALIDADE: CD_TECNICO_MODALIDADE },
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
      res.status(500).json({
        message: "Erro ao buscar os técnicos.",
        erro: error.message,
      });
    }
  }

  static async sendEmail(req, res) {
    const { nome, telefone, email } = req.body;

    if(!nome) return res.status(404).json({ message: "Nome é obrigatório" });
    if(!telefone) return res.status(404).json({ message: "Telefone é obrigatório" });
    if(!email) return res.status(404).json({ message: "E-mail é obrigatório" });
    if (!EmailValido(email)) {
      res.status(422).json({ message: "Este e-mail não é válido" });
      return;
    }

    const htmlContent = `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <div style="padding: 10px; background-color: #f8f9fa;">
              <h2 style="color: #ED5600;">Solicitação de Associamento</h2>
              <p>Você recebeu uma nova solicitação de associamento com os seguintes dados:</p>
            </div>
            <div style="padding: 10px; background-color: #ffffff; border: 1px solid #ddd;">
              <p><strong>Nome:</strong> ${nome}</p>
              <p><strong>Telefone:</strong> ${telefone}</p>
              <p><strong>Email:</strong> ${email}</p>
            </div>
          </div>
        `;

    try {
      await sendMail("Solicitação de Associamento", htmlContent);
      res.status(200).send("Email enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar o email:", error);
      res.status(500).send("Erro ao enviar o email.");
    }
  }

  static async SolicitarSenhaTemporaria(req, res) {
    const { email } = req.body;

    // Validações
    if (!email) {
      return res.status(422).json({ message: "O e-mail é obrigatório" });
    }
    if (!EmailValido(email)) {
      res.status(422).json({ message: "Este e-mail não é válido" });
      return;
    }

    try {
      // Encontrar o usuário pelo e-mail
      const usuario = await Usuario.findOne({ where: { EMAIL: email } });

      if (!usuario) return res.status(404).json({ message: "E-mail não cadastrato!" });

      // Gerar uma senha temporária
      const senhaTemporaria = Math.random().toString(36).slice(-8); // Exemplo de geração de senha

      // Criptografar a senha temporária
      const salt = await bcrypt.genSalt(12);
      const senhaHash = await bcrypt.hash(senhaTemporaria, salt);

      console.log(senhaTemporaria, "senhaTemporaria");

      // Atualizar a senha do usuário no banco de dados
      usuario.SENHA = senhaHash;
      await usuario.save();

      // Enviar a senha temporária por e-mail
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; color: #333; position: relative;">
          <div style="padding: 10px; background-color: #f8f9fa; position: relative;">
            <h2 style="color: #ED5600;">Nova senha</h2>
            <p>Você solicitou uma nova senha. Use a senha abaixo para acessar sua conta:</p>
          </div>
          <div style="padding: 10px; background-color: #ffffff; border: 1px solid #ddd;">
            <p><strong>Senha:</strong> ${senhaTemporaria}</p>
          </div>
        </div>
      `;

      await sendMailTo("Senha Temporária", htmlContent, email);

      res
        .status(200)
        .json({ message: "Senha temporária enviada para o e-mail!" });
    } catch (error) {
      console.error("Erro ao solicitar a senha temporária:", error);
      res
        .status(500)
        .json({
          message: "Erro ao solicitar a senha temporária",
          error: error.message,
        });
    }
  }
};
