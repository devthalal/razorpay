import Razorpay from 'razorpay'
// import vault from '../../vault/index.js'

// const getRazorpayInstance = async (req) => {
//   const { vendor } = req.headers

//   await vault.healthCheck()

//   const readData = await vault.readKVSecret(process.env.BB_RAZORPAY_VAULT_TOKEN, vendor)
//   const config = readData.data

//   const razorpayInstance = new Razorpay(config)

//   return razorpayInstance
// }

const getRazorpayInstance = () =>
  new Razorpay({
    key_id: 'rzp_test_UqNSSmzTynUOhb',
    key_secret: 'g6c0w6e7qUJjs5uYYImLJRj3',
  })

export default getRazorpayInstance
