import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'token');

    if(!token) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
    }

    try {
        //@ts-ignore
        const decodeToken = jwt.verify(token, process.env.JWT_STUFF)
        event.context.user = decodeToken
    } catch (error) {
        throw createError({ statusCode: 401, statusMessage: 'Invalid Token' });
    }
})