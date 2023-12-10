const express = require('express');
const rotas = require('./roteador');
const PrismaClient = require('@prisma/client').PrismaClient;

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use(rotas);

app.listen(3000)

// Preenche o feed com posts de todos os usuarios

app.get('/feed', async (req, res) => {
    try {
      const posts = await prisma.post.findMany({
        include:{
            users:true,
            comments:true
        }
      });
  
      res.json(posts,users,comments);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar os posts' });
    }
})
// ^ isso deve pegar todos os post, independete de quem o postou e os inserir na pagina do feed

// Preencher a tela de perfil com os dados de um usuario

app.get('/perfil/:id', async(req,res)=>{
    const user = await prisma.users.findUnique({
        where:{
            id: Number(req.params.id)
        },
        include:{
            posts:true
        }
    })
    console.log(user)
    return res.json({user:user})
})

// ^ isso deve pegar todas as informacoes de um usuario e preencher a tela com as informacoes

app.post('/post' , async(req,res) => {
    try {
        const { userId, content } = req.body;
        // Verifica se tem usuario com esse id
        const user = await prisma.users.findUnique({
          where: {
            id: userId,
          },
        });
    
        if (!user) {
          return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        const newPost = await prisma.posts.create({
            data: {
              user_id: userId,
              content: content,
              created_at: new Date(),
              updated_at: new Date(),
            },
        });
        res.status(201).json(newPost);
    }
    catch(error) {
        res.json({error: "Erro ao criar o post"})
    }
});

app.delete('/posts/:postId', async (req, res) => {
    try {
        const postId = parseInt(req.params.postId); // Obtém o ID do post a ser deletado
        // Verifica se o post existe
        const post = await prisma.posts.findUnique({
            where: {
                id: postId,
            },
        });
  
        if (!post) {
            return res.status(404).json({ error: 'Post não encontrado' });
        }
  
        await prisma.posts.delete({
            where: {
                id: postId,
            },
        });
  
        res.status(200).json({ message: 'Post deletado com sucesso' });
    }

    catch (error) {
        res.status(500).json({ error: 'Erro ao deletar o post' });
    }
});
  
app.put('/posts/:postId', async (req, res) => {
    try {
        const postId = parseInt(req.params.postId); // Obtém o ID do post a ser modificado
        const { content } = req.body; // Novo conteúdo do post
  
        // Verifica se o post existe
        const post = await prisma.posts.findUnique({
            where: {
                id: postId,
            },
        });
  
        if (!post) {
            return res.status(404).json({ error: 'Post não encontrado' });
        }
  
        // Atualiza o conteúdo do post
        const updatedPost = await prisma.posts.update({
            where: {
                id: postId,
            },
            data: {
                content: content,
                updated_at: new Date(),
            },
        });
  
        res.status(200).json(updatedPost);
    } 
    
    catch (error) {
        res.status(500).json({ error: 'Erro ao modificar o post' });
    }
});

// Criar um novo comentário associado a um post
app.post('/posts/:postId/comments', async (req, res) => {
    try {
        const postId = parseInt(req.params.postId); // Obtém o ID do post
        const { userId, content } = req.body; // Supondo que você está recebendo o ID do usuário e o conteúdo do comentário

        // Verifica se o post existe
        const post = await prisma.posts.findUnique({
            where: {
            id: postId,
            },
        });
    if (!post) {
        return res.status(404).json({ error: 'Post não encontrado' });
    }

    // Verifica se o usuário existe
    const user = await prisma.users.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Cria um novo comentário associado ao post e usuário
    const newComment = await prisma.comments.create({
        data: {
            post_id: postId,
            user_id: userId,
            content: content,
        },
    });

    res.status(201).json(newComment);
    } 
    catch (error) {
        res.status(500).json({ error: 'Erro ao criar o comentário' });
    }
});

// Deletar um comentário associado a um post
app.delete('/posts/:postId/comments/:commentId', async (req, res) => {
    try {
        const commentId = parseInt(req.params.commentId); // Obtém o ID do comentário a ser deletado

        // Verifica se o comentário existe
        const comment = await prisma.comments.findUnique({
            where: {
                id: commentId,
            },
        });

        if (!comment) {
            return res.status(404).json({ error: 'Comentário não encontrado' });
        }

        // Deleta o comentário encontrado
        await prisma.comments.delete({
            where: {
                id: commentId,
            },
        });

        res.status(200).json({ message: 'Comentário deletado com sucesso' });
    } 
    catch (error) {
        res.status(500).json({ error: 'Erro ao deletar o comentário' });
    }
});

// Modificar um comentário associado a um post
app.put('/posts/:postId/comments/:commentId', async (req, res) => {
    try {
        const commentId = parseInt(req.params.commentId); // Obtém o ID do comentário a ser modificado
        const { content } = req.body; // Novo conteúdo do comentário

        // Verifica se o comentário existe
        const comment = await prisma.comments.findUnique({
            where: {
                id: commentId,
            },
        });

        if (!comment) {
            return res.status(404).json({ error: 'Comentário não encontrado' });
        }
        // Atualiza o conteúdo do comentário
        const updatedComment = await prisma.comments.update({
            where: {
                id: commentId,
            },
            data: {
                content: content,
            },
        });

        res.status(200).json(updatedComment);
    } 
    catch (error) {
    res.status(500).json({ error: 'Erro ao modificar o comentário' });
    }
});
