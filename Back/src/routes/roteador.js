const express = require('express');
const { criarUsuario, lerUsuario, atualizarUsuario } = require('../controller/requisicoes')

const rotas = express();

rotas.post('/criar', criarUsuario);
rotas.get('/usuario/:id', lerUsuario);
rotas.put('/atualizar/:id', atualizarUsuario);

module.exports = rotas;