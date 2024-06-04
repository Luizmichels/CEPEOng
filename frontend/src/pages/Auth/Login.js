import React from 'react';
import styles from './login.module.css';
import logo from '../../assets/img/cepe_joinville_laranja_2.png';
import campeoes from '../../assets/img/campeoes.png';

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.tela}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <div className={styles.campos}>
          <h2>Login</h2>
          <div className={styles.usuarioesenha}>
            <label>Usuário, Email ou CPF</label>
            <input type="text" className={styles.user} />
            <label>Senha</label>
            <input type="password" className={styles.senha} />
          </div>
          <div className={styles.esqueci}>Esqueceu a senha?</div>
        </div>
        <div className={styles.rodapes}>
          <div className={styles.quero}>Quero me associar</div>
          <a href="/menu">
            <input type="submit" value="Entrar" />
          </a>
        </div>
      </div>
      <div className={styles.imagemzona}>
        <img src={campeoes} alt="Campeões" />
      </div>
    </div>
  );
};

export default Login;
