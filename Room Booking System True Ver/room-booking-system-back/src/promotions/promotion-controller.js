import {
    getAllPromotions,
    addPromotion,
    getPromotionById,
    editPromotion,
    deletePromotion
} from './promotion-service.js'

import { validatePromotionName, normalizeDiscount } from '../utils/data-validations.js'

export async function createPromotionController(req, res) {
    try {
        let { name, discount } = req.body
        if (!name || !discount){
            return res.status(400).json({message:"Error Registering: Invalid Data"})
        }
        const filters = {}
        validatePromotionName(name)
        filters.name = name
        discount = normalizeDiscount(discount)
        filters.discount = discount
        const result = await addPromotion(filters)
        return res.status(200).json({message:'Promotion Created', result: result})
    } catch (error) {
        console.error(error)
      return res.status(500).json({message:'Error Registering'})
    }
}

export async function getAllPromotionsController (req, res){
    try{
        const result = await getAllPromotions()
        return res.status(200).json({result: result})
    }
    catch(error){
        console.error(error)
        return res.status(500).json({message:`Error Fetching Promotions`})
    }
}

export async function removePromotionController(req, res){
    try{
        const id = req.params.promoId
        const result = await deletePromotion(id)
        return res.status(200).json({result: result})
    }
    catch(error){
        console.error(error)
        return res.status(500).json({message:`Error Removing Promotion`})
    }
}

export async function getPromotionByIdController(req, res) {
    try{
        const id = req.params.promoId
        const result = await getPromotionById(id)
        if (!result){
            return res.status(404).json({message:'Promotion not Found'})
        }
        return res.status(200).json({result: result || []})
    }
    catch(error){
        console.error(error)
        return res.status(500).json({message:'Error Fetching Data'})
    }
}

export async function updatePromotionController(req, res) {
    try{
        const id = req.params.promoId
        let { name, discount } = req.body
        discount = normalizeDiscount(discount)
        const result = await editPromotion(id, name, discount)
        return res.status(200).json({result: result})
    }
    catch(error){
        console.error(error)
        return res.status(500).json({message:'Error Updating Promotion'})
    }
}