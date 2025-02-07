import authSchema from "~/schema/auth.schema"
import User from "~/server/models/User.model"

export default defineEventHandler( async (event) => {
    const body =  await readBody(event)

    const validatedData = authSchema.SignUpSchema.safeParse(body)

    if(validatedData.data?.username === "" || validatedData.data?.email === "" || validatedData.data?.password === "" || validatedData.data?.confirmPassword === "")  return { statusCode: 400, message: "Fields cannot be Empty"}

    if(!validatedData.success){
        return { statusCode: 401, message: validatedData.error.issues[0]}
    }
    const existingEmail = await User.findOne({ email: validatedData.data.email })
    if(existingEmail){
        return { statusCode:400, message: 'Email already in use'}
    }

    const existingUser = await User.findOne({ email: validatedData.data.username })
    if(existingUser){
        return { statusCode:400, message: 'Username already in use'}
    }

    const user = new User({ username: validatedData.data.username, email: validatedData.data.email, password: validatedData.data.password })
     await user.save();

     const { password, ...others} = user.toObject();
    //  return {...others}
    return { statusCode:200, message: 'Account created successfully'}
    
})