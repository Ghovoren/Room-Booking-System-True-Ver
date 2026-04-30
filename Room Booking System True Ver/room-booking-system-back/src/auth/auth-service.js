import {passwordMatched, normalizeEmail} from '../utils/data-validations.js'
import { hashPassword } from'../utils/password-helper.js'
import {createAccount, getPasswordfromAccount} from '../config/database.js'
import jwt from 'jsonwebtoken'


export async function logInUser(email, password) {
    try {
        const user = await getPasswordfromAccount(email)
        if (!user || user.length === 0){
            throw new Error('Invalid Email')
        }
        if (await passwordMatched(user,password)){
            const token = jwt.sign({ publicId: user.account_id, name: user.name, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' })
            return token
        }
        else{
            throw new Error('Invalid Password')
        }
    } catch (error) {
        throw new Error(`Login Service Error: ${error.message}`)
    }
}

export async function registerUser(publicId, name, email, password, phone = null, balance = 0, role ='student'){
    try{
        if(!publicId || !name || !email || !password){
            throw new Error('Missing Attributes')
        }
        const hashedPassword = await hashPassword(password)
        if (role !== 'student') balance = null
        const result = await createAccount(publicId, name, email, hashedPassword, phone, balance, role)
        return result
    } catch (error) {
        console.error('Register Error:',error)
        if (error.code === 'ER_DUP_ENTRY'){
            throw new Error('Email Already Exists')
        }
        throw new Error(`Register Service Error: ${error.message}`)
    }
}

