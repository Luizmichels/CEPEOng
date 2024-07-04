import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./listagem.scss";
import Item from "./item";
import { get } from "../../../utlis/api";
import {Input, Button} from "reactstrap";
import { NotificacaoManager } from "../../notificacao";

const Listagem = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('')
  const [Modalidade, setModalidade] = useState('')
  const [Deficiencia, setDeficiencia] = useState('')
  const [Funcao, setFuncao] = useState('')
  const [itens, setItens] = useState([])
  const [update, setUpdate] = useState(false)
  const editarUsuario = (id) => {
    // lógica para editar o usuário com o ID fornecido
    // window.location.href = `editar_usuario.html?id=${id}`;
    // navigate(`editar_usuario.html?id=${id}`);
    NotificacaoManager.warning('Em Dev', undefined, 2000)
  };

  const deletarUsuario = (id) => {
    // lógica para deletar o usuário com o ID fornecido
    if (window.confirm('Tem certeza que deseja deletar este usuário?')) {
      // Lógica de exclusão
      alert(`Usuário ${id} deletado.`);
      get('/deletar/:CD_PESSOA_FISICA'+id).then(() => {
        setUpdate((c) => !c);
      });
    }
  };

  useEffect(()=> {
    get('/associado/cadastratos/grid', {nome, Modalidade, Deficiencia, Funcao}).then(({data})=>{
      setItens(data.pessoas);
    })
  }, [nome, Modalidade, Deficiencia, Funcao, update])

  return (
    <div className="tela">
      <header>
        <a href="/menu">
          <img src="/assets/img/cepe_joinville_laranja 2.png" alt="logo" className="logo"/>
        </a>
        <div className="divisao">
          <p>Nome</p>
          <Input  type="search" className="buscar" id="busca_nome" onChange={(e) => {
            setNome(e.target.value)
          }} />
        </div>
        <div className="divisao">
          <p>Modalidade</p>
          <Input type="search" className="buscar" id="busca_nome" onChange={(e) => {
            setModalidade(e.target.value)
          }} />        
          </div>
        <div className="divisao">
          <p>Deficiência</p>
          <Input type="search" className="buscar" id="busca_nome" onChange={(e) => {
            setDeficiencia(e.target.value)
          }} />        
          </div>
        <div className="divisao">
          <p>Função</p>
          <Input type="search" className="buscar" id="busca_nome" onChange={(e) => {
            setFuncao(e.target.value)
          }} />        
          </div>
        <Button color="default" onClick={async ()=>{

          try {
            const response = await get('/associado/cadastratos/grid/exportar' ,{nome}, {
              responseType: 'blob'
            });
            // commit test
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
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {itens.map((item)=>{
            return <Item key={`item_${item.id}`} item={item}
              deletarUsuario={deletarUsuario}
              editarUsuario={editarUsuario} />
          })}
        </tbody>
      </table>
      <div className="voltar">Voltar</div>
    </div>
  );
};

export default Listagem;
