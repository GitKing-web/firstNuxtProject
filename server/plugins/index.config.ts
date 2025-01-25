import connectDB from "../utils/index.config"

export default async () => {
    await connectDB()
        .then(() => console.log('DB connected'))
        .catch(err => console.log(err))
}