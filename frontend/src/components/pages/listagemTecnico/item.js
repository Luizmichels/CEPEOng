import './item.scss';

export default function Item({ item }) {
  const { Foto, CPF, Nome, Deficiencia, Modalidade, Função: Funcao } = item;

  return (
    <tr>
      <td>
        <img src={`http://localhost:5000/imagem/atleta/${Foto}`} />
      </td>
      <td>{Nome}</td>
      <td>{CPF}</td>
      <td>{Deficiencia}</td>
      <td>{Modalidade}</td>
      <td>{Funcao}</td>
    </tr>
  );
}
