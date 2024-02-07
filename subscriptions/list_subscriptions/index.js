import { shared } from '@appblocks/node-sdk'

const handler = async (event) => {
  const { req, res } = event

  const { prisma, healthCheck, sendResponse } = await shared.getShared()

  try {
    // health check
    if (healthCheck(req, res)) return

    const { from, to, count, skip } = req.query || {}
    const query = {}
    if (from) query.where = { ...query.where, startDate: { gte: new Date(from) } }
    if (to) query.where = { ...query.where, endDate: { lte: new Date(to) } }
    if (count) query.take = Number(count)
    if (skip) query.skip = Number(skip)

    const subscriptions = await prisma.plans.findMany(query)

    // Add your code here
    sendResponse(res, 200, { success: true, msg: `Subscriptions retrieved successfully`, data: subscriptions })
  } catch (error) {
    sendResponse(res, 400, { success: false, msg: `Something went wrong`, error })
  }
}

export default handler
