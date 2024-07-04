# CEPE Projeto

## O que é a CEPE?

O CEPE - Centro Esportivo Para Pessoas Especiais é uma ONG que representa um marco do esporte paralímpico no estado catarinense.

Projeto pioneiro o CEPE surgiu do sonho de duas professoras de educação física Ana Teixeira e Sonia Ribeiro, Ana era uma atleta do basquetebol convencional, em meados dos anos 90 iniciou sua carreira como técnica do basquetebol em cadeira de rodas e Sonia iniciando seus estudos na área de classificadora funcional. Ambas tiveram a oportunidade de percorrer por alguns anos o Brasil e outros países através de intercâmbios ou acompanhando competições paradesportivas.

## Visão

1. Objetivo:

O sistema de associados da nossa ONG foi desenvolvido com o intuito de facilitar e otimizar a gestão dos membros. Ele oferece uma plataforma centralizada para registrar novos associados, atualizar informações, gerenciar associações e emitir relatórios. Além disso, o sistema melhora a comunicação entre a ONG e seus associados, garantindo que todos estejam informados sobre atividades, eventos e novidades

2. Visão Geral do Sistema:

Este sistema foi projetado para ser uma ferramenta abrangente e intuitiva, capaz de atender às diversas necessidades de gestão de associados. Através de uma interface amigável e funcionalidades robustas, o sistema permite que administradores da ONG gerenciem os dados dos associados de maneira eficiente e segura. Entre suas principais funcionalidades estão o registro de novos associados, atualização de informações pessoais, gerenciar permissões e geração de relatórios.

3. Público-Alvo

O sistema é destinado a três principais grupos de usuários:

- Administradores da ONG: Usuários responsáveis pela gestão geral dos associados, incluindo o registro, atualização e cancelamento de associações, bem como a emissão de relatórios e análise de dados.

- Funcionários Responsáveis pela Gestão de Associados: Usuários que auxiliam os administradores na manutenção diária dos dados dos associados, comunicação com membros e apoio na emissão de relatórios.

- Associados: Membros da ONG que podem utilizar o sistema para atualizar suas informações pessoais, acessar dados de suas associações e receber notificações e comunicações importantes.

## Instalação na base local

1. Passo 1: Baixar o Sistema

- Acesse o repositório oficial do sistema (GitHub)
- Baixe o pacote do sistema ou clone o repositório:

```
git clone https://github.com/Luizmichels/CEPEOng.git
```

2. Passo 2: Configurar o Banco de Dados

- Instale o MySQL no seu servidor.
- Inicie o serviço MySQL.
- Crie um banco de dados para o sistema:

```
CREATE DATABASE cepe;
```

3. Passo 3: Configurar o Servidor Backend

- Navegue até o diretório do backend do sistema:

```
cd ./backend/
```

- Instale as dependências do Node.js:

```
npm install
```

- Crie um arquivo de configuração .env com as informações do banco de dados:

DB_HOST=localhost
DB_USER=user
DB_PASS=senha
DB_NAME=cepe
PORT= 3000

- Inicie o servidor backend:

```
npm start
```

4. Passo 4: Configurar o Frontend

- Navegue até o diretório do frontend do sistema:

cd ./frontend/
Instale as dependências do Node.js:

```
npm install
```

- Crie um arquivo de configuração .env para o frontend:

```
REACT_APP_API_URL=http://localhost:3000
```

- Inicie o servidor frontend:

```
npm start
```

5. Passo 5: Testar a Instalação

