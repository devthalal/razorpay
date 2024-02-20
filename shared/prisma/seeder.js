import { PrismaClient } from '@prisma/client'
// eslint-disable-next-line import/extensions

const prisma = new PrismaClient()

async function main() {
  // await createCurrency(prisma)
 
}

main()
  .catch((e) => {
    console.log('e', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
