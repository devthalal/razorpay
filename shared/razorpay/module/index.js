import Razorpay from 'razorpay'
import vault from '../../vault/index.js'

const getRazorpayInstance = async (req) => {
  const { id } = req.user

  await vault.healthCheck()

  const readData = await vault.readKVSecret(process.env.VAULT_TOKEN, id)
  const config = readData.data

  const razorpayInstance = new Razorpay(config)
  return razorpayInstance
}

export default getRazorpayInstance
