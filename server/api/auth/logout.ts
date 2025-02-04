export default defineEventHandler(async (event) => {
  deleteCookie(event, 'token')
  return { statusCode: 200, message: 'Logout Successful' }
})
