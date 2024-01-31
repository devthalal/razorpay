import { shared } from '@appblocks/node-sdk'

const handler = async (event) => {
  const { req, res } = event
  
  const { getRazorpayInstance, healthCheck, getBody, sendResponse } = await shared.getShared()

  try {

    // health check
    if (healthCheck(req, res)) return

    const reqBody = await getBody(req)

    const razorpayInstance = await getRazorpayInstance(req)

    // item: {name, amount, currency, description?}
    // period
    // interval
    // notes?

    const savedData = await razorpayInstance.plans.create(reqBody)

    // Add your code here
    sendResponse(res, 200, { success: true, msg: `Plan created successfully`, data: savedData })
  } catch (error) {
    sendResponse(res, 400, { success: false, msg: `Something went wrong`, error })
  }
}

export default handler
