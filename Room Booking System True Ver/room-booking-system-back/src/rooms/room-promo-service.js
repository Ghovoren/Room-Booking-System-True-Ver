import { dbQuery, getPromotionByPromoId } from "../config/database.js";

export async function getPromotionsByRoomId(roomId) {
    const query = "SELECT rp.promo AS id, pc.name, pc.discount FROM room_promo rp JOIN promo_codes pc ON rp.promo = pc.id WHERE rp.room_no = ?"
    try{
        const result = await dbQuery(query, [roomId])
        
        return result
    }
    catch(error){
        throw new Error(`Error Fetching Promotions: ${error.message}`)
    }
}

export async function addPromotionToRoom(roomId, promoName) {
    try{
        const promotionQuery = "SELECT id FROM promo_codes WHERE name = ?"
        const promoResult = await dbQuery(promotionQuery, [promoName])
        const promotionId = promoResult[0].id
        const query = "INSERT INTO room_promo (room_no, promo) VALUES (?, ?)"
        const result = await dbQuery(query, [roomId, promotionId])
        if (result.affectedRows === 0) {
            throw new Error('Failed to add promotion to room')
        }
        const promotion = await getPromotionByPromoId(promotionId)
        return promotion
    }
    catch(error){
        throw new Error(`Error Adding Promotion: ${error.message}`)
    }
}

export async function deletePromotionFromRoom(roomId, promotionId) {
    const query = "DELETE FROM room_promo WHERE room_no = ? AND promo = ?"
    try{
        const result = await dbQuery(query, [roomId, promotionId])
        return result
    }
    catch(error){
        throw new Error(`Error Deleting Promotion: ${error.message}`)
    }
}

export async function updatePromotionOfRoom(roomId, promotionId, updatedPromotionId) {
    const query = "UPDATE room_promo SET promo = ? WHERE room_no = ? AND id = ?"
    try{
        const result = await dbQuery(query, [updatedPromotionId, roomId, promotionId])
        return result
    }
    catch(error){
        throw new Error(`Error Updating Promotion: ${error.message}`)
    }
}

export async function getPromotionById(promotionId) {
    const query = "SELECT * FROM room_promo WHERE id = ?"
    try{
        const result = await dbQuery(query, [promotionId])
        return result
    }
    catch(error){
        throw new Error(`Error Fetching Promotion: ${error.message}`)
    }
}