import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Form, FormGroup, Label, Input } from 'reactstrap';

const ViewEditarFuncao = () => {
  const { CD_FUNCAO } = useParams();
  const [funcao, setFuncao] = useState({ nome: '', descricao: '' });

  useEffect(() => {
    const fetchFuncao = async () => {
      try {
        const response = await axios.get(`/funcao/${CD_FUNCAO}`);
        setFuncao(response.data);
      } catch (error) {
        console.error("Erro ao buscar função", error);
      }
    };
    fetchFuncao();
  }, [CD_FUNCAO]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFuncao({ ...funcao, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/funcao/atualizar/${CD_FUNCAO}`, funcao);
      // Navegar de volta para a lista de funções ou mostrar uma mensagem de sucesso
    } catch (error) {
      console.error("Erro ao atualizar função", error);
    }
  };

  return (
    <Container>
      <h1>Editar Função</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="nome">Nome</Label>
          <Input
            type="text"
            name="nome"
            id="nome"
            value={funcao.nome}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="descricao">Descrição</Label>
          <Input
            type="text"
            name="descricao"
            id="descricao"
            value={funcao.descricao}
            onChange={handleInputChange}
          />
        </FormGroup>
        <Button type="submit">Salvar</Button>
      </Form>
    </Container>
  );
};

export default ViewEditarFuncao;
