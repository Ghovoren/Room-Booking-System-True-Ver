import express from 'express'
import {
    createPromotionController,
    removePromotionController,
    getPromotionByIdController,
    updatePromotionController,
    getAllPromotionsController
} from './promotion-controller.js'


import { protect } from '../auth/authentication.js'
import { staffAuthorization, userAuthorization } from '../auth/authorization.js'

const router = express.Router()

router.use(protect)
router.post('/', createPromotionController)
router.delete('/:promoId', staffAuthorization, removePromotionController)
router.get('/:promoId', getPromotionByIdController)
router.put('/:promoId', staffAuthorization, updatePromotionController)
router.get('/', getAllPromotionsController)



//code below in case staff needs to manually add booking if user really cannot
//router.post('/', staffAuthorization, bookRoomController)
export default router
