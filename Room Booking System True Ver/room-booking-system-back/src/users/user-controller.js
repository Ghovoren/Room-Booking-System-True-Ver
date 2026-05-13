import {
    getAllUsers,
    updateUser,
    deleteUser,
    getUserById,
    depositBalance,
    withdrawBalance,
    updateUserPassword
} from './user-service.js'

import{
    registerUser
} from '../auth/auth-service.js'

import { normalizeEmail, validateName, validatePhone, validatePassword, normalizeUserId, normalizeAmountIntoCents,validateRole } from '../utils/data-validations.js'

export async function createNewUserController (req, res){
    try{
        const { publicId, name, email, password, phone, balance, role} = req.body
        publicId = normalizeUserId(publicId)
        validateName(name)
        validatePassword(password)
        if(phone) validatePhone(phone)
        if(role) validateRole(role)
        const normalizedBalance = normalizeAmountIntoCents(balance)
        const normalizedEmail = normalizeEmail(email)
        const result = await registerUser(publicId, name, normalizedEmail, password, phone || null, normalizedBalance, role)
        if (result.affectedRows = 1){
            return res.status(200).json({message:"User Registered", result: result})
        }
        return res.status(500).json({message:"Error Registering"})
    }
    catch(error){
        console.error(error)
        return res.status(500).json({message:"Error Registering"})
    }
}


export async function updateUserController (req, res){
    try{
        const publicId = req.params.userId
        const {name, email, phone} = req.body
        publicId = normalizeUserId(publicId)
        validateName(name)
        const normalizedEmail = normalizeEmail(email)
        validatePhone(phone)
        const result = await updateUser(publicId, name, normalizedEmail, phone)
      return res.status(200).json({result: result})
    }
    catch(error){
        console.error(error)
        return res.status(500).json({
            message : 'Error Updating User'
        })
    }
}
export async function updateUserPasswordController (req, res){
    try{
        const publicId = req.params.userId
        const {password} = req.body
        publicId = normalizeUserId(publicId)
        validatePassword(password)
        const result = await updateUserPassword(publicId, password)
      return res.status(200).json({result: result})
    }
    catch(error){
        console.error(error)
        return res.status(500).json({
            message : 'Error Updating User'
        })
    }
}

export async function deleteUserController(req, res){
    try{
        
        const result = await deleteUser(req.params.userId)
        return res.status(200).json({result: result})
    }
    catch(error){
        console.error(error)
        return res.status(500).json({
            message : 'Error Deleting User'
        })
    }
}

export async function getUserByIdController(req, res) {
    try{
        const userId = req.params.userId
        const publicId = normalizeUserId(userId)
        const result = await getUserById(publicId)
        if (!result){
            return res.status(404).send('User not Found')
        }
        return res.status(200).json({result: result || []})
    }
    catch(error){
        console.error(error)
        return res.status(500).json({
            message : 'Error Fetching Data'
        })
    }
}

export async function getAllUsersController(req, res) {
    try{
        const { name, email, phone, role } = req.query
        const filters = {}
        if (name){
            validateName(name)
            filters.name = name
        }
        if (email){
            const normalizedEmail = normalizeEmail(email)
            filters.email = normalizedEmail
        }
        if (phone){
            validatePhone(phone)
            filters.phone = phone
        }
        if (role){
            validateRole(role)
            filters.role = role
        }
        const result = await getAllUsers(filters)
        if (!result){
            return res.status(400).send('Empty Database')
        }
        return res.status(200).json({result: result || []})
    }
    catch(error){
        console.error(error)
        return res.status(500).json({
            message : 'Error Fetching Data'
        })
    }
}

export async function depositController(req, res) {
    try{
        let publicId = req.params.userId
        publicId = normalizeUserId(publicId)
        const { depositAmount } = req.body
        const amount = normalizeAmountIntoCents(depositAmount)
        const result = await depositBalance(publicId, amount)
        return res.status(200).json({result: result})
    }
    catch(error){
        console.error(error)
        return res.status(500).json({
            message : 'Error Balance Deposit'
        })
    }
}

export async function withdrawController(req, res) {
    try{
        let publicId = req.params.userId
        publicId = normalizeUserId(publicId)
        const { withdrawAmount } = req.body
        const amount = normalizeAmountIntoCents(withdrawAmount)
        const result = await withdrawBalance(publicId, amount)
        return res.status(200).json({result: result})
    }
    catch(error){
        console.error(error)
        return res.status(500).json({
            message : 'Error Balance Withdrawal'
        })
    }
}
