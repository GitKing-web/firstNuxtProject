import { z } from 'zod'

const SignUpSchema = 
    z.object({
        username: z.string().min(3).max(50),
        email: z.string().email(),
        password: z.string().min(8),
        confirmPassword: z.string().min(8)
    }).refine(data => data.password === data.confirmPassword, {
        message: 'passwords do not match',
        path: ['confirmPassword']
    })

const SignInSchema = z.object({
    identifier: z.string().min(3),
    password: z.string().min(8)
}).refine(data => {
    return data.identifier.includes('@') ? z.string().email().safeParse(data.identifier).success : data.identifier.length >= 3
})
export default { SignUpSchema, SignInSchema }