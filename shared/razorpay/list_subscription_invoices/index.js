import getRazorpayInstance from '../module/index.js'

const listRazorpaySubscriptionInvoices = async (data) => {
  const razorpayInstance = await getRazorpayInstance(data)

  const subscriptionInvoices = await razorpayInstance.invoices.all(data)
  return subscriptionInvoices
}

export default listRazorpaySubscriptionInvoices
