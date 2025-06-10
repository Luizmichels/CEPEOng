// src/components/PagamentoAnuidade/PagamentoAnuidade.jsx

import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'reactstrap'; // Ou os componentes de UI que você usa
import { useNavigate } from 'react-router-dom';
import api from '../../../utlis/api'; // Seu utilitário para chamadas de API
import { getId } from '../../../utlis'; // Para obter o token do usuário
import './pag.scss'; // Arquivo de estilos para a tela
import { NotificacaoManager } from "../../notificacao";

function ViewPag() {
    const [loading, setLoading] = useState(true);
    const [pagamentoInfo, setPagamentoInfo] = useState(null);
    const [imagemQrcode, setimagemQrcode] = useState('');
    const [pixCopiaECola, setPixCopiaECola] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const buscarDetalhesPagamento = async () => {
            setLoading(true);
            setErrorMessage('');
            try {
                const id = getId(); // Obtém o ID do usuário ou o token
                const token = id.id; // Supondo que 'id' é um objeto e o token está em 'id.id'

                // Você precisaria de alguma forma de identificar qual é o pagamento pendente.
                // Opção 1 (mais simples): O backend já retorna o pagamento pendente para o usuário logado
                const response = await api.get('/pix/anuidade-pendente', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data.pendente && response.data.pagamento) { // Ajuste conforme seu backend retorna
                    const pagamentoId = response.data.pagamento.CD_PAGAMENTO; 
                    setPagamentoInfo(response.data.pagamento);

                    // Buscar os detalhes do QR Code (imagem e copia e cola)
                    const qrCodeResponse = await api.get(`/pix/pagamento/${pagamentoId}/qrcode-details`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    setimagemQrcode(qrCodeResponse.data.imagemQrcode); // Base64 ou URL
                    setPixCopiaECola(qrCodeResponse.data.pixCopiaECola);
                } else {
                    setErrorMessage('Nenhuma anuidade pendente encontrada.');
                }
            } catch (error) {
                console.error("Erro ao buscar detalhes do pagamento:", error);
                setErrorMessage('Erro ao carregar os detalhes do pagamento. Tente novamente mais tarde.');
            } finally {
                setLoading(false);
            }
        };

        buscarDetalhesPagamento();
    }, []); // Executa uma vez ao montar o componente

    const handleCopyPixCode = () => {
        try {
            NotificacaoManager.success('Copiado com Sucesso!', '', 1000, 'filled');
        } catch (error) {
        console.error("Erro ao copiar código:", error);
        NotificacaoManager.error(error.response.data.message, '', 1500, 'filled');
        }
    };

    if (loading) {
        return (
            <div className="pagamento-container text-center">
                <Spinner color="primary" />
                <p>Carregando detalhes do pagamento...</p>
            </div>
        );
    }

    if (errorMessage) {
        return (
            <div className="pagamento-container text-center">
                <p className="text-danger">{errorMessage}</p>
                <Button color="secondary" onClick={() => navigate('/check-cadastro')}>Voltar</Button>
            </div>
        );
    }

    // Se não há pagamentoInfo, significa que não há anuidade pendente (após o loading)
    if (!pagamentoInfo) {
        return (
            <div className="pagamento-container text-center">
                <p>Você não possui anuidades pendentes no momento. Volte para o painel.</p>
                <Button color="primary" onClick={() => navigate('/check-cadastro')}>Voltar ao Painel</Button>
            </div>
        );
    }

    return (
        <div className="pagamento-container">
            <img src="/assets/img/cepe_joinville_laranja 2.png" className="logo-usu" alt="Logo" />
            <div className='text-pagamento-container'>
                <h2>Pagamento da Anuidade</h2>
                <br></br>
                <p>Valor a pagar: <b>R$ {pagamentoInfo.VALOR ? parseFloat(pagamentoInfo.VALOR).toFixed(2).replace('.', ',') : 'N/A'}</b></p>
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
                                <input style={{ backgroundColor: 'white' }}
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
                <Button color="default" onClick={() => navigate('/check-cadastro')}>Voltar</Button>
            </div>
        </div>
    );
}

export default ViewPag;