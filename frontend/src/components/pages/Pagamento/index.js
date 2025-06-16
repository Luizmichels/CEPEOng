// src/components/PagamentoAnuidade/PagamentoAnuidade.jsx

import React, { useEffect, useState, useCallback } from 'react';
import { Button, Spinner } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../../utlis/api';
// Importar as funções INDIVIDUAIS do seu utlis/index.js
// Usamos 'getId as getUserIdOnly' para evitar conflito de nomes e clarear que getId() só retorna o ID.
import { getToken, getNivel, getId as getUserIdOnly } from '../../../utlis';
import './pag.scss';
import { NotificacaoManager } from "../../notificacao";

function ViewPag() {
    const [loading, setLoading] = useState(true);
    const [pagamentoInfo, setPagamentoInfo] = useState(null);
    const [imagemQrcode, setImagemQrcode] = useState('');
    const [pixCopiaECola, setPixCopiaECola] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Função auxiliar para obter TODOS os dados de autenticação da maneira que seu utlis.js permite
    // Esta função RECRIA o objeto 'idData' que o componente espera.
    const getCombinedAuthData = useCallback(() => {
        const token = getToken(); // Pega o token da função específica
        let nivel = getNivel();   // Pega o nível da função específica
        const userId = getUserIdOnly(); // Pega o ID da função específica (renomeada para clareza)

        // IMPORTANTE: O getNivel() e getId() do seu utlis/index.js retornam strings ou 'false'.
        // Precisamos converter 'nivel' para número e verificar 'userId' corretamente.

        // Converte o nível para número, se for uma string válida.
        // Se getNivel() retornar 'false' (erro) ou null, nivel continuará como 'false'/'null'
        // Se retornar uma string vazia ou não numérica, parseInt resultará em NaN.
        if (typeof nivel === 'string' && nivel !== 'false') { // Adicionado check para 'false' string
            nivel = parseInt(nivel, 10);
            if (isNaN(nivel)) nivel = null; // Se não for um número válido após parse, trate como null
        } else if (nivel === false) { // Se getNivel explicitamente retornou false
            nivel = null;
        }

        // Verifica se todas as partes essenciais da autenticação foram obtidas com sucesso
        // Lembre-se que getToken/getNivel/getUserIdOnly podem retornar 'false' em caso de erro.
        // Aqui, tratamos 'false' como ausência de dado válido.
        if (!token || token === false || nivel === null || userId === false || !userId) {
            console.warn("getCombinedAuthData: Dados de autenticação incompletos ou ausentes.");
            return null; // Retorna null para indicar que o usuário não está completamente autenticado
        }

        // Retorna um objeto com todas as propriedades que o ViewPag.jsx espera
        return {
            id: token,          // 'id' em idData.id do ViewPag.jsx será o token
            nivelAcesso: nivel, // 'nivelAcesso' em idData.nivelAcesso do ViewPag.jsx
            CD_USUARIO: userId  // 'CD_USUARIO' em idData.CD_USUARIO do ViewPag.jsx
        };
    }, []); // Não há dependências dinâmicas para getCombinedAuthData, pois ela apenas chama funções estáticas de utlis.

    // handleVoltar agora usa getCombinedAuthData para obter o nível mais recente
    const handleVoltar = useCallback(() => {
        const authData = getCombinedAuthData(); // Puxa os dados combinados e formatados

        console.log("handleVoltar: Dados de autenticação obtidos no momento da ação:", authData);

        const nivel = authData?.nivelAcesso; // Pega o nível de acesso do objeto combinado

        if (nivel === null || typeof nivel === 'undefined') { // Verifica se o nível é válido
            console.warn("handleVoltar: Nível de acesso não encontrado ou inválido. Redirecionando para login.");
            navigate('/login');
            return;
        }

        // Lógica de redirecionamento baseada no nível de acesso atual
        if (nivel === 3) {
            navigate("/menu");
        } else if (nivel === 2) {
            navigate("/menu-tecnico");
        } else if (nivel === 1) {
            navigate("/check-cadastro");
        } else {
            console.warn("handleVoltar: Nível de acesso desconhecido. Redirecionando para login.");
            navigate("/login");
        }
    }, [navigate, getCombinedAuthData]); // Dependência de getCombinedAuthData

    useEffect(() => {
        const buscarDetalhesPagamento = async () => {
            setLoading(true);
            setErrorMessage('');
            try {
                const authData = getCombinedAuthData(); // Puxa os dados combinados na montagem do componente

                console.log("useEffect: Dados de autenticação na montagem do componente:", authData);

                // Verifica se há dados de autenticação válidos e completos
                // authData será null se getCombinedAuthData retornar null (indicando falha ou dados ausentes)
                if (!authData || !authData.id) { // authData.id é o token
                    setErrorMessage("Usuário não autenticado. Faça login novamente.");
                    setLoading(false);
                    navigate('/login');
                    return;
                }

                const token = authData.id; // O token agora vem de authData.id

                // Se o nível for 1, continua a buscar os detalhes do pagamento
                const response = await api.get('/pix/anuidade-pendente', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data.pendente && response.data.pagamento) {
                    const pagamentoId = response.data.pagamento.CD_PAGAMENTO;
                    setPagamentoInfo(response.data.pagamento);

                    const qrCodeResponse = await api.get(`/pix/pagamento/${pagamentoId}/qrcode-details`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    setImagemQrcode(qrCodeResponse.data.imagemQrcode);
                    setPixCopiaECola(qrCodeResponse.data.pixCopiaECola);
                } else {
                    setErrorMessage('Nenhuma anuidade pendente encontrada para seu usuário.');
                    setPagamentoInfo(null);
                }
            } catch (error) {
                console.error("Erro ao buscar detalhes do pagamento:", error);
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    setErrorMessage("Sessão expirada ou acesso negado. Faça login novamente.");
                    navigate('/login');
                } else {
                    setErrorMessage('Erro ao carregar os detalhes do pagamento. Tente novamente mais tarde.');
                }
                setPagamentoInfo(null);
            } finally {
                setLoading(false);
            }
        };

        buscarDetalhesPagamento();
    }, [navigate, handleVoltar, getCombinedAuthData]); // Dependências de useCallback

    const handleCopyPixCode = () => {
        navigator.clipboard.writeText(pixCopiaECola)
            .then(() => {
                NotificacaoManager.success('Copiado com Sucesso!', '', 1000, 'filled');
            })
            .catch(err => {
                console.error("Erro ao copiar código:", err);
                NotificacaoManager.error('Falha ao copiar código Pix.', '', 1500, 'filled');
            });
    };

    if (loading) {
        return (
            <div className="pagamento-container text-center d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                <Spinner color="primary" style={{ width: '3rem', height: '3rem'}} />
                <p className="mt-3">Carregando detalhes do pagamento...</p>
            </div>
        );
    }

    if (errorMessage) {
        return (
            <div className="pagamento-container text-center">
                <p className="text-danger">{errorMessage}</p>
                <Button color="secondary" onClick={handleVoltar}>Voltar</Button>
            </div>
        );
    }

    if (!pagamentoInfo) {
        return (
            <div className="pagamento-container text-center">
                <p>Você não possui anuidades pendentes no momento. Volte para o painel.</p>
                <Button color="primary" onClick={handleVoltar}>Voltar ao Painel</Button>
            </div>
        );
    }

    return (
        <div className="pagamento-container">
            <img src="/assets/img/cepe_joinville_laranja 2.png" className="logo-usu" alt="Logo" />
            <div className='text-pagamento-container'>
                <h2>Pagamento da Anuidade</h2>
                <br></br>
                <p>Código do Usuário: <b>{pagamentoInfo.CD_USUARIO || 'N/A'}</b></p>
                <p>Valor a pagar: <b>R$ {parseFloat(pagamentoInfo.VALOR).toFixed(2).replace('.', ',')}</b></p>
                <p>Data de Criação: {new Date(pagamentoInfo.DT_CRIACAO).toLocaleDateString()}</p>
            </div>
            <hr style={{ borderTop: '3px solid #ed5600' }}/>

            <h3>Pague com PIX</h3>
            {imagemQrcode ? (
                <div className="pix-section text-center">
                    <p>Escaneie o QR Code com o aplicativo do seu banco:</p>
                    <img src={imagemQrcode} alt="QR Code Pix" className="qr-code-image" />

                    {pixCopiaECola && (
                        <div className="pix-copia-cola mt-3">
                            <p>Ou copie e cole o código Pix:</p>
                            <div className="input-group">
                                <input
                                    style={{ backgroundColor: 'white', color: 'black' }}
                                    type="text"
                                    className="form-control"
                                    value={pixCopiaECola}
                                    readOnly
                                />
                                <Button color="default" onClick={handleCopyPixCode}>Copiar</Button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <p>Não foi possível gerar o QR Code. Tente novamente mais tarde.</p>
            )}

            <hr style={{ borderTop: '3px solid #ed5600' }}/>

            <div className="buttons-section">
                <Button color="default" onClick={handleVoltar}>Voltar</Button>
            </div>
        </div>
    );
}

export default ViewPag;