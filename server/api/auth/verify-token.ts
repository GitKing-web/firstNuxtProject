import verifyToken from "~/server/utils/verifytoken.config"

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'authorization')

  if(!authHeader || !authHeader.startsWith('Bearer ') ){ 
    return{ authenticated: false, message: 'No token provided'}
  }

  const token = authHeader.split(' ')[1]

  try {
    const decodedToken = verifyToken(token)

    return { authenticated: true, user: decodedToken}
    
  } catch (error) {
    return { authenticated: false, message: 'Token missing or expired'}
  }
})
