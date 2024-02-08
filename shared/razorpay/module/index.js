import Razorpay from 'razorpay'
import vault from '../../vault/index.js'

const getRazorpayInstance = async (req) => {
  const { user } = req.headers

  await vault.healthCheck()

  const readData = await vault.readKVSecret(process.env.VAULT_TOKEN, user)
  const config = readData.data

  const razorpayInstance = new Razorpay(config)
  return razorpayInstance
}

export default getRazorpayInstance
