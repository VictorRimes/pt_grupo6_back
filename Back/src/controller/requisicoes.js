const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const criarUsuario = async (req, res) => {
    const { profile_picture, username, email, gender, job_title, password, admin, created_at, updated_at } = req.body;

    if (!username || !email || !gender || !password) {
        return res.status(400).json('mensagem: Todos os campos são obrigatorios.');
    };

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

    return res.status(201).json(novo)
}

const teste = (req, res) => {
    return res.status(200).json('funcionando');
};

module.exports = {
    teste,
    criarUsuario
};