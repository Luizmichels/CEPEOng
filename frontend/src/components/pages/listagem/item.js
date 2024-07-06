export default function Item({ item, editarUsuario, deletarUsuario }) {
  console.log(item);
  const {
    id, Foto, CPF, Nome, Deficiencia, Modalidade, Função: Funcao
  } = item;
  return (
    <tr>
      <td><img src={`http://localhost:5000/imagem/${Foto}`} /></td>
      <td>{Nome}</td>
      <td>{CPF}</td>
      <td>{Deficiencia}</td>
      <td>{Modalidade}</td>
      <td>{Funcao}</td>
      <td>
        <button className="editar" onClick={() => editarUsuario(id)}>
          <img
            src="../../../../public/assets/img/Pencil.png"
            alt="Editar"
          />
        </button>
        <br />
        <button className="deletar" onClick={() => deletarUsuario(id)}>
          <img
            src="../../../../public/assets/img/Delete.png"
            alt="Deletar"
          />
        </button>
      </td>
    </tr>
  )
}