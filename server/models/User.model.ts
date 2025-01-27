import { Schema, model, Document } from "mongoose";
import bcrypt from 'bcrypt'

export interface UserDocument extends Document {
    username: string;
    password: string;
    email: string;
    comparePassword (password: string): Promise<boolean>;
}

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

UserSchema.pre('save',  async function(next){
    const user = this;
    // console.log('middleware triggered');
    if(!this.isModified('password')){
        next();
        return
        // await bcrypt.hash(this.password, 13)
        // console.log('password hashed:', this.password);
    }
    try{
        user.password = await bcrypt.hash(user.password, 13)
        next();
    }catch(err){console.log(err)}
})

UserSchema.methods.comparePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password)
}

const User = model<UserDocument>('user', UserSchema)
export default User