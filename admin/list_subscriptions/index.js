import { shared } from '@appblocks/node-sdk'

const handler = async (event) => {
  const { req, res } = event

  const { prisma, healthCheck, sendResponse } = await shared.getShared()

  try {
    // health check
    if (healthCheck(req, res)) return

    const { from, to, count, skip } = req.query || {}
    const query = {
      where: {
        createdBy: req.user.id,
      },
    }
    if (from) query.where = { ...query.where, startDate: { gte: new Date(from) } }
    if (to) query.where = { ...query.where, endDate: { lte: new Date(to) } }
    if (count) query.take = Number(count)
    if (skip) query.skip = Number(skip)

    const plans = await prisma.plans.findMany(query)


    sendResponse(res, 200, { success: true, msg: `Plan retrieved successfully`, data: plans })
  } catch (error) {
    sendResponse(res, 400, { success: false, msg: `Something went wrong`, error })
  }
}

export default handler
