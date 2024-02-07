import { shared } from '@appblocks/node-sdk'

const handler = async (event) => {
  const { req, res } = event

  const { prisma, getRazorpayInstance, healthCheck, getBody, sendResponse } = await shared.getShared()

  try {
    // health check
    if (healthCheck(req, res)) return

    const reqBody = await getBody(req)

    const razorpayInstance = await getRazorpayInstance(req)

    const subscriptions = await prisma.subscriptions.find({ where: { isSynced: false } })

    const syncData = []
    const syncedIds = []
    await Promise.all(
      subscriptions.forEach(async (subscription) => {
        try {
          const savedData = await razorpayInstance.subscriptions.create({
            ...subscription,
          })
          syncData.push(savedData)
          syncedIds.push(subscription.id)
        } catch (error) {
          console.log(error)
        }
      })
    )

    await prisma.subscriptions.update({ where: { id: { in: syncedIds } }, data: { isSynced: true } })

    const savedData = await razorpayInstance.subscriptions.create(reqBody)

    // Add your code here
    sendResponse(res, 200, { success: true, msg: `Subscription created successfully`, data: savedData })
  } catch (error) {
    sendResponse(res, 400, { success: false, msg: `Something went wrong`, error })
  }
}

export default handler
