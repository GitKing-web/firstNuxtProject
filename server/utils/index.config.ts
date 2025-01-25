import mongoose from "mongoose"

const connectDB = async () => {
    const config = useRuntimeConfig()
    try {
        await mongoose.connect(config.mongodbUri)
    } catch (error) {
        console.log(error);
    }
}

export default connectDB