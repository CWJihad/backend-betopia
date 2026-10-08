import { User } from "../models/user.model.js"
import bcrypt from 'bcrypt'

const createUser = async (req, res) => {

    try {
        const {fullName, username, email, password} = req.body
    
        const isUser = await User.findOne({
            $or: [{username}, {email}]
        })
    
        if (isUser) {
            return res.status(409).json({message: "User Already Exist!"})
        }
    
        const hashedPassword = await bcrypt.hash(password, 10)
    
        const user = await User.create({
            fullName,
            username,
            email,
            password: hashedPassword
        })
    
        return res.status(202).json({
            user,
            message: "User successfully created"
        })
    } catch (error) {
        return res.status(500).json({
            Error: "Failed to create an user: ", error
        })
    }

    
}

const readUser = async (req, res) => {

    try {
        const {username, password} = req.body
        
        const user = await User.findOne({username})
    
        if (!user) {
            return res.status(404).json({message: "User doesn't exist"})
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password)
    
        if (!isPasswordValid) {
            return res.status(400, "Invalid Password")
        }
    
        return res.status(200).json({
            user
        })
    } catch (error) {
        return res.status(500).json({
            Error: "Failed to read an user: ", error
        }) 
    }

    
}

const updateUser = async (req, res) => {

    try {
        const {id} = req.params
        const {username, password} = req.body
        
        const user = await User.findOne({username})
    
        if (!user) {
            return res.status(404).json({message: "User doesn't exist"})
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password)
    
        if (!isPasswordValid) {
            return res.status(400, "Invalid Password")
        }
    
        return res.status(200).json({
            user
        })
    } catch (error) {
        return res.status(500).json({
            Error: "Failed to read an user: ", error
        }) 
    }

    
}


export {
    createUser,
    readUser,
}