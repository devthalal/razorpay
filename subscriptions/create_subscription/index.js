import { shared } from '@appblocks/node-sdk'
import { nanoid } from 'nanoid'

const handler = async (event) => {
  const { req, res } = event
  
  const { prisma, healthCheck, getBody, sendResponse } = await shared.getShared()

  try {

    // health check
    if (healthCheck(req, res)) return

    const reqBody = await getBody(req)
    const savedData = await prisma.subscriptions.save({ data: {
      id: nanoid(),
      ...reqBody
    } })

    // Add your code here
    sendResponse(res, 200, { success: true, msg: `Subscription created successfully`, data: savedData })
  } catch (error) {
    sendResponse(res, 400, { success: false, msg: `Something went wrong`, error })
  }
}

export default handler
