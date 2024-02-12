import { PrismaClient } from '@prisma/client'
// eslint-disable-next-line import/extensions
import { createCurrency} from './seeder/currency_seed.js'

const prisma = new PrismaClient()

async function main() {
  await createCurrency(prisma)
 
}

main()
  .catch((e) => {
    console.log('e', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
