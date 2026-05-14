import {
    getPromotions,
    createPromotion,
    getPromotionByName,
    removePromotion,
    updatePromotion,
    getPromotionByPromoId
} from '../config/database.js'
export async function getAllPromotions() {
    try{
        const result = await getPromotions()
        return result
    }
    catch(error){
        throw new Error(`Error Fetching Promotions: ${error.message}`)
    }
}

export async function addPromotion(filters) {
    try{
        const result = await createPromotion(filters.name, filters.discount)
        const promotion = await getPromotionByName(filters.name)
        return promotion
    }
    catch(error){
        throw new Error(`Error Creating Promotion: ${error.message}`)
    }
}

export async function deletePromotion(id) {
    try{
        const result = await removePromotion(id)
        if (result.affectedRows === 0) {
            throw new Error('Promotion not found')
        }
        return result
    }
    catch(error){
        console.error(error)
        throw new Error(`Error Removing Promotion: ${error.message}`)
    }
}

export async function editPromotion(id, newName, discount) {
    try{
        const result = await updatePromotion(id, newName, discount)
        if (result.affectedRows === 0) {
            throw new Error('Promotion not found or no changes made')
        }
        return result
    }
    catch(error){
        console.error(error)
        throw new Error(`Error Updating Promotion: ${error.message}`)
    }
}

export async function getPromotionById(id) {
    try{
        const result = await getPromotionByPromoId(id)
        if (!result){
            throw new Error('Promotion not Found')
        }
        return result
    }
    catch(error){
        console.error(error)
        throw new Error(`Error Fetching Promotion: ${error.message}`)
    }
}