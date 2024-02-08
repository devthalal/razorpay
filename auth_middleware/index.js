const handler = async (event) => {
  
  const { req } = event
  req.user = { id: 'zCSAYU_t2_aJYqEADBZtC' }

  return true
}

export default handler
