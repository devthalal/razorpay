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
  startDate: vine.date().optional(),
  expiryDate: vine.date().optional(),
  metadata: vine.object({}).allowUnknownProperties().optional(),
  serviceMeta: vine.object({}).allowUnknownProperties().optional(),
})

export default { createPlanSchema, createSubscriptionSchema }
