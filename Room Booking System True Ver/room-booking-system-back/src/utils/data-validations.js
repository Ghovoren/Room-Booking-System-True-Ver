import argon2 from 'argon2'

import { USER_ID_REGEX , USER_ROLES } from './constants.js';

export function validateName(name){
    try{
        const nameRegex = /^[A-Za-z\s'-]+$/;
        if (!name || !name.trim()) {
            throw new Error("User Name is required");
        }
        if (!nameRegex.test(name)){
            throw new Error('User Name Regex Test Failed')
        }

    }
    catch(error){
        throw new Error(`Data Validation Error: ${error.message}`)
    }
}

export function validateRoomName(roomName){
    try{
        const roomNameRegex = /^[A-Za-z0-9\s'-]+$/;
        if (!roomName || !roomName.trim()) {
            throw new Error("Room Name is required");
        }
        if (!roomNameRegex.test(roomName)){
            throw new Error('Room Name Regex Test Failed')
        }

    }
    catch(error){
        throw new Error(`Data Validation Error: ${error.message}`)
    }
}

export function validatePromotionName(promotionName){
    try{
        const promotionNameRegex = /^[A-Za-z0-9\s'-]+$/;
        if (!promotionName || !promotionName.trim()) {
            throw new Error("Promotion Name is required");
        }
        if (!promotionNameRegex.test(promotionName)){
            throw new Error('Promotion Name Regex Test Failed')
        }

    }
    catch(error){
        throw new Error(`Data Validation Error: ${error.message}`)
    }
}

export function normalizeDiscount(discount){
    try{
        const num = Number(discount.replace('%',''))
        if (!Number.isFinite(num) || num < 0 || num > 100) {
            throw new Error('Discount must be a number between 0 and 100')
        }
        return num
    }
    catch(error){
        throw new Error(`Data Validation Error: ${error.message}`)
    }
}

export function validateRole(role){
    try{
        if (USER_ROLES.includes(role)){
            return
        }
        throw new Error('Invalid Role')
    }
    catch(error){
        throw new Error(`Data Validation Error: ${error.message}`)
    }
}

export function normalizeUserId(id){
    try{
        if (id == null){
            throw new Error('Null userId')
        }
        if (typeof id !== "string" && typeof id !== "number") {
            throw new Error("Invalid User ID Type");
        }

        const userId = String(id)        
        if(!USER_ID_REGEX.test(userId)){
            throw new Error('Invalid User ID Format')
        }

        return userId
    }
    catch(error){
        throw new Error(`Data Validation Error: ${error.message}`)
    }
}

export function normalizeEmail(mail){
    try{
        if (!mail || typeof mail !== 'string') {
            throw new Error('Invalid Email Data Type')
        }
        const email = mail.toLowerCase().trim()
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)){
            throw new Error('Email Regex Test Failed')
        }
        return email
    }
    catch(error){
        throw new Error(`Data Normalization Error: ${error.message}`)
    }
}

export function validatePhone(phone){
    try{
        if (phone == null) return
        const phoneRegex = /^[0-9-]+$/
        if (typeof phone !== 'string') {
            throw new Error('Invalid Phone Data Type')
        }
        if (!phoneRegex.test(phone)){
            throw new Error('Phone Regex Test Failed')
        }
    }
    catch(error){
        throw new Error(`Data Validation Error: ${error.message}`)
    }
}

export async function passwordMatched(user, password) {
    try {
        if (!password || !user?.password) {
            throw new Error('Invalid Password Comparison')
        }
        return await argon2.verify(user.password, password)

    } catch (error) {
        throw new Error(`Login Error: ${error.message}`)
    }
}


function isStrongPassword(password){
    const minLength = 8

    const hasUpper = /[A-Z]/.test(password)
    const hasLower = /[a-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    return (
        password.length >= minLength &&
        hasUpper &&
        hasLower &&
        hasNumber &&
        hasSymbol
    )
    
}

export function validatePassword(password){
    try{
        if (!password || typeof password !== 'string') {
            throw new Error('Invalid password')
        }
        if (!isStrongPassword(password)){
            throw new Error('Password must be at least 8 characters and include uppercase, lowercase, number, and symbol')
        }
    }
    catch(error){
        throw new Error(`Data Validation Error: ${error.message}`)
    }
}


export function normalizeAmountIntoCents(price){
    try{
        if (price === undefined) return undefined
        const num = Number(price);
        if (!Number.isFinite(num)) {
            throw new Error('Number not Valid')
        }
        return Math.round(num * 100);       
    }
    catch(error){
        throw new Error(`Data Validation Error ${error.message}`)
    }
}

export function normalizeId(id){
    try{
        if (typeof id === 'number'){
            if(!Number.isInteger(id)){
                throw new Error('ID must be an Integer')
            }
            if(!Number.isSafeInteger(id)){
                throw new Error('ID too large')
            }
            id = String(id)
        }
        if (!id || typeof id !== 'string' || id.trim() === ''){
            throw new Error('Invalid Data Type')
        }
        const idRegex = /^[1-9][0-9]*$/
        if (!idRegex.test(id)){
            throw new Error('ID must only contain numbers with no leading zeroes')
        }
        return Number(id)
    }
    catch(error){
        throw new Error(`Data Validation Error: ${error.message}`)
    }
}