import { shared } from '@appblocks/node-sdk'

const handler = async (event) => {
  const { req, res } = event

  const { getRazorpayInstance, healthCheck, sendResponse } = await shared.getShared()

  try {
    // health check
    if (healthCheck(req, res)) return

    const razorpayInstance = await getRazorpayInstance(req)

    const subscriptionId = req.query.id

    const subscription = await razorpayInstance.subscriptions.fetch(subscriptionId)

    // Add your code here
    sendResponse(res, 200, { success: true, msg: `Subscription retrieved successfully`, data: subscription })
  } catch (error) {
    let errMsg = `Something went wrong`
    if (error.statusCode === 404) errMsg = 'No data found'
    sendResponse(res, error.statusCode || 400, { success: false, msg: errMsg, error })
  }
}

export default handler
