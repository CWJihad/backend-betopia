import mongoose, { Schema } from 'mongoose'

const productSchema = new Schema ({
        name: String,
        price: Number,
        description: String,
        quantity: Number,
}, {timestamps: true})


export const Product = mongoose.model("Product", productSchema)