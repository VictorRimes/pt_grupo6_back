const express = require('express');
const {criarUsuario, lerUsuario} = require('../controller/requisicoes')

const rotas = express();

rotas.post('/criar', criarUsuario)
rotas.get('/usuario/:id', lerUsuario);

module.exports = rotas;