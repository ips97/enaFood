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
NODE_ENV (para definir se o ambiente do sistema é "development" ou "production", se for production será necessário informar o URL do Mongo Atlas para conexão com o banco de dados)
URL_MONGO (para definir a URL do MongoAtlas)
QTD_CARRINHO (para definir a quantidade de itens que serão permitidos por pedido, mediante a fase do projeto)

## Como Utilizar A API

A API funciona via conexão HTTP.
Abaixo segue a URL das conexões e seus métodos:





