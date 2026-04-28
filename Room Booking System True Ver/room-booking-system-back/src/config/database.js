import mysql from 'mysql2'
import dotenv from 'dotenv'
import { depositBalance } from '../users/user-service.js'
dotenv.config()

const pool =mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise() 

export async function createAccount(id, name, email, password, phone = null, balance = 0, role = 'student') {
const [result] = await pool.query("INSERT INTO account (account_id, name, email, password, phone, balance, role) VALUES (?, ?, ?, ?, ?, ?, ?)", [id, name, email, password, phone, balance, role])

return result
}

export async function updateAccount(id, name, email, phone = null) {
const [result] = await pool.query("UPDATE account SET name = ?, email = ?, phone = ? WHERE account_id = ?", [name, email, phone, id])

return result
}

export async function updateAccountPassword(id, password){
    const [result] = await pool.query("UPDATE account SET password = ? WHERE account_id = ?",[password, id])

    return result
}

export async function addBalance(id, balance) {
const [result] = await pool.query("UPDATE account SET balance = balance + ? WHERE account_id = ?", [balance, id])

return result
}

export async function deductBalance(id, amount) {
const [result] = await pool.query("UPDATE account SET balance = balance - ? WHERE account_id = ? AND balance >= ?", [amount, id, amount])

return result
}

export async function deleteAccount(id) {
const [result] = await pool.query("DELETE FROM account WHERE account_id = ? AND (balance = 0 OR balance IS NULL)", [id])

return result
}

export async function getAccountById(id){
    const [result] = await pool.query("SELECT * FROM user_info WHERE account_id = ?", [id])
    
    return result[0] || null
}

export async function getAccountByEmail(email) {
const [result] = await pool.query("SELECT * FROM account WHERE email = ?", [email])

return result[0] || null
}

export async function getPasswordfromAccount(email){
    const [result] = await pool.query("SELECT account_id, role, password FROM account WHERE email = ?", [email])
    return result[0] || null
}

export async function getAccountByName(name) {
const [result] = await pool.query("SELECT * FROM user_info WHERE name = ?", [name])

return result[0] || null
}

export async function getAccountByPhone(phone){
    const [result] = await pool.query("SELECT * FROM user_info WHERE phone = ?", [phone])
    
    return result[0] || null
}

//====================================================================================================

export async function getRoomById(roomId) {
const [result] = await pool.query("SELECT * FROM room WHERE room_no = ?", [roomId])

return result[0] || null
}

export async function getRoomByName(roomName){
    const [result] = await pool.query("SELECT * FROM room WHERE name = ?",[roomName])

    return result[0] || null
}

export async function createRoom(name, capacity = 1, price = 0, operational = false) {
    const [result] = await pool.query("INSERT INTO room (name, capacity, price, operational) VALUES (?, ?, ?, ?)", [name, capacity, price, operational])

return result
}

export async function deleteRoom(id) {
    const conn = await pool.getConnection()
    try{
        const [roomBookings] = await pool.query("SELECT user_id, total_cost FROM booking WHERE room_no = ? ",[id])
        for (const booking of roomBookings){
            await conn.query("UPDATE account SET balance = balance + ? WHERE account_id = ? ",[booking.total_cost, booking.user_id])
        }
        const [result] = await pool.query("DELETE FROM room WHERE room_no = ?", [id])
        if (result.affectedRows === 0){
            throw new Error('Failed to Delete Room')
        }
        conn.commit()
        return result

    }
    catch(error){
        await conn.rollback()
        throw new Error(`Room Deletion Error ${error.message}`)
    }
    finally{
        conn.release()
    }
}

export async function updateRoomOperational(id,operational){
    const [result] = await pool.query('UPDATE room SET operational =? WHERE room_no = ?',[operational,id])
    return result
}

//==================================================================================================================

export async function createBooking(filters){
    const conn = await pool.getConnection()
    try{
        await conn.beginTransaction()
        await conn.query("UPDATE account SET balance = balance - ? WHERE account_id = ?", [filters.totalCost, filters.userId])
        const [result] = await conn.query("INSERT INTO booking(start_date, end_date, total_cost, room_no, user_id) VALUES (?, ?, ?, ?, ?)",[filters.startDate, filters.endDate, filters.totalCost, filters.roomNo, filters.userId])
        if (result.affectedRows === 0){
            throw new Error('No Booking Created')
        }
        await conn.commit()
        return result
    }
    catch(error){
        await conn.rollback()
        throw new Error(`Booking Insert Error ${error.message}`)
    }
    finally{
        conn.release()
    }
}

export async function getBookingsByUserId(userId) {
const [result] = await pool.query("SELECT * FROM booking WHERE user_id = ?", [userId])

return result
}

export async function getBookingById(id){
    const [result] = await pool.query("SELECT * FROM booking WHERE id = ? ", [id])
}

export async function removeBooking(booking) {
    const conn = await pool.getConnection()
    try{
        const refund = await depositBalance(booking.user_id, booking.total_cost)
        if (refund.affectedRows === 0){
            throw new Error ('Refund Error')
        }
        const [result] = await pool.query("DELETE FROM booking WHERE id = ?", [id])
        if (result.affectedRows === 0){
            throw new Error('Deletion Error')
        }
        await conn.commit()
        return result
    }
    catch(error){
        await conn.rollback()
        throw new Error(`Booking Cancellation Error ${error.message}`)
    }
    finally{
        await conn.release()
    }
}


export async function dbQuery(query,params){
    const [result] = await pool.query(query, params)
    return result
}