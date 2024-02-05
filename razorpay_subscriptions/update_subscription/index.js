import { shared } from '@appblocks/node-sdk'

const handler = async (event) => {
  const { req, res } = event

  const { getRazorpayInstance, healthCheck, getBody, sendResponse } = await shared.getShared()

  try {
    // health check
    if (healthCheck(req, res)) return

    const reqBody = await getBody(req)

    const razorpayInstance = await getRazorpayInstance(req)

    const { subscription_id, ...data } = reqBody

    // {
    //   "subscription_id":"plan_00000000000002",
    //   "plan_id":"plan_00000000000002",
    //   "offer_id":"offer_JHD834hjbxzhd38d",
    //   "quantity":5,
    //   "remaining_count":5,
    //   "start_at":1496000432,
    //   "schedule_change_at":"now",
    //   "customer_notify":1
    // }

    const savedData = await razorpayInstance.subscriptions.update(subscription_id,data)

    // Add your code here
    sendResponse(res, 200, { success: true, msg: `Subscription updated successfully`, data: savedData })
  } catch (error) {
    sendResponse(res, 400, { success: false, msg: `Something went wrong`, error })
  }
}

export default handler
