import { shared } from '@appblocks/node-sdk'

const handler = async (event) => {
  const { req, res } = event

  const { healthCheck, getBody, sendResponse, prisma } = await shared.getShared()

  try {
    // health check
    if (healthCheck(req, res)) return

    const reqBody = await getBody(req)

    console.log(JSON.stringify(reqBody))

    // ==== Subscribed Webhooks ====
    // payment.failed
    // subscription.activated
    // subscription.authenticated

    if (reqBody.event.includes('subscription.')) {
      const subscribedData = reqBody.payload.subscription.entity
      await prisma.subscriptions.update({
        where: {
          serviceId: subscribedData.id,
          service: 'razorpay',
        },
        data: {
          status: subscribedData.status === 'completed' ? 'authenticated' : subscribedData.status,
        },
      })
    }

    sendResponse(res, 200, { success: true, msg: `success` })
  } catch (error) {
    console.log('capture payment error ', error)
    sendResponse(res, 400, { success: false, msg: error.message || `Something went wrong`, error })
  }
}

export default handler
