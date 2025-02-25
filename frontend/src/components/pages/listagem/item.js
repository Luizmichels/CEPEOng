import { FaEdit, FaTrash } from 'react-icons/fa';
import './item.scss';
// import { useNavigate } from 'react-router-dom';

export default function Item({ item, editarUsuario, deletarUsuario }) {
  const { Foto, CPF, Nome, Deficiencia, Modalidade, Função: Funcao, id, cd_usuario: cdUsuario } = item;

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
      <td className='acao'>
        <div className='d-flex w-100 flex-column justify-content-center'>
          <div onClick={() => deletarUsuario(id)}>  
            <FaTrash aria-label="Deletar" className="deletar mb-3" height={14}/>
            </div>
          <div onClick={() => editarUsuario(cdUsuario)}>
            <FaEdit aria-label="Editar" className='editar' />
          </div>
        </div>
      </td>
    </tr>
  );
}
