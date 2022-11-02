import Fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log: ['query'],
})

async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    })

    fastify.get('/pools/count', async () => {
        const pools = await prisma.pools.findMany({
            where: {
                code: {
                    startsWith: 'D'
                }
            }
        })
        return { pools }
    })

    await fastify.listen({ port: 3333 })
}

bootstrap()