import { useState, useEffect } from "react";
import "./listagem.scss";
import Item from "./item";
import { get } from "../../../utlis/api";
import { Input, Button, Row } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import { getId } from "../../../utlis";
import ExportPDF from '../listagem/ExportPDF';

const Listagem = () => {
  const [nome, setNome] = useState('');
  const [Modalidade, setModalidade] = useState('');
  const [Deficiencia, setDeficiencia] = useState('');
  const [Funcao, setFuncao] = useState('');
  const [itens, setItens] = useState([]);
  const [userId] = useState(getId());
  const navigate = useNavigate();
  const [pessoas, setPessoas] = useState([]);
  const [exportData, setExportData] = useState([]);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    get('/associado/cadastratos/grid/tecnico', { nome, Modalidade, Deficiencia, Funcao, userId }).then(({ data }) => {
      const aux = data?.pessoas?.length > 0 ? data?.pessoas.map(item => item.id) : [];
      setItens(Array.isArray(data.pessoas) ? data.pessoas : []);
      setPessoas(aux);
    });
  }, [nome, Modalidade, Deficiencia, Funcao]);

  const handleExport = () => {
    if (pessoas.length > 0) {
      setIsExporting(true); // Define como exportando
      get(`/associado/cadastratos/grid/exportar/${pessoas}`)
        .then(({ data }) => {
          setExportData(data); // Atualiza os dados de exportação com a nova resposta
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setIsExporting(false); // Termina a exportação
        });
    }
  };

  return (
    <div className="tela">
      <header>
        <a href="/menu-tecnico">
          <img src="/assets/img/cepe_joinville_laranja 2.png" alt="logo" className="logo" />
        </a>
        <div className="divisao">
          <p>Nome</p>
          <Input type="search" className="buscar" id="busca_nome" onChange={(e) => {
            setNome(e.target.value);
          }} />
        </div>
        <div className="divisao">
          <p>Modalidade</p>
          <Input type="search" className="buscar" id="busca_modalidade" onChange={(e) => {
            setModalidade(e.target.value);
          }} />
        </div>
        <div className="divisao">
          <p>Deficiência</p>
          <Input type="search" className="buscar" id="busca_deficiencia" onChange={(e) => {
            setDeficiencia(e.target.value);
          }} />
        </div>
        <div className="divisao">
          <p>Função</p>
          <Input type="search" className="buscar" id="busca_funcao" onChange={(e) => {
            setFuncao(e.target.value);
          }} />
        </div>
        <Button color="default" onClick={handleExport} disabled={isExporting}>
          {isExporting ? 'Exportando...' : 'Exportar PDF'}
        </Button>
      </header>
      <h1>Listagem</h1>
      <Row className="main-content">
        <table className="grid">
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Deficiência</th>
              <th>Modalidade <br /> Esportiva</th>
              <th>Função</th>
            </tr>
          </thead>
          <tbody>
            {itens.map((item) => {
              return <Item key={`item_${item.id}`} item={item} />;
            })}
          </tbody>
        </table>
      </Row>
      <Button color="default" className="voltar" onClick={() => navigate('/menu-tecnico')}>Voltar</Button>
      {exportData.length > 0 && !isExporting && <ExportPDF data={exportData} />}
    </div>
  );
};

export default Listagem;
