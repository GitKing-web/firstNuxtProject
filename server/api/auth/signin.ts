import authSchema from "~/schema/auth.schema";
import User from "~/server/models/User.model";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const validatedData = authSchema.SignInSchema.safeParse(body);
  if(!validatedData.success){
    return { statusCode: 400, message: validatedData.error.message }
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

return { statusCode:200, message: 'Login successful' }

})
