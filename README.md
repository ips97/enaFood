# EnaFood

## O que é?
Este projeto foi elaborado para cumprimento de desafio técnico do processo seletivo, da Empresa ENACOM, no qual consiste no desenvolvimento de uma API Back-end semelhante ao Ifood.

A API foi elaborada com a linguagem JavaScript como base, utilizando o NodeJs e com o Banco de Dados Mongodb, tem controle de perfil de usuários (Usuário público e ADM), 
para acessos de funcionalidades.

Considerando as fases do projeto informadas, há um limite de quantidade de itens a serem inseridos no carrinho de compras predefinidos via Variável de Ambiente.


## Implementação

É necessário fazer a instalação das dependências via "npm install".
De ter o MongoDB instalado na máquina ou a URL do MongoAtlas inserida como Variável de Ambiente.

E configurar as Variavéis de Ambiente dentro do arquivo .env:
NODE_ENV (para definir se o ambiente do sistema é "development" (para o ambiente de desenvolvimento) ou "production" (para o ambiente de produção), se for escolhido o production será necessário informar o URL do Mongo Atlas para conexão com o banco de dados);
URL_MONGO (para definir a URL do MongoAtlas);
QTD_CARRINHO (para definir a quantidade de itens que serão permitidos por pedido, mediante a fase do projeto);
TOKEN_SECRET (para definir a Chave de Segredo da criptação de token do JWT para verificação de login e autenticação);

## Como Utilizar A API

A API funciona via conexão HTTP utilizando o padrão REST.
Abaixo segue a URL das conexões e seus métodos:


Método = POST, URL = "www.dominio.com/usuario/add" - É para criar um usuário de perfil comum, é necessário passar no corpo da requisição um objeto com o nome "usuario" com os campos: nome, sobrenome, email, cpf, senha, dataNascimento (a senha será criptografada antes de salva no banco de dados)

Método = POST, URL = "www.dominio.com/usuario/login" - É para fazer o login do usuário no sistema, é necessário passar no body da requisição, um objeto "usuario" com os campos: cpf e senha. Esse método tem a resposta do TOKEN de autenticação usuário que deverá ser passada no header, para todas as outras requisições no sistema

Método = GET, URL = "www.dominio.com/usuario/:cpf" - É para fazer a procura de usuário por pelo CPF no banco de dados, o CPF tem que ser passado como parametro no local ":cpf", também é necessário ter o TOKEN de login no Header da requisição, que é liberado na resposta momento de login

Método = PUT, URL = "www.dominio.com/usuario/update" - É para fazer a atualização de dados do usuário cadastrado, é necessário passar no body da requisição, o objeto "usuario" com os campos (_id, nome, sobrenome, email, cpf, senha (caso altere) e dataNascimento)  e o TOKEN no header

Método = DELETE, URL = "www.dominio.com/usuario/:_id" - É para fazer a exclusão de usuário no sistema, tem que ser passado o id do usuario via parametro na url, no lugar do ":_id" e o TOKEN no header

Método = POST, URL = "www.dominio.com/formaPagamento/add" - É para fazer a criação de uma forma de pagamento do usuário no banco de dados, é necessário passar um objeto "formaPagamento", com os campos: numeroCartao, nomeTitular, tipoCartao, cpfTitular, vencimentoCartao, codCartao, no body e o TOKEN no header

Método = GET, URL = "www.dominio.com/formaPagamento/search" - É para fazer a requisição de pesquisa de todas as formas de pagamento salvas com o Id do usuário, é necessário passar o TOKEN de login no header do usuário

Método = DELETE, URL = "www.dominio.com/formaPagamento/:id" - É para fazer a exclusão de forma de pagamento, é necessário passar o id da forma de pagamento na url (:id), é necessário passar o TOKEN de login no header do usuário

Método = PUT, URL = "www.dominio.com/formaPagamento/update" - É para fazer a atualização de dados doa forma de pagamento cadastrada, é necessário passar no body da requisição, o objeto "formaPagamento" com os campos (_id, numeroCartao, nomeTitular, tipoCartao, cpfTitular, vencimentoCartao, codCartao), é necessário passar o TOKEN de login no header do usuário

