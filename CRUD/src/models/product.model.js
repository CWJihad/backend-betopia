import mongoose, { Schema } from 'mongoose'

const productSchema = new Schema ({
        fullName: {
            type: String
        },
        username: {
            type: String,
            require: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        email: {
            type: String,
            require: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            require: true
        }
}, {timestamps: true})


export const Product = mongoose.model("Product", userSchema)