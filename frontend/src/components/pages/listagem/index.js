import { useState, useEffect } from 'react';
import { get, remove } from '../../../utlis/api';
import { Input, Button, Row, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import ExportPDF from './ExportPDF'; // Importa o componente ExportPDF
import Item from './item'; // Certifique-se que o caminho está correto
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
  const [pessoas, setPessoas] = useState([]);
  const [isExporting, setIsExporting] = useState(false); // Novo estado
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [modal, setModal] = useState(false);

  const editarUsuario = (usuarioId) => {
    // Corrige a lógica para editar corretamente
    navigate(`/associado?id=${usuarioId}`);
  };

  // Função que abre o modal de confirmação
  const confirmDelete = (usuario) => {
    setSelectedUsuario(usuario); // Armazena o usuário selecionado
    setModal(true); // Abre o modal
  };

  // Função que faz a exclusão
  const handleDelete = async () => {
    if (selectedUsuario) {
      try {
        await remove(`/associado/cadastratos/grid/deletar/${selectedUsuario}`);
        setModal(false); // Fecha o modal após exclusão
        setUpdate(!update); // Força a atualização da listagem
      } catch (error) {
        console.error('Erro ao excluir usuário', error);
      }
    }
  };

  useEffect(() => {
    get('/associado/cadastratos/grid', { nome, Modalidade, Deficiencia, Funcao }).then(({ data }) => {
      const aux = data?.pessoas?.length > 0 ? data?.pessoas.map(item => item.id) : [];
      setItens(Array.isArray(data.pessoas) ? data.pessoas : []);
      setPessoas(aux);
    });
  }, [nome, Modalidade, Deficiencia, Funcao, update]);

  const handleExport = () => {
    if (pessoas.length > 0) {
      setIsExporting(true); // Define como exportando
      get(`/associado/cadastratos/grid/exportar/${pessoas}`)
        .then(({ data }) => {
          setExportData(data);
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
        <a href="/menu">
          <img src="/assets/img/cepe_joinville_laranja 2.png" alt="logo" className="logo" />
        </a>
        <div className="divisao">
          <p>Nome</p>
          <Input type="search" className="buscar-" id="busca_nome" onChange={(e) => setNome(e.target.value)} />
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
        <Button className='btns' color="default" onClick={handleExport} disabled={isExporting}>
          {isExporting ? 'Exportando...' : 'Exportar PDF'}
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
              {itens.map((item) => {
                return <Item key={`item_${item.id}`} item={item}
                  deletarUsuario={confirmDelete} // Chama a função de exclusão
                  editarUsuario={editarUsuario} /> // Chama a função de edição
              })}
            </tbody>
          </table>
        </div>
      </Row>
      <Button color="default" className='btns' onClick={() => navigate('/menu')}>Voltar</Button>

      {exportData.length > 0 && <ExportPDF data={exportData} />}

      {/* Modal de confirmação de exclusão */}
      <Modal isOpen={modal} toggle={() => setModal(false)}>
        <ModalHeader toggle={() => setModal(false)}>Confirmação de Exclusão</ModalHeader>
        <ModalBody>
          Tem certeza de que deseja excluir o associado {selectedUsuario?.nome}?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>Excluir</Button>{' '}
          <Button color="secondary" onClick={() => setModal(false)}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Listagem;
