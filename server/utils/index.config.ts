import mongoose from "mongoose"
mongoose.set('strictQuery', true)
const connectDB = async () => {
    const config = useRuntimeConfig()
    try {
        await mongoose.connect(config.mongodbUri)
    } catch (error) {
        console.log(error);
    }
}

export default connectDB