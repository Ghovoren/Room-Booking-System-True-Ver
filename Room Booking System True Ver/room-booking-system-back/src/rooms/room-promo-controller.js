import { 
    getPromotionsByRoomId, 
    addPromotionToRoom, 
    deletePromotionFromRoom, 
    updatePromotionOfRoom
} from "./room-promo-service.js"
import { getPromotionById } from "../promotions/promotion-service.js"
import { getRoomById } from "../config/database.js"
import { validatePromotionName, normalizeDiscount } from "../utils/data-validations.js"

export async function getRoomPromotionsController(req, res) {
    try{
        const roomId = req.params.id
        const result = await getPromotionsByRoomId(roomId)
        return res.status(200).json({result: result || []})
    }
    catch(error){
        console.error(error)
        return res.status(500).json({message:'Error Fetching Data'})
    }
}

export async function applyPromotionController(req, res) {
    try{
        const roomId = req.params.id
        let { name } = req.body
         const validRoom = await getRoomById(roomId)
        if (!validRoom){
            return res.status(404).json({message:'Room not Found'})
        }
        validatePromotionName(name)
        const result = await addPromotionToRoom(roomId, name)
        return res.status(200).json({message:'Promotion Added to Room', result: result})
    }
    catch(error){
        console.error(error)
        return res.status(500).json({message:'Error Adding Promotion to Room'})
    }
}

export async function removePromotionController(req, res) {
    try{
        const roomId = req.params.id
        const promoId = req.params.promoId
        const validRoom = await getRoomById(roomId)
        if (!validRoom){
            return res.status(404).json({message:'Room not Found'})
        }
        const validPromo = await getPromotionById(promoId)
        if (!validPromo){
            return res.status(404).json({message:'Promotion not Found'})
        }
        const result = await deletePromotionFromRoom(roomId, promoId)
        return res.status(200).json({message:'Promotion Deleted from Room', result: result})
    }
    catch(error){
        console.error(error)
        return res.status(500).json({message:'Error Deleting Promotion from Room'})
    }
}

export async function updatePromotionController(req, res) {
    try{
        const roomId = req.params.id
        const promoId = req.params.promoId
        let { name } = req.body
        const validRoom = await getRoomById(roomId)
        if (!validRoom){
            return res.status(404).json({message:'Room not Found'})
        }
        const validPromo = await getPromotionById(promoId)
        if (!validPromo){
            return res.status(404).json({message:'Promotion not Found'})
        }
        validatePromotionName(name)
        const result = await updatePromotionOfRoom(roomId, promoId, name, discount)
        return res.status(200).json({message:'Promotion Updated for Room', result: result})
    }
    catch(error){
        console.error(error)
        return res.status(500).json({message:'Error Updating Promotion for Room'})
    }
}