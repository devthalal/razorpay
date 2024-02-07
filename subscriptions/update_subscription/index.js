import { shared } from '@appblocks/node-sdk'

const handler = async (event) => {
  const { req, res } = event

  const { prisma, healthCheck, getBody, sendResponse } = await shared.getShared()

  try {
    // health check
    if (healthCheck(req, res)) return

    const reqBody = await getBody(req)

    const { subscription_id, ...data } = reqBody

    const savedData = await prisma.subscriptions.update({
      where: {
        id: subscription_id,
      },
      data,
    })

    // Add your code here
    sendResponse(res, 200, { success: true, msg: `Subscription updated successfully`, data: savedData })
  } catch (error) {
    sendResponse(res, 400, { success: false, msg: `Something went wrong`, error })
  }
}

export default handler
