const express = require('express');
const {teste, criarUsuario} = require('../controller/requisicoes')

const rotas = express();

rotas.get('/', teste)
rotas.post('/criar', criarUsuario)

module.exports = rotas;