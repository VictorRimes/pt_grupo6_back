const express = require('express');
const {teste} = require('../controller/requisicoes')

const rotas = express();

rotas.get('/', teste)

module.exports = rotas;