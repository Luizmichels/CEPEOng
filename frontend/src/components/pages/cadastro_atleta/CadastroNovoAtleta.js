import React from 'react';
import '../pages/cadastro_atleta/novo_atleta.css'; // Importe o arquivo CSS

const CadastroNovoAtleta = () => {
    return (
        <div>
            <header>
                <nav>
                    <div>
                        <img src="../img/cepe_joinville_laranja 2.png" alt="logo" />
                    </div>
                    <div className="titulo">
                        <h1>Cadastro Novo Atleta</h1>
                    </div>
                </nav>
            </header>

            <main>
                <form action="#" method="post">

                    <h2>Dados Pessoais</h2>

                    <div className="form-group">
                        <label htmlFor="NM_PESSOA">Nome Completo:</label>
                        <input type="text" id="NM_PESSOA" name="NM_PESSOA" />
                    </div>
                    <br />
                    <div className="form-grid">
                        {/* Outros grupos de formulário são convertidos de maneira semelhante */}
                    </div>

                    {/* Repita o padrão para outras seções como "Dados dos Documentos", "Endereço", etc. */}

                    <h2>Documentos Digitalizados</h2>

                    <section className="instrucoes">
                        <ul>
                            {/* Itens da lista */}
                        </ul>
                    </section>
                    <br />

                    <div className="form-grid">
                        {/* Inputs de upload de arquivo */}
                    </div>

                    <div className="botao">
                        <input type="submit" value="Cadastrar Atleta" />
                    </div>
                </form>
            </main>

            {/* Tag de script */}
            <script src="../../backend/controller/PessoaFisicaController.js"></script>
        </div>
    );
}

export default CadastroNovoAtleta;
