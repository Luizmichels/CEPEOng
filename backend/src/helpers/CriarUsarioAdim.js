import { genSalt, hash } from 'bcrypt';
import Usuario from '../models/usuario';

async function createDefaultAdminUser() {
    const NM_USUARIO = 'admin';
    const SENHA = '123';
    const NIVEL_ACESSO = 3;
    const EMAIL = 'cepeapp@gmail.com';

    try {
        // Verificação se o usuario já existe
        const usuarioExiste = await Usuario.findOne({ where: { NM_USUARIO } });
        if (!usuarioExiste) {
            // Criando e criptografando a senha
            const salt = await genSalt(12);
            const senhaHash = await hash(SENHA, salt);

            // Criando usuário
            await Usuario.create({
                NM_USUARIO,
                SENHA: senhaHash,
                NIVEL_ACESSO,
                EMAIL,
            });

            console.log('Usuário admin criado com sucesso.');
        } else {
            console.log('Usuário admin já existe.');
        }
    } catch (error) {
        console.error('Erro ao criar o usuário admin:', error);
    }
}

export default createDefaultAdminUser;
