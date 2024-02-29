import { shared } from '@appblocks/node-sdk'
import { nanoid } from 'nanoid'

const handler = async (event) => {
  const { req, res } = event

  const { prisma, healthCheck, getBody, sendResponse, validateBody } = await shared.getShared()

  try {
    // health check
    if (healthCheck(req, res)) return

    const reqBody = await getBody(req)

    await validateBody(reqBody, 'addUserAddressSchema')

    await prisma.addresses.create({
      data: { id: nanoid(), userId: req.user.id, ...reqBody },
    })

    sendResponse(res, 200, { success: true, msg: `Address added successfully` })
  } catch (error) {
    console.log(error)
    sendResponse(res, 400, { success: false, msg: error.message || `Something went wrong`, error })
  }
}

export default handler
