/**
 * Function to format and send response
 * @param {*} res
 * @param {*} code
 * @param {*} data
 * @param {*} type
 */
const sendResponse = (res, code, data, type = 'application/json') => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
    'Content-Type': type,
  }

  res.writeHead(code, headers)
  res.write(JSON.stringify(data))
  res.end()
}

/**
 * Function to extract the body from the request
 * @param {*} req
 * @returns
 */
const getBody = async (req) => {
  const bodyBuffer = []
  for await (const chunk of req) {
    bodyBuffer.push(chunk)
  }
  const data = Buffer.concat(bodyBuffer).toString()
  return JSON.parse(data || '{}')
}

const healthCheck = (req, res) => {
  if (req.params.health === 'health') {
    sendResponse(res, 200, { success: true, message: 'Health check success' })
    return true
  }
  return false
}

const currencyConvertor = (currency) => (currency ?? 0) * 100

const convertToUnixTimeStamp = (dateString) => {
  const date = new Date(dateString)
  const unixTimestamp = date.getTime()
  return Math.floor(unixTimestamp / 1000)
}

export default { healthCheck, getBody, sendResponse, currencyConvertor, convertToUnixTimeStamp }
