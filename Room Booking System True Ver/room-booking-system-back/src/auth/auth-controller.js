import {
    registerUser,
    logInUser
} from './auth-service.js'

import { normalizeEmail, validateName, validatePhone, validatePassword } from '../utils/data-validations.js'

export async function registerUserController(req, res) {
    try {
        const { name, email, password, phone } = req.body
        const normalizedEmail = normalizeEmail(email)
        validateName(name)
        if (phone) {
            validatePhone(phone)
        }
        validatePassword(password)
        const result = await registerUser(name, normalizedEmail, password, phone || null)
      return res.status(200).json({message: 'User registered', result: result})
    } catch (error) {  
        console.error(error)    
        return res.status(500).json({
            message : 'Error Registering'
        })
    }
}
export async function logInUserController(req, res){
    try {
        const { email, password } = req.body
        const normalizedEmail = normalizeEmail(email)
        const token = await logInUser(normalizedEmail, password)
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        })
        return res.status(200).json({message: "Logged In" })
    }  
    catch (error) {
        console.error(error)
        return res.status(500).json({message : 'Error Logging In'})
    }
}

export async function logOutUserController(req, res){
    try {
        res.clearCookie('token')
        return res.status(200).json({message: "Logged Out"})
    }
    catch(error){
        console.error(error)
        return res.status(500).json({message: "Error Logging Out"})
    }
}