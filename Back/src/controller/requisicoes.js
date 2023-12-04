const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const criarUsuario = async (req, res) => {
    const { profile_picture, username, email, gender, job_title, password, admin, created_at, updated_at } = req.body;

    if (!username || !email || !gender || !password) {
        return res.status(400).json('mensagem: Todos os campos são obrigatorios.');
    };

    try {
        const novo = await prisma.users.create({
            data: {
                profile_picture,
                username,
                email,
                gender,
                job_title: {
                    create: {
                        name: job_title,
                        team: 'teste',
                        created_at: '2023-12-02T02:24:00.000Z'
                    },
                },
                password,
                admin,
                created_at,
                updated_at
            }
        })
        if (ler) {
            return res.status(201).json(novo)
        } else {
            return res.status(404).json({ error: "Usuario não foi criado" })
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar usuario" });
    }

};

const lerUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        const ler = await prisma.users.findUnique({
            where: {
                id: parseInt(id)
            },
            select: {
                id: true,
                profile_picture: true,
                username: true,
                job_title: true,
                email: true,
                posts: true
            }
        })

        if (ler) {
            return res.status(200).json(ler)
        } else {
            return res.status(404).json({ error: "Usuario não encontrado" })
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar usuario" });
    }
};

const atualizarUsuario = async (req, res) => {
    const { id } = req.params;

    const { profile_picture, username, job_title, email } = req.body;

    try {
        const atualizar = await prisma.users.update({
            where: {
                id: Number(id)
            },
            data: {
                profile_picture,
                username,
                job_title,
                email
            }
        }
        )

        return res.status(200).json({ mensagem: "Dados atualizados" })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro ao atualizar usuario." })
    }
};

const deletarUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        const deletar = await prisma.users.delete({
            where: {
                id: Number(id)
            }
        })

        return res.status(200).json({mensagem: "Usuario deletado"})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro ao deletar usuario." })
    }
}

module.exports = {
    criarUsuario,
    lerUsuario,
    atualizarUsuario,
    deletarUsuario
};