/* eslint-disable import/extensions */
import vault from './vault/index.js'
import razorpay from './razorpay/index.js'
import prisma from './prisma/index.js'
import utils from './utils/index.js'

export default { ...utils, vault, razorpay, prisma }
