import {
    bookRoom,
    cancelBooking,
    getAllBookings,
    getBookingsWithUserId,
    getBookingWithId
} from './promotion-service.js'

import { removePromotion } from '../config/database.js'

export async function createPromotionController(req, res) {
    try {
        let { promoName, discount } = req.body
        if (!promoName || !discount){
            return res.status(400).json({message:"Error Registering: Invalid Data"})
        }
        const filters = {}
        validatePromotionName(promoName)
        filters.promoName = promoName
        discount = normalizeDiscount(discount)
        filters.discount = discount
        await createPromotion(filters)
        return res.status(200).json({message:'Promotion Created'})
    } catch (error) {
        console.error(error)
      return res.status(500).json({message:'Error Registering'})
    }
}

export async function getAllPromotionsController (req, res){
    try{
        let { startDate, endDate, minTotalCost, maxTotalCost, roomNo, userId } = req.query
        const filters = {}
        if (startDate) {
            startDate = normalizeDate(startDate)
            filters.startDate = startDate
        }
        if (endDate) {
            endDate = normalizeDate(endDate)
            filters.endDate = endDate
        }
        if (minTotalCost) {
            minTotalCost = normalizeAmountIntoCents(minTotalCost)
            filters.minTotalCost = minTotalCost
        }
        if (maxTotalCost) {
            maxTotalCost = normalizeAmountIntoCents(maxTotalCost)
            filters.maxTotalCost = maxTotalCost
        }
        if (roomNo) {
            roomNo = normalizeId(roomNo)
            filters.roomNo = roomNo
        }
        if (userId) {
            userId = normalizeUserId(userId)
            filters.userId = userId
        }
        const result = await getAllBookings(filters)
      return res.status(200).json({result: result})
    }
    catch(error){
        console.error(error)
        return res.status(500).json({message:`Error Fetching Bookings`})
    }
}

export async function cancelBookingController(req, res){
    try{
        const id = normalizeId(req.params.id)
        const [booking] = await getBookingWithId(id)
        const result = await removeBooking(booking)
        return res.status(200).json({result: result})
    }
    catch(error){
        console.error(error)
        return res.status(500).json({message:`Error Cancelling Booking`})
    }
}

export async function getBookingsByUserIdController(req, res) {
    try{
        const userId = normalizeUserId(req.params.userId)
        let { } = req.query
        const result = await getBookingsWithUserId(userId)
        if (!result){
            return res.status(404).json({message:'Booking not Found'})
        }
        return res.status(200).json({result: result || []})
    }
    catch(error){
        console.error(error)
        return res.status(500).json({message:'Error Fetching Data'})
    }
}
