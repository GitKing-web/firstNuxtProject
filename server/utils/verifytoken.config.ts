import jwt from 'jsonwebtoken'

const verifyToken = (token: string) => {
  try {
    //@ts-ignore
    jwt.verify(token, process.env.JWT_STUFF)   
  } catch (error: any) {
    console.log('Invalid or expired token' + error.message);
  }
}

export default verifyToken