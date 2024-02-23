import vine from '@vinejs/vine'

const createPlanSchema = vine.object({
  name: vine.string(),
  amount: vine.number({ strict: true }).min(1),
  currency: vine.string(),
  interval: vine.string(),
  intervalCount: vine.number({ strict: true }),
  description: vine.string().optional(),
  metadata: vine.object({}).allowUnknownProperties().optional(),
})

const createSubscriptionSchema = vine.object({
  planId: vine.string(),
  userId: vine.string(),
  cycleCount: vine.number(),
  startDate: vine.string().optional(),
  expiryDate: vine.string().optional(),
  metadata: vine.object({}).allowUnknownProperties().optional(),
  serviceMeta: vine.object({}).allowUnknownProperties().optional(),
})

const createUserSubscriptionSchema = vine.object({
  planId: vine.string(),
  cycleCount: vine.number(),
  startDate: vine.string().optional(),
  expiryDate: vine.string().optional(),
  metadata: vine.object({}).allowUnknownProperties().optional(),
  serviceMeta: vine.object({}).allowUnknownProperties().optional(),
})

const availableCurrencySchema = vine.object({
  searchKeyword: vine.string().optional(),
  count: vine.number().optional(),
  skip: vine.number().optional(),
})

const updateSubscriptionSchema = vine.object({
  planId: vine.string().optional(),
  cycleCount: vine.number().optional(),
  metadata: vine.object({}).allowUnknownProperties().optional(),
})

const setDefaultCurrencySchema = vine.object({
  currencyID: vine.string(),
})

export default {
  createPlanSchema,
  createUserSubscriptionSchema,
  createSubscriptionSchema,
  updateSubscriptionSchema,
  availableCurrencySchema,
  setDefaultCurrencySchema,
}
