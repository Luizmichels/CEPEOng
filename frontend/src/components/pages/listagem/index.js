import { useState, useEffect } from 'react';
import { get } from '../../../utlis/api';
import { Input, Button } from 'reactstrap';
import { NotificacaoManager } from '../../notificacao';
import Item from './item';
import { PDFDownloadLink } from '@react-pdf/renderer';
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

  const ExportarDados = async () => {
    try {
      const CD_PESSOA_FISICA = itens.map(item => item.id);
      const associado = await get(`/associado/cadastratos/grid/exportar/${CD_PESSOA_FISICA}`)
      console.log(associado.data, 'aquiii')
      setExportData(associado.data);
    } catch (error) {
      console.error('Erro ao exportar dados:', error);
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
            document={<ExportPDF data={exportData} />}
            fileName="associados.pdf"
          >
            {({ loading }) => (loading ? 'Gerando PDF...' : 'Exportar PDF')}
          </PDFDownloadLink>
        </Button>
      </header>
      <h1>Listagem</h1>
      <div className="actions-container d-flex">
        <table className="grid">
          <thead>
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
      <Button color="default" className="voltar">Voltar</Button>
    </div>
  );
};

export default Listagem;
