import { useState, useEffect } from "react";
import "./listagem.scss";
import Item from "./item";
import { get } from "../../../utlis/api";
import { Input, Button } from "reactstrap";
import { getId } from "../../../utlis";

const Listagem = () => {
  const [nome, setNome] = useState('');
  const [Modalidade, setModalidade] = useState('');
  const [Deficiencia, setDeficiencia] = useState('');
  const [Funcao, setFuncao] = useState('');
  const [itens, setItens] = useState([]);
  const [userId] = useState(getId());

  useEffect(() => {
    get('/associado/cadastratos/grid/tecnico', { nome, Modalidade, Deficiencia, Funcao, userId }).then(({ data }) => {
      setItens(data.pessoas);
    });
  }, [nome, Modalidade, Deficiencia, Funcao]);

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
        <Button color="default" onClick={async () => {
          try {
            const response = await get('/associado/cadastratos/grid/exportar', { nome }, {
              responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'pessoas.xlsx');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
          } catch (error) {
            console.error('Erro ao fazer o download do arquivo', error);
          }
        }}>Exportar</Button>
      </header>
      <h1>Listagem</h1>
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
      <div className="voltar">Voltar</div>
    </div>
  );
};

export default Listagem;
