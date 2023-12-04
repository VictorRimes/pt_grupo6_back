const express = require('express');
const { criarUsuario, lerUsuario, atualizarUsuario, deletarUsuario } = require('../controller/requisicoes')

const rotas = express();

rotas.post('/criar', criarUsuario);
rotas.get('/usuario/:id', lerUsuario);
rotas.put('/atualizar/:id', atualizarUsuario);
rotas.delete('/deletar/:id', deletarUsuario);

module.exports = rotas;