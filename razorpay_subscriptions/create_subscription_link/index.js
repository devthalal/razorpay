import { shared } from '@appblocks/node-sdk'

const handler = async (event) => {
  const { req, res } = event
  
  const { getRazorpayInstance, healthCheck, getBody, sendResponse } = await shared.getShared()

  try {

    // health check
    if (healthCheck(req, res)) return

    const reqBody = await getBody(req)

    const razorpayInstance = await getRazorpayInstance(req)

   
    // {
    //   "plan_id":"plan_00000000000001",
    //   "total_count":6,
    //   "quantity":1,
    //   "customer_notify":1,
    //   "start_at":1580453311,
    //   "expire_by":1580626111,
    //   "addons":[ // optional
    //      {
    //         "item":{
    //            "name":"Delivery charges",
    //            "amount":30000,
    //            "currency":"INR"
    //         }
    //      }
    //   ],
    //   "offer_id":"offer_JHD834hjbxzhd38d", // optional
    //   "notes":{ //optional
    //      "notes_key_1":"Tea, Earl Grey, Hot",
    //      "notes_key_2":"Tea, Earl Grey… decaf."
    //   }

    const savedData = await razorpayInstance.subscriptions.createRegistrationLink(reqBody)

    // Add your code here
    sendResponse(res, 200, { success: true, msg: `Subscription link created successfully`, data: savedData })
  } catch (error) {
    sendResponse(res, 400, { success: false, msg: `Something went wrong`, error })
  }
}

export default handler
