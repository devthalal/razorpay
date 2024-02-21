import getRazorpayInstance from '../module/index.js'
import prisma from '../../prisma/index.js'
import utils from '../../utils/index.js'

const updateRazorpaySubscription = async (req, subscriptionData) => {
  try {
    const razorpayInstance = await getRazorpayInstance(req)
    const { id, ...data } = subscriptionData || {}

    const razorpayRes = await razorpayInstance.subscriptions.update({
      plan_id: data.planId,
      total_count: data.cycleCount,
      addons: data.serviceMeta?.addons,
      offer_id: data.serviceMeta?.offerId,
      customer_notify: data.serviceMeta?.customerNotify,
      quantity: data.serviceMeta?.quantity,
      notes: data.metadata,
      start_at: data.startDate ? utils.convertToUnixTimeStamp(data.startDate) : undefined,
      expire_by: data.expiryDate ? utils.convertToUnixTimeStamp(data.expiryDate) : undefined,
    })

    await prisma.subscriptions.update({
      where: { id },
      data: { isSynced: true, serviceId: razorpayRes.id, service: 'razorpay', ...data },
    })
  } catch (error) {
    console.log('Error razorpay update subscription!!!')
    console.log(error)
  }
}

export default updateRazorpaySubscription
