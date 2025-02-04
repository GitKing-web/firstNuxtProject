import authSchema from "~/schema/auth.schema";
import User from "~/server/models/User.model";
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const validatedData = authSchema.SignInSchema.safeParse(body);
  if(!validatedData.success){
    return { statusCode: 400, message: validatedData.error.issues[0] }
  }

  const { identifier, password } = validatedData.data
  const user = await User.findOne({
    $or: [{ email: identifier}, { username: identifier }]
  }).exec()

  if(!user) {
    return{ statusCode:403, message: 'Incorrect username/email or password' }
  }

  const isPasswordCorrect = await user.comparePassword(password)

  if(!isPasswordCorrect){
    return { statusCode:401, message: 'Incorrect username/email or password' }
  }

  const payload = { id : user._id}
  //@ts-ignore
  const token = jwt.sign({payload}, process.env.JWT_STUFF, { expiresIn : "3d"})

  setCookie(event, 'token', token, {
    httpOnly: true,
    maxAge: 3 * 24 * 60 * 60,
    secure: process.env.NODE_ENV !== 'development',
    path: '/',
    sameSite: 'strict'
  })

return { statusCode:200, message: 'Login successful', token }

})
