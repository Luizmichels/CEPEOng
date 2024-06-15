import React, { useState, useEffect } from 'react';

const Table = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/users'); // Endpoint para buscar usuários
      if (!response.ok) {
        throw new Error('Erro ao buscar usuários');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const editarUsuario = (id) => {
    // Redirecionar para a página de edição do usuário com o ID fornecido
    window.location.href = `/editar_usuario?id=${id}`;
  };

  const deletarUsuario = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este usuário?')) {
      try {
        const response = await fetch(`http://localhost:5000/users/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error('Erro ao deletar usuário');
        }
        alert(`Usuário ${id} deletado.`);
        fetchUsers(); // Atualizar a lista de usuários após a exclusão
      } catch (error) {
        console.error('Erro:', error);
      }
    }
  };

  return (
    <div className="tela">
      <h1>Listagem</h1>
      <table className="grid">
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Deficiência</th>
            <th>Modalidade Esportiva</th>
            <th>Função</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.foto}</td>
              <td>{user.nome}</td>
              <td>{user.cpf}</td>
              <td>{user.deficiencia}</td>
              <td>{user.modalidade}</td>
              <td>{user.funcao}</td>
              <td>
                <button className="editar" onClick={() => editarUsuario(user.id)}>
                  <img src="../../../../public/assets/img/Pencil.png" alt="Editar" />
                </button>
                <br />
                <button className="deletar" onClick={() => deletarUsuario(user.id)}>
                  <img src="../../../../public/assets/img/Delete.png" alt="Deletar" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="voltar">Voltar</div>
    </div>
  );
};

export default Table;
