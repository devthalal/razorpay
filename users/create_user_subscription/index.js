import { shared } from '@appblocks/node-sdk'
import { nanoid } from 'nanoid'

const handler = async (event) => {
  const { req, res } = event

  const { razorpay, prisma, healthCheck, getBody, sendResponse, validateBody } = await shared.getShared()

  try {
    // health check
    if (healthCheck(req, res)) return

    const reqBody = await getBody(req)

    await validateBody(reqBody, 'createUserSubscriptionSchema')

    const savedData = await prisma.subscriptions.create({
      id: nanoid(),
      createdBy: req.user.id,
      userId: req.user.id,
      ...reqBody,
    })

    const subscribedData = await razorpay.createRazorpaySubscription(req, savedData)

    sendResponse(res, 200, {
      success: true,
      msg: `Subscription created successfully`,
      data: { ...subscribedData, ...savedData },
    })
  } catch (error) {
    sendResponse(res, 400, { success: false, msg: error.message || `Something went wrong`, error })
  }
}

export default handler