- Acesse o sistema através do navegador web (e.g., http://localhost:3000).
- Verificar se a tela de login é exibida corretamente

## Usuabilidade

1. Tela de login

Descrição: Tela onde os usuários inserem suas credenciais para acessar o sistema.

Passos para uso:

- Informe seus dados de acordo com os campos obrigatórios
- Clique no botão de "Login"
- Se as credenciais estiverem corretas, você será redirecionado para a tela de menu. Caso contrário, uma mensagem de erro será exibida
- Caso o usuário não se recorde mais da sua senha, possui a opção de "esqueci minha senha" onde o usuário poderá estar recuperando na tela de esqueci minha senha

2. Tela de Menu

Descrição: Tela onde os usuários podem acompanhar um Dashboard da quantidade de atletas por esportes e a taxa de adesão aps esportes

- Poderá acompanhar Dashboards da quantidade de atletas por esportes e a taxa de adesão aps esportes
- Botão de Cadastrar novo item, levará à tela com opções de acordo com o cadastro que o usuário escolher para cadastrar
- Botão Listagem de atletas, levará À tela de listagem de atletas

3. Tela de Cadastrar Novo Item

Descrição: Tela onde os usuários poderão escolher a opção de cadastro para realizar o mesmo

- Botão de Novo Usuário, levará a tela de Novo usuário onde o usuário poderá fazer uma solicitação de cadastro para se tornar um associado
- Botão de Novo Associado, levará a tela de Novo Associado onde que a solicitação do usuário foi aceito ele poderá realizar o cadastro completo com todas as informações necessárias
- Botão de Alterar o Cadastro, levará a tela de Alterar o Cadastro onde usuário poderá alterar as informções feitas no seu cadastro
- Botão de Nova Modalidade, levará a tela de Nova Modalidade onde o usuário poderá cadastrar uma nova modalidade
- Botão de Equipamento de Locomoção, levará a tela de Equipamento de Locomoção onde o usuário poderá realizar o cadastro de um meio de locomoção
- Botão de Função, levará a tela de Função onde o usuário poderá realizar o cadastro de uma nova função
- Botão de Nova Deficiência, levará a tela de Nova deficiência onde o usuário poderá cadastrar uma nova deficiência

4. Tela de Novo usuário

Descrição: Tela onde o administrador poderá fazer uma solicitação de cadastro de um novo usuário

- Ele lista todos usuários
- Preencher os campos obrigatórios como usuário e senha
- Clicar no botão "enviar a solicitação" e aguardar a solicitação

5. Tela de Novo Associado

Descrição: Tela de cadastro de Novo Associado onde o usuário realizará o cadastro com suas informações para se tornar mais um atleta na ONG

- Preencher todos os campos obrigatórios
- Seguir os comandos descritos no final da página
- Anexar os arquivos obrigatórios
- Clicar no botão "cadastrar" e depois irá validar o cadastro

6. Tela de Alterar Cadastro

Descrição: Tela de alterar cadastro onde o usuário poderá realizar a alterção das informações já cadastradas no sistema

- Preencher todos os campos que deseja realizar a alteração
- Clicar no botão "alterar" e depois irá validar o cadastro

7. Tela de Nova Modalidade

Descrição: Tela de nova modalidade onde o usuário poderá cadastar uma nova modalidade

- Preencher dados obrigatórios como nome e a função da modalidade
- Clicar no botão "cadastrar modalidade" e depois irá validar o cadastro

8. Tela de Equipamento de locomoção

Descrição: Tela de Equipamento de Locomoção onde o usuário poderá cadastrar um meio de locomoção

- Preencher os dados obrigatórios como o nome do equipamento e a descrição dele
- Clicar no botão "Cadastrar Equipamento de Locomoção" e depois irá validar o cadastro

9. Tela de Nova Função

Descrição: Tela de Nova Função onde o usuário poderá cadastra uma nova função

- Preencher os daods obrigatórios como o nome da função e a descrição
- Clicar no botão "Cadastrar Nova Função" e depois irá validar o cadastro

10. Tela de Nova Deficiência

Descrição: Tela de nova deficiência onde o usuário poderá cadastrar uma nova deficiÊncia no sistema

- Preencher os dados obrigatórios como o tipo da deficiência e sua nomenclatura
- Clicar no botão "Cadastrar uma nova deficiência" e depois irá validar o cadastro

11. Tela de Listagem

Descrição: Tela de Listagem onde ele lista todos os atletas cadastrados da ONG

- No cabeçalho tem como buscar por uma atleta específico preenchendo os campos de nome e deficiência do atleta
- Clicar no botão "buscar" para filtar informções preenchidas nos campos do cabeçalho
- Clicar no botão "exportar" para exportar um relatório com os atletas filtrados
- Lista dados dos atletas como Foto, Nome, CPF, Deficiência, Modalidade e entre outros

12. Tela Quero me  Associar 

 Descrição: Tela de Quero me Associar onde um novo usuário pode enviar uma solictação de cadastrado para o administrador da ONG realizar

 - Preencher campos obrigatórios como Nome, Telefone e E-mail
 - Clicar no botão "Enviar" para validar a solicitação
 - Ele envia a solicitação para o e-mail da ONG, onde o admin pode estar cadastrando esse novo usuário


13. Tela de Esqueci a Senha

Descrição: Tela de Esqueci minha Senha onde o usuário já cadastrado no sistema pode estar requisitando uma nova senha para acessar o sistema

- Preencher campo obrigatório com Usuário, Email ou CPF
- Clicar no botão "Enviar" para validar a solicitação