Método = POST, URL = "www.dominio.com/carrinho/add" - É para fazer a criação do carrinho de compras atrelada ao usuário, é necessário passar o TOKEN de login no header do usuário

Método = GET, URL = "www.dominio.com/carrinho/search" - É para fazer a requisição de pesquisa do carrinho no BD (Banco de Dados), é necessário passar o TOKEN de login no header do usuário

Método = PUT, URL = "www.dominio.com/carrinho/addItem" - É para adicionar um novo produto no carrinho, é necessário passar um objeto "produto", com os campos: idProduto, qtd no body e o TOKEN no header

Método = DELETE, URL = "www.dominio.com/carrinho/:idItem" - É para fazer a exclusão de item no carrinho, é necessário passar o id do item na url (:idItem), é necessário passar o TOKEN de login no header do usuário

Método  = PUT, URL = "www.dominio.com/carrinho/altQtd" - É para alterar a quantidade de um produto no carrinho, é necessário passar um objeto "produto", com os campos: idItem, idProduto, qtd no body e o TOKEN no header

Método = POST, URL = "www.dominio.com/pedido/add" - É para fazer a criação do pedido atrelado ao usuário, é necessário passar um objeto "pedido", com os campos: cpfCliente, endEntrega (objeto com CEP, NOME DA RUA, NUMERO, COMPLEMENTO), formaPagamento (objeto que tem que ser buscado antes na api)  no body e o TOKEN de login no header do usuário

Método = GET, URL = "www.dominio.com/pedido/allPedido" - É para fazer a requisição de pesquisa de todos os pedidos do usuário no BD (Banco de Dados), é necessário passar o TOKEN de login no header do usuário

Método = GET, URL = "www.dominio.com/pedido/:idPedido" - É para fazer a requisição de pesquisa pedido no BD (Banco de Dados), é necessário passar o id do pedido na url (:idPedido), é necessário passar o TOKEN de login no header do usuário

Método = DELETE = "www.dominio.com/pedido/:idPedido" - É para fazer o cancelamento do pedido, é necessário passar o id do pedido na url (:idPedido), é necessário passar o TOKEN de login no header do usuário

Método = GET, URL = "www.dominio.com/usuario/:cpf" - É para fazer a requisição de pesquisa usuário administrador no BD (Banco de Dados), é necessário passar o CPF na url (:cpf), é necessário passar o TOKEN de login no header do usuário

Método  = PUT, URL = "www.dominio.com/usuario/update" - É para fazer a atualização de dados do usuário cadastrado, é necessário passar no body da requisição, o objeto "usuario" com os campos (_id, nome, sobrenome, email, cpf, dataNascimento) e o TOKEN de login no header do usuário

Método = GET, URL = "www.dominio.com/usuario/all" - É para fazer a requisição de pesquisa de todos os usuários no BD (Banco de Dados), é necessário passar o TOKEN de login no header do usuárioAdmin

Método = DELETE, URL = "www.dominio.com/usuario/:_id" - É para fazer a exclusão de usuário no sistema, tem que ser passado o id do usuario via parametro na url, no lugar do ":_id" e o TOKEN do Admin  no header

Método = POST, URL = "www.dominio.com/produto/add" - É para fazer a criação de produtos, é necessário passar um objeto "produto", com os campos: (nome, codBarra, categoria, valor, estoque) no body e o TOKEN de login no header do usuário

Método = GET, URL = "www.dominio.com/produto/:codBarra" - É para fazer a requisição de pesquisa de produto no BD (Banco de Dados), tem que ser passado o código de barra do produto via parametro na url, no lugar do ":codBarra" e o TOKEN do Admin  no header

Método = DELETE, URL = "www.dominio.com/produto/:_id" - É para fazer a exclusão de produto no sistema, tem que ser passado o id do usuario via parametro na url, no lugar do ":_id" e o TOKEN do Admin  no header

Método  = PUT, URL = "www.dominio.com/produto/update" - É para fazer a atualização de dados do produto cadastrado, é necessário passar no body da requisição, o objeto "produto" com os campos (nome, codBarra, categoria, valor, estoque) e o TOKEN de login no header do usuárioAdmin

Método = GET, URL = "www.dominio.com/produto/all" - É para fazer a requisição de todos os produtos no BD (Banco de Dados), tem que ser passado o TOKEN do Admin no header





