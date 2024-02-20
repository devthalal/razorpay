import { shared } from '@appblocks/node-sdk'

const handler = async (event) => {
  const { req, res } = event

  const { razorpay, prisma, healthCheck, getBody, sendResponse, validateBody } = await shared.getShared()

  try {
    // health check
    if (healthCheck(req, res)) return

    const reqBody = await getBody(req)

    await validateBody(reqBody, 'updateSubscriptionSchema')

    const savedData = await prisma.subscriptions.find({
      where: { createdBy: req.user.id, id: reqBody.subscriptionId },
    })

    await razorpay.updateRazorpaySubscription(req, savedData)

    sendResponse(res, 200, { success: true, msg: `Subscription updated successfully`, data: savedData })

  } catch (error) {
    sendResponse(res, 400, { success: false, msg: error.message || `Something went wrong`, error })
  }
}

export default handler