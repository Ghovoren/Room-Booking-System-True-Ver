import { 
    getRoomById,
    getRoomByName,
    updateRoomOperational,
    deleteRoom,
    dbQuery,
    createBooking,
    getBookingById,
    removeBooking,
    getBookingsByUserId
} from '../config/database.js'
import { depositBalance, withdrawBalance } from '../users/user-service.js'
import { checkOverlap, checkRoom, checkUser } from './booking-data-validations.js'

export async function bookRoom(filters){
    try{
        const validRoom = await checkRoom(filters.roomNo)
        if (!validRoom){
            throw new Error('Room does not exist or is not operational')
        }
        const overlap = await checkOverlap(filters.startDate,filters.endDate, filters.roomNo)
        if (overlap){
            throw new Error ('Cannot Overlap with another Booking')
        }
        const validUser = await checkUser(filters.userId)
        if (!validUser){
            throw new Error('User does not exist or not allowed to book')
        }
        filters.totalCost = getTotalCost(filters.startDate,filters.endDate,validRoom)
        if (filters.totalCost > validUser.balance){
            throw new Error('Insufficient Funds')
        }
        const payment = await createBooking(filters)



    }
    catch(error){
        throw new Error(`Booking Room Error: ${error.message}`)
    }
}

function getTotalCost(startDate, endDate, room){
    const milliseconds = endDate - startDate
    const hours = Math.floor(milliseconds / (1000 * 60 * 60))
    return room.price * hours
}

export async function getAllBookings(filters){
    try {
        let query = "SELECT * FROM booking WHERE 1=1 "
        const params = []
        if (filters.startDate){
            query += "AND end_date > ? "
            params.push(filters.name)
        }
        if (filters.endDate){
            query += "AND start_date < ? " 
            params.push(filters.price)
        }
        if (filters.minTotalCost){
            query += "AND totalCost >= ? "
            params.push(filters.minTotalCost)
        }
        if (filters.maxTotalCost){
            query += "AND totalCost <= ? "
            params.push(filters.maxTotalCost)
        }
        if (filters.roomNo){
            query += "AND room_no = ? "
            params.push(filters.roomNo)
        }
        if (filters.userId){
            query += "AND user_id = ? "
            params.push(filters.userId)
        }
        const [result] = await dbQuery(query, params)
        return result
    } 
    catch (error) {
        throw new Error(`Error Fetching Bookings`)
    }
}

export async function getBookingsWithUserId (userId) {
    try {
        const result = await getBookingsByUserId(userId)
        return result 
    } 
    catch (error) {
        throw new Error(`Error Fetching Bookings ${error.message}`)
    }
}

export async function cancelBooking(id) {
    try {
        const booking = getBookingById(id)
        const now = new Date()
        if (booking.start_date < now){
            throw new Error('Cannot cancel Bookings from the past')
        }
        const result = await removeBooking(booking)
        if (result.affectedRows === 0){
            throw new Error('Booking Not Eligible for this operation')
        }
        return result
    } catch (error) {
        throw new Error(`Error Deleting Room ${error.message}`)
    }
}

export async function getBookingWithId(id){
    try{
        const result = getBookingById(id)
        if (!result){
            throw new Error('Booking Not Found')
        }
        return result
    } catch (error) {
        throw new Error(`Error Deleting Room ${error.message}`)
    }
}