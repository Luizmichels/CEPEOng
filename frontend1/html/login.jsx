import React, { Component } from 'react';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    
    // Aqui você faria a requisição para o servidor
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao fazer login');
      }
      // Tratar a resposta do servidor conforme necessário
    })
    .catch(error => {
      console.error('Erro:', error);
    });
  }

  render() {
    const { username, password } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="usuarioesenha">
          Usuário, Email ou CPF
          <br />
          <input 
            type="text" 
            name="username" 
            value={username} 
            onChange={this.handleChange} 
          />
          <br />
          Senha
          <br />
          <input 
            type="password" 
            name="password" 
            value={password} 
            onChange={this.handleChange} 
          />
        </div>
        <br />
        <div className="esqueci"> Esqueceu a senha? </div>
        <br />
        <input type="submit" placeholder="Entrar" value="Entrar" />
      </form>
    );
  }
}

export default LoginForm;
