import { useState, useEffect } from 'react';
import { get } from '../../../utlis/api';
import { Input, Button, Row } from 'reactstrap';
import { NotificacaoManager } from '../../notificacao';
import Item from './item';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useNavigate } from 'react-router-dom';
import ExportPDF from './ExportPDF';
import './listagem.scss';

const Listagem = () => {
  const [nome, setNome] = useState('');
  const [Modalidade, setModalidade] = useState('');
  const [Deficiencia, setDeficiencia] = useState('');
  const [Funcao, setFuncao] = useState('');
  const [itens, setItens] = useState([]);
  const [update, setUpdate] = useState(false);
  const [exportData, setExportData] = useState([]);
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false)

  const editarUsuario = (id) => {
    NotificacaoManager.warning('Em Dev', undefined, 2000);
  };

  const deletarUsuario = (id) => {
    if (window.confirm('Tem certeza que deseja deletar este usuário?')) {
      alert(`Usuário ${id} deletado.`);
      get('/deletar/' + id).then(() => {
        setUpdate((c) => !c);
      });
    }
  };

  useEffect(() => {
    get('/associado/cadastratos/grid', { nome, Modalidade, Deficiencia, Funcao }).then(({ data }) => {
      setItens(Array.isArray(data.pessoas) ? data.pessoas : []);
    });
  }, [nome, Modalidade, Deficiencia, Funcao, update]);

  const ExportarDados = () => {
    const CD_PESSOA_FISICA = itens.length > 0 ? itens.map(item => item.id) : [];
    if (CD_PESSOA_FISICA.length > 0) {
      get(`/associado/cadastratos/grid/exportar/${CD_PESSOA_FISICA}`)
      .then(({ data }) => {
        setExportData(data);
        setLoaded(true);
      })
      .catch((e) => {
        console.log(e);
      })
    }
  };

  return (
    <div className="tela">
      <header>
        <a href="/menu">
          <img src="/assets/img/cepe_joinville_laranja 2.png" alt="logo" className="logo" />
        </a>
        <div className="divisao">
          <p>Nome</p>
          <Input type="search" className="buscar" id="busca_nome" onChange={(e) => setNome(e.target.value)} />
        </div>
        <div className="divisao">
          <p>Modalidade</p>
          <Input type="search" className="buscar" id="busca_modalidade" onChange={(e) => setModalidade(e.target.value)} />
        </div>
        <div className="divisao">
          <p>Deficiência</p>
          <Input type="search" className="buscar" id="busca_deficiencia" onChange={(e) => setDeficiencia(e.target.value)} />
        </div>
        <div className="divisao">
          <p>Função</p>
          <Input type="search" className="buscar" id="busca_funcao" onChange={(e) => setFuncao(e.target.value)} />
        </div>
        <Button color="default" onClick={ExportarDados}>
          <PDFDownloadLink
            document={loaded && (<ExportPDF data={exportData} />)}
            fileName="associados.pdf"
          >
            {({ loading }) => (loading ? 'Gerando PDF...' : 'Exportar PDF')}
          </PDFDownloadLink>
        </Button>
      </header>
      <h1>Listagem</h1>
      <Row className="main-content">
        <div className="actions-container d-flex">
          <table className="grid">
            <thead className="tituloFixo">
              <tr>
                <th>Foto</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>Deficiência</th>
                <th>Modalidade <br /> Esportiva</th>
                <th>Função</th>
                <th className="tchau"></th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(itens) && itens.map((item) => <Item key={`item_${item.id}`} item={item} />)}
            </tbody>
          </table>
        </div>
      </Row>
      <Button color="default" className="voltar" onClick={() => navigate('/menu')}>Voltar</Button>
    </div>
  );
};

export default Listagem;
