// Função para formatar datas para o formato dd-mm-yyyy
export function formatarData(data) {
    const dataObj = new Date(data);
    const dia = dataObj.getDate().toString().padStart(2, '0');
    const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataObj.getFullYear();
    return `${dia}-${mes}-${ano}`;
}

// Função para formatar números de telefone
export function formatarTelefone(telefone) {
    const numeroLimpo = telefone.replace(/\D/g, ''); // Remove todos os não dígitos
    if (numeroLimpo.length === 11) {
        return numeroLimpo.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (numeroLimpo.length === 9) {
        return numeroLimpo.replace(/(\d{5})(\d{4})/, '$1-$2');
    } else if (numeroLimpo.length === 8) {
        return numeroLimpo.replace(/(\d{4})(\d{4})/, '$1-$2');
    } else {
        // Retorna o número original se não corresponder a nenhum dos padrões
        return telefone;
    }
}

// Função para formatar CPF
export function formatarCPF(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

// Função para formatar RG
export function formatarRG(rg) {
    return rg.replace(/(\d{1})(\d{3})(\d{3})/, '$1.$2.$3');
}

// Função para formatar peso
// export function formatarPeso(peso) {
//     return peso.replace(/(d{}))
// }

// Função para formatar CEP
export function formatarCEP(cep) {
    return cep.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2-$3')
}