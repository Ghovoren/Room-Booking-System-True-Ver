import { 
    getAccountById,
    getAccountByName,
    getAccountByEmail,
    updateAccount,
    updateAccountPassword,
    deleteAccount,
    addBalance,
    deductBalance,
    getAccountByPhone,
    dbQuery
} from '../config/database.js'

import { hashPassword } from '../utils/password-helper.js'

export async function updateUser(id, name, email, phone){
    try {
        const result = await updateAccount(id, name, email, phone)
        if (result.affectedRows === 0){
            throw new Error('Account Not Eligible for this operation')
        }
        return result
        } 
        catch (error) {
            throw new Error(`Update User Error: ${error.message}`)
    }
}

export async function updateUserPassword(id,password){
    try{
        const hashedPassword = await hashPassword(password)
        const result = await updateAccountPassword(id, hashedPassword)
        if (result.affectedRows === 0) {
            throw new Error('Operation Failed')
        }
        return result
    }
    catch(error){
        throw new Error(`Update Password Error: ${error.message}`)
    }
}

export async function getAllUsers(filters){
    try {
        let query = "SELECT * FROM user_info WHERE 1=1 "
        const params = []
        if (filters.name){
            query += "AND name = ? "
            params.push(filters.name)
        }
        if (filters.email){
            console.log(filters.email)
            query += "AND email = ? "
            params.push(filters.email)
        }
        if (filters.phone){
            query += "AND phone = ? "
            params.push(filters.phone)
        }
        if (filters.role){
            query += "AND role = ?"
            params.push(filters.role)
        }
        query += "ORDER BY role, account_id"
        const users = await dbQuery(query, params)
        return users
    } catch (error) {
        throw new Error(`Error Fetching Users: ${error.message}`)
    }
}

export async function getUserById (id) {
    try {
        const user = await getAccountById(id)
        return user
    } catch (error) {
        throw new Error(`Error Fetching User: ${error.message}`)
    }
}

export async function deleteUser(id) {
    try {
        if (id === "001"){
            throw new Error('Deletion of Admin Account not Allowed')
        }
        const result = await deleteAccount(id)
        if (result.affectedRows === 0){
            throw new Error('Account Not Eligible for this operation')
        }
        return result
    } catch (error) {
        throw new Error(`Error Deleting User: ${error.message}`)
    }
}
export async function depositBalance(id, depositAmount){
    try{
        if (typeof depositAmount !== 'number' || Number.isNaN(depositAmount) || depositAmount <= 0){
            throw new Error('Invalid Deposit Amount')
        }
        const existingUser = await getAccountById(id)
        if (!existingUser){
            throw new Error('Account not Eligible for operation')
        }
        if (existingUser.balance === null){
                throw new Error('Account does not have a Balance Function')
            }
        const result = await addBalance(id, depositAmount)
        if (result.affectedRows === 0) {
            throw new Error('Account Not Eligible for this operation')
        }
        return result
    }
    catch(error){
        throw new Error(`Error Depositing Account: ${error.message} `)
    }
}

export async function withdrawBalance(id, withdrawAmount){
    try{
        if (typeof withdrawAmount !== 'number' || Number.isNaN(withdrawAmount) || withdrawAmount <= 0){
            throw new Error('Invalid Withdraw Amount')
        }
        const existingUser = await getAccountById(id)
        if (!existingUser){
            throw new Error('Account not Eligible for operation')
        }
        if (existingUser.balance === null){
                throw new Error('Account does not have a Balance Function')
            }
        if (existingUser.balance < withdrawAmount){
            throw new Error('Insufficient Amount in Balance')
        }
        const result = await deductBalance(id,withdrawAmount)
        if (result.affectedRows === 0){
            throw new Error('Account Not Eligible for this operation')
        }
        return result

    }
    catch(error){
        throw new Error(`Error Withdrawing Amount: ${error.message}`)
    }
}

