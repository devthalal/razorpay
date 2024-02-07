import { shared } from '@appblocks/node-sdk'

const handler = async (event) => {
  const { req, res } = event

  const { getRazorpayInstance, healthCheck, sendResponse, prisma } = await shared.getShared()

  try {
    // health check
    if (healthCheck(req, res)) return

    const razorpayInstance = await getRazorpayInstance(req)

    const plans = await prisma.plans.find({ where: { isSynced: false } })
    const syncData = []
    const syncedIds = []
    await Promise.all(
      plans.forEach(async (plan) => {
        try {
          const savedData = await razorpayInstance.plans.create({
            ...plan,
          })
          syncData.push(savedData)
          syncedIds.push(plan.id)
        } catch (error) {
          console.log(error)
        }
      })
    )

    await prisma.plans.update({ where: { id: { in: syncedIds } }, data: { isSynced: true } })

    // Add your code here
    sendResponse(res, 200, { success: true, msg: `Plan created successfully`, data: syncData })
  } catch (error) {
    sendResponse(res, 400, { success: false, msg: `Something went wrong`, error })
  }
}

export default handler
