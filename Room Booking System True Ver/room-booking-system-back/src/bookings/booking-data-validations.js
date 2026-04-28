
import { getRoomWithId } from "../rooms/room-service.js"

import { getUserById } from "../users/user-service.js"

import { dbQuery } from "../config/database.js"

export function normalizeDate(input) {
    try{
        const date = new Date(input)

        if (isNaN(date.getTime())) {
            throw new Error('Invalid date')
        }

        const now = new Date()

        if (date < now) {
            throw new Error('Date cannot be in the past')
        }
        return date
    }
    catch(error){
        throw new Error(`Date Data Validation Failed: ${error.message}`)
    }
}

export async function checkOverlap(start,end, roomNo){
    try{
        const result = await dbQuery("SELECT 1 FROM booking WHERE start_date < ? AND end_date > ? AND room_no = ? ",[end,start, roomNo])
        return result.length > 0
    }
    catch(error){
        throw new Error(`Overlap Checker Error: ${error.message}`)
    }
}

export async function checkRoom(roomNo){
    try{
        const result = await getRoomWithId(roomNo)
        return result
    }
    catch(error){
        throw new Error(`Room Validation Error ${error.message}`)
    }
}
export async function checkUser(userId){
    try{
        const result = await getUserById(userId)
        return result
    }
    catch(error){
        throw new Error(`User Validation Error: ${error.message}`)
    }
}