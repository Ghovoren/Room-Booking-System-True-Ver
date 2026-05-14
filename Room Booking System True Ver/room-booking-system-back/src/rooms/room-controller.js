import {
    makeRoom,
    getAllRooms,
    removeRoom,
    getRoomWithId,
    getRoomWithName,
    getRoomsAvailable,
    editRoom,
    updateRoomAvailability,
    getRoomPromotions
} from './room-service.js'

import { validateName, normalizeOperational, normalizeCapacity } from './room-data-validations.js'
import { normalizeId, normalizeAmountIntoCents } from '../utils/data-validations.js'

export async function createRoomController(req, res) {
    try {
        let { name, capacity, price, operational} = req.body
        validateName(name)
        capacity = normalizeCapacity(capacity)
        price = normalizeAmountIntoCents(price)
        operational = normalizeOperational(operational)
        const result = await makeRoom(name, capacity, price, operational)
        console.log(result)
        return res.status(200).json({message:'Room Created', result: result})
    } catch (error) {
        console.error(error)
      return res.status(500).json({message:'Error Registering'})
    }
}

export async function updateRoomController (req, res){
    try{
        const id = normalizeId(req.params.id)
        let {name, capacity, price} = req.body
        validateName(name)
        capacity = normalizeCapacity(capacity)
        price = normalizeAmountIntoCents(price)
        const result = await editRoom(id, name, capacity, price)
      return res.status(200).json({result: result})
    }
    catch(error){
        console.error(error)
        return res.status(500).json({message:`Error Updating Room`})
    }
}

export async function updateRoomAvailabilityController(req, res){
    try{
        const id = normalizeId(req.params.id)
        let {operational} = req.body
        operational = normalizeOperational(operational)
        const result = await updateRoomAvailability(id, operational)
        return res.status(200).json({message:"Room Availability Updated"})
    }
    catch(error){
        console.error(error)
        res.status(500).json({message:'Error Updating Room'})
    }
}

export async function deleteRoomController(req, res){
    try{
        const id = normalizeId(req.params.id)
        const result = await removeRoom(id)
        return res.status(200).json({result: result})
    }
    catch(error){
        console.error(error)
        return res.status(500).json({message:`Error Deleting Room`})
    }
}

export async function getRoomByIdController(req, res) {
    try{
        const id = normalizeId(req.params.id)
        const result = await getRoomWithId(id)
        if (!result){
            return res.status(404).json({message:'Room not Found'})
        }
        return res.status(200).json({result: result || []})
    }
    catch(error){
        console.error(error)
        return res.status(500).json({message:'Error Fetching Data'})
    }
}


export async function getAllRoomsController(req, res) {
    try{
        let { name, capacity, price, operational} = req.query
        const filters = {}
        if (capacity){
            capacity = normalizeCapacity(capacity)
            filters.capacity = capacity
        }
        if (name){
            validateName(name)
            filters.name = name
        }
        if (price){
            price = normalizeAmountIntoCents(price)
            filters.price = price
        }
        if (operational != null){
            operational = normalizeOperational(operational)
            filters.operational = operational
        }
        const result = await getAllRooms(filters)
        if (!result){
          return res.status(400).json({message:`Error Fetching Data: Empty Database`})
        }
        return res.status(200).json({result: result || []})
    }
    catch(error){
        console.error(error)
        return res.status(500).json({message:'Error Fetching Data'})
    }
}

export async function getRoomByNameController(req, res){
    try{
        const { name } = req.query
        validateName(name)
        const result = await getRoomWithName(name)
        if (!result){
            return res.status(400).json({message:'No Room with that Name'})
        }
        return res.status(200).json({result: result || []})
    }
    catch(error){
        console.error(error)
        res.status(500).json({message:'Error Fetching Data'})
    }
}

export async function getAvailableRoomsController(req, res){
    try{
        let { id, name, minCapacity, maxCapacity, minPrice, maxPrice } = req.query
        const filters = {}
        if (id) {
            id = normalizeId(id)
            filters.id = id
        }
        if (name) {
            validateName(name)
            filters.name = name
        }
        if (minCapacity) { 
            minCapacity = normalizeCapacity(minCapacity)
            filters.minCapacity = minCapacity
        }
        if (maxCapacity) {
            maxCapacity = normalizeCapacity(maxCapacity)
            filters.maxCapacity = maxCapacity
        }
        if (minPrice) {
            minPrice = normalizeAmountIntoCents(minPrice)
            filters.minPrice = minPrice
        }
        if (maxPrice) {
            maxPrice = normalizeAmountIntoCents(maxPrice)
            filters.maxPrice = maxPrice
        }
        const result = await getRoomsAvailable(filters)
        if (!result){
            return res.status(400).json({message:'No Rooms Available'})
        }
        return res.status(200).json({result: result || []})
    }
    catch(error){
        console.error(error)
        res.status(500).json({message:'Error Fetching Data'})
    }
}

export async function getRoomPromotionsController(req, res){
    try{
        const id = normalizeId(req.params.id)
        const result = await getRoomPromotions(id)
        if (!result){
            return res.status(400).json({message:'No Promotions for this Room'})
        }
        return res.status(200).json({result: result || []})
    }
    catch(error){
        console.error(error)
        res.status(500).json({message:'Error Fetching Data'})
    }
}