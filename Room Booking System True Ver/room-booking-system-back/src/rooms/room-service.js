import { 
    getRoomById,
    getRoomByName,
    updateRoomOperational,
    deleteRoom,
    createRoom,
    dbQuery
} from '../config/database.js'

export async function makeRoom(name,capacity,price,operational){
    try{
        const existingRoom = await getRoomByName(name)
        console.log(existingRoom)
        if (existingRoom){
            throw new Error('Cannot Create Duplicate Rooms')
        }
        const result = await createRoom(name,capacity,price,operational)
        return result
    }
    catch(error){
        throw new Error(`Database Insert Error: ${error.message}`)
    }
}

export async function updateRoomAvailability(id, operational){
    try{
        const result = await updateRoomOperational(id, operational)
        if (result.affectedRows === 0){
            throw new Error('Room not available for this operation')
        }
        return result
    }
    catch(error){
        throw new Error(`Database Update Error: ${error.message}`)
    }
}

export async function editRoom(id, name,capacity, price){
    try {
        let updates = []
        let params = []
        if(name !== undefined){
            updates.push("name = ?")
            params.push(name)
        }
        if(capacity !== undefined){
            updates.push("capacity = ?")
            params.push(capacity)
        }
        if(price !== undefined){
            updates.push("price = ?")
            params.push(price)
        }
        if(updates.length === 0) {
            throw new Error('Must have atleast 1 Field to Update')
        }
        const query = `UPDATE room SET ${updates.join(', ')} WHERE room_no = ?`
        params.push(id)
        const result = await dbQuery(query, params)
        if (result.affectedRows === 0){
            throw new Error('Room not Found || no Rows Updated')
        }
        return result
    } 
    catch (error) {
        throw new Error(`Database Rejected Input: ${error.message}`)
    }
}

export async function getAllRooms(filters){
    try {
        let query = "SELECT * FROM room WHERE 1=1 "
        const params = []
        if (filters.name){
            query += "AND name = ? "
            params.push(filters.name)
        }
        if (filters.price){
            query += "AND price = ? "
            params.push(filters.price)
        }
        if (filters.operational){
            query += "AND operational = ? "
            params.push(filters.operational)
        }
        const rows = await dbQuery(query, params)
        return rows
    } 
    catch (error) {
        throw new Error(`Error Fetching Rooms: ${error.message}`)
    }
}

export async function getRoomWithId (id) {
    try {
        const room = await getRoomById(id)
        return room
    } 
    catch (error) {
        throw new Error(`Error Fetching Room: ${error.message}`)
    }
}

export async function getRoomWithName (name) {
    try {
        const room = await getRoomByName(name)
        return room
    } 
    catch (error) {
        throw new Error(`Error Fetching Room: ${error.message}`)
    }
}

export async function removeRoom(id) {
    try {
        
        const result = await deleteRoom(id)
        if (result.affectedRows === 0){
            throw new Error('Account Not Eligible for this operation')
        }
        return result
    } catch (error) {
        throw new Error(`Error Deleting Room; ${error.message}`)
    }
}

export async function getRoomsAvailable(filters){
    try{
        let query = "SELECT * FROM room WHERE operational = 1 "
        const params = []
        if(filters.id){
            query += "AND room_no = ? "
            params.push(filters.id)
        }
        console.log(filters.name)
        if(filters.name){
            query += "AND name = ? "
            params.push(filters.name)
        }
        if(filters.minCapacity){
            query += "AND capacity >= ? "
            params.push(filters.minCapacity)            
        }
        if(filters.maxCapacity){
            query += "AND capacity <= ? "
            params.push(filters.maxCapacity)
        }
        if(filters.minPrice){
            query += "AND price >= ? "
            params.push(filters.minPrice)            
        }
        if(filters.maxPrice){
            query += "AND price <= ? "
            params.push(filters.maxPrice)
        }
        console.log(query)
        const result = await dbQuery(query, params)
        return result
    }
    catch(error){
        throw new Error(`Error Fetching Room: ${error.message}`)
    }
}

