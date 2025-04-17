import fs from "fs";
import path from "path";
import https from "https";
import axios from 'axios';

const cert = fs.readFileSync(
  path.resolve(__dirname, `../certs/${process.env.GN_CERT_H}`)
);

const agent = new https.Agent({
  pfx: cert,
  passphrase: '' // Deixe vazio se o certificado não tiver senha
});

const credentials = Buffer.from(
  `${process.env.GN_CLIENT_ID_H}:${process.env.GN_CLIENT_SECRET_H}`
).toString('base64');

// Cache simples em memória
let cachedToken = null;
let tokenExpiresAt = 0; // Timestamp Unix (segundos)

async function fetchNewToken() {
  try {
    console.log("Buscando novo token PIX da Gerencianet...");
    const response = await axios({
      method: 'post',
      url: `${process.env.GN_ENDPOINT_H}/oauth/token`,
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json'
      },
      httpsAgent: agent,
      data: {
        grant_type: 'client_credentials'
      }
    })

    const { access_token, expires_in } = response.data;
    cachedToken = access_token;
    // Armazena o timestamp de quando o token expira (com uma pequena margem de segurança, ex: 60s)
    tokenExpiresAt = Date.now() / 1000 + expires_in - 60;
    console.log("Novo token PIX obtido e cache atualizado.");

    return cachedToken;
  } catch (error) {
    cachedToken = null; // Limpa o cache em caso de erro
    tokenExpiresAt = 0;
    console.error('Erro ao buscar novo token PIX:', error.response?.data || error.message);
    throw new Error(`Falha ao obter token PIX: ${error.message}`);
  }
}

// Função principal para obter um token válido (usa cache)
export async function getValidToken() {
  const now = Date.now() / 1000; // Timestamp atual em segundos

  if (cachedToken && now < tokenExpiresAt) {
    // console.log("Usando token PIX do cache.");
    return cachedToken;
  } else {
    // console.log("Token PIX ausente ou expirado. Buscando novo...");
    return await fetchNewToken();
  }
}

// --- Funções para outras operações PIX (ex: criar cobrança, gerar QR Code) ---

// Exemplo: Função para criar uma cobrança imediata (necessário antes de gerar QR Code)
export async function criarCobrancaPix(dadosCobranca) {
    const accessToken = await getValidToken(); // Obtém token válido (do cache ou novo)

    try {
        const response = await axios({
            method: 'post', // Ou 'put' dependendo do endpoint exato (verificar docs Gerencianet para /v2/cob)
            url: `${process.env.GN_ENDPOINT_H}/v2/cob`, // Endpoint para criar cobrança imediata
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            httpsAgent: agent,
            data: dadosCobranca // Objeto com valor, chave pix, devedor, etc.
        });
        console.log("Cobrança PIX criada:", response.data);
        return response.data; // Retorna os dados da cobrança, incluindo o 'loc' (location)
    } catch (error) {
        console.error('Erro ao criar cobrança PIX:', error.response?.data || error.message);
        throw new Error(`Falha ao criar cobrança PIX: ${error.message}`);
    }
}

// Exemplo: Função para gerar o QR Code de uma cobrança existente
export async function gerarQrCodePix(locationId) {
    const accessToken = await getValidToken();

    try {
        const response = await axios({
            method: 'get',
            url: `${process.env.GN_ENDPOINT_H}/v2/loc/${locationId}/qrcode`,
            headers: {
                Authorization: `Bearer ${accessToken}`
                // Content-Type não costuma ser necessário para GET sem corpo
            },
            httpsAgent: agent
            // Sem 'data' para GET
        });
        console.log("QR Code PIX gerado:", response.data);
        return response.data; // Contém qrcode (string) e imagemQrcode (base64)
    } catch (error) {
        console.error(`Erro ao gerar QR Code PIX para Loc ID ${locationId}:`, error.response?.data || error.message);
        throw new Error(`Falha ao gerar QR Code PIX: ${error.message}`);
    }
}
