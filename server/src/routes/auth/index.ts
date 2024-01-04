import { FastifyPluginAsync, FastifyRequest } from "fastify";
import { loginBody, registerBody } from "../../util/authTypes";
import { prisma } from "../../app";


const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.post('/register', async function (request: FastifyRequest<{ Body: registerBody }>, reply) {

        const prismaResult = await prisma.user.findMany({
            where: {
                email: request.body.email,
                username: request.body.username
            }
        })
        if (prismaResult.length === 0) {
            const User = await prisma.user.create({
                data: {
                    email: request.body.email,
                    username: request.body.username,
                    password: request.body.password
                }
            })
            reply.send({
                success: true,
                data: {
                    username: User.username,
                    email: User.email,
                    password: User.password
                }
            });
        } else {
            reply.send({
                success: false,
                reason: "un utilisateur à le même non d'utilisateur, ou le même pseudo."
            })
        }


    });

    fastify.route({
        method: "post",
        url: "/login",
        handler: async (req: FastifyRequest<{ Body: loginBody }>, reply) => {
            const { email, password } = req.body;
            const prismaResult = await prisma.user.findMany({
                where: {
                    email: email,

                }
            })
            if (prismaResult.length === 0) {
                return reply.send({
                    success: false,
                    reason: "vous n'êtes pas enregistré dans notre base de donnée, veuille vous enregistrer"
                })
            } else {
                console.log(password + ":" + prismaResult[0].password)
                if (password === prismaResult[0].password) {
                    const token = await fastify.jwt.sign({
                        username: prismaResult[0].username,
                        email: prismaResult[0].email,
                        rank: prismaResult[0].rank,
                    })
                    reply.send({
                        success: true,
                        user: {
                            username: prismaResult[0].username,
                            email: prismaResult[0].email,
                            rank: prismaResult[0].rank,
                            token: token
                        }
                    })
                }else{
                    reply.send({
                        success: false,
                        reason: "votre mot de passe est incorect"
                    })
                }
            }
        }
    });
};

export default example;