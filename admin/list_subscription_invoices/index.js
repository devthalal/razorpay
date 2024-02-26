import { shared } from '@appblocks/node-sdk'

const handler = async (event) => {
  const { req, res } = event

  const { prisma, razorpay, healthCheck, sendResponse, getBody } = await shared.getShared()

  try {
    // health check
    if (healthCheck(req, res)) return

    const reqBody = await getBody(req)

    const data = await prisma.subscriptions.findFirst({
      where: { id: reqBody.subscriptionId },
      select: { id: true, serviceId: true },
    })

    if (!data) throw new Error('Subscription not found')

    const invoices = await razorpay.listRazorpaySubscriptionInvoices({ subscription_id: data.serviceId })

    sendResponse(res, 200, { success: true, msg: `Invoices retrieved successfully`, data: invoices })
  } catch (error) {
    console.log('error is', error)
    sendResponse(res, 400, { success: false, msg: `Something went wrong`, error })
  }
}

export default handler
