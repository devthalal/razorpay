import Razorpay from 'razorpay'
import { shared } from '@appblocks/node-sdk'
// eslint-disable-next-line import/extensions

const handler = async (event) => {
  const { req, res } = event

  const { vault } = await shared.getShared()

  // health check
  if (req.params.health === 'health') {
    res.write(JSON.stringify({ success: true, msg: 'Health check success' }))
    res.end()
    return
  }

  const status = await vault.healthCheck()
  console.log({ initialized: status.initialized })

  // const item = {
  //   thr: {
  //     key_id: process.env.RAZORPAY_KEY_ID,
  //     key_secret: process.env.RAZORPAY_KEY_SECRET,
  //   },
  //   neo: {
  //     key_id: 'rzp_test_UqNSSmzTynUOhb',
  //     key_secret: 'g6c0w6e7qUJjs5uYYImLJRj3',
  //   },
  // }

  const { user } = req.headers

  console.log({ user })

  // const createData = await vault.createKVSecret('hvs.AasWVroov71iKemB7JXY50Gh', user, item[user])

  const readData = await vault.readKVSecret('hvs.AasWVroov71iKemB7JXY50Gh', user)

  const config = readData.data
  const instance = new Razorpay(config)
  const plans = await instance.plans.all()

  // Add your code here
  res.write(JSON.stringify({ success: true, msg: `Happy Hacking`, data: plans, status }))
  res.end()
}

export default handler
