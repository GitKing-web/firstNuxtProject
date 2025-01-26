import authSchema from "~/schema/auth.schema"
import User from "~/server/models/User.model"

export default defineEventHandler( async (event) => {
    const body =  await readBody(event)

    const validatedData = authSchema.SignUpSchema.parse(body)
    const existingEmail = await User.findOne({ email: validatedData.email })
    if(existingEmail){
        return { statusCode:400, message: 'Email already in use'}
    }

    const existingUser = await User.findOne({ email: validatedData.email })
    if(existingUser){
        return { statusCode:400, message: 'Username already in use'}
    }

    const user = new User({ username: validatedData.username, email: validatedData.email, password: validatedData.password })
     await user.save();

     const { password, ...others} = user.toObject();
    //  return {...others}
    return { statusCode:200, message: 'Account created successfully'}
    
})