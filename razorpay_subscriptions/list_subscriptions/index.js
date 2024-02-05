import { shared } from '@appblocks/node-sdk'

const handler = async (event) => {
  const { req, res } = event

  const { getRazorpayInstance, healthCheck, sendResponse } = await shared.getShared()

  try {
    // health check
    if (healthCheck(req, res)) return

    const razorpayInstance = await getRazorpayInstance(req)

    const { from, to, count, skip } = req.query || {}
    const query = {}
    if (from) query.from = from
    if (to) query.to = to
    if (count) query.count = count
    if (skip) query.skip = skip

    const subscriptions = await razorpayInstance.subscriptions.all(query)

    // Add your code here
    sendResponse(res, 200, { success: true, msg: `Subscriptions retrieved successfully`, data: subscriptions })
  } catch (error) {
    sendResponse(res, 400, { success: false, msg: `Something went wrong`, error })
  }
}

export default handler
