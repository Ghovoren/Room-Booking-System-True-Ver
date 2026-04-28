import argon2 from 'argon2'


export async function hashPassword(password){
    try{
    const hashedPassword = await argon2.hash(password)
    return hashedPassword
    }
    catch(error){
        throw new Error(`Hashing Failed: ${error.message}`)
    }
}