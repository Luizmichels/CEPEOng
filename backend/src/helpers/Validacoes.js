import validator from 'validator';

export function EmailValido(email) {
    return validator.isEmail(email);
}

// Remove todos os pontos (.) e traços (-)
export function cleanCPF(cpf) {
    return cpf.replace(/[.\-]/g, '');
}

//Validação se o CPF valido
export function cpfValido(cpf) {
    // Limpa o CPF antes de validar
    const cleanedCPF = cleanCPF(cpf);
    return validator.isTaxID(cleanedCPF, 'pt-BR');
}

// Função para calcular a diferença em anos entre duas datas
export function diferencaAnos(dataNascimento) {
    // Convertendo a data de nascimento para um objeto Date
    const dtNascimento = new Date(dataNascimento);
    const dtAtual = new Date();

    // Calculando a diferença em milissegundos
    const diffMs = dtAtual - dtNascimento;

    // Convertendo a diferença de milissegundos para anos
    const diffYears = Math.abs(dtAtual.getFullYear() - dtNascimento.getFullYear());

    // Verificando se a segunda data ainda não ocorreu no ano atual
    if (dtAtual.getMonth() < dtNascimento.getMonth() || (dtAtual.getMonth() === dtNascimento.getMonth() && dtAtual.getDate() < dtNascimento.getDate())) {
        return diffYears - 1;
    }

    return diffYears;
}