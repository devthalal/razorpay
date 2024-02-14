import { shared } from '@appblocks/node-sdk'
import { nanoid } from 'nanoid'

const handler = async (event) => {
  const { req, res } = event

  const { prisma, razorpay, healthCheck, getBody, sendResponse, currencyConvertor, validateBody } =
    await shared.getShared()

  try {
    // health check
    if (healthCheck(req, res)) return

    const reqBody = await getBody(req)

    await validateBody(reqBody, 'createPlanSchema')

    const savedData = await prisma.plans.create({
      data: { id: nanoid(), createdBy: req.user.id, ...reqBody, amount: currencyConvertor(reqBody.amount) },
    })

    // Add your code here
    sendResponse(res, 200, { success: true, msg: `Plan created successfully`, data: savedData })

    await razorpay.createRazorpayPlan(req, savedData)
  } catch (error) {
    sendResponse(res, 400, { success: false, msg: error.message || `Something went wrong`, error })
  }
}

export default handler
