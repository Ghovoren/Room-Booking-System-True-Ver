import express from 'express'
import {
    createRoomController,
    getAllRoomsController,
    updateRoomController,
    deleteRoomController,
    getRoomByIdController,
    getAvailableRoomsController,
    updateRoomAvailabilityController
} from './room-controller.js'

import {
    getRoomPromotionsController,
    applyPromotionController,
    removePromotionController,
    updatePromotionController
} from './room-promo-controller.js'


import { protect } from '../auth/authentication.js'
import { staffAuthorization, userAuthorization } from '../auth/authorization.js'

const router = express.Router()

router.use(protect)
router.post('/', staffAuthorization, createRoomController)
router.get('/filter', getAvailableRoomsController)
router.get('/', staffAuthorization, getAllRoomsController)
router.put('/:id/availability', staffAuthorization, updateRoomAvailabilityController)
router.put('/:id' , staffAuthorization, updateRoomController)
router.delete('/:id', staffAuthorization, deleteRoomController)
router.get('/:id' ,staffAuthorization, getRoomByIdController)
router.post('/:id/promotions', staffAuthorization, applyPromotionController)
router.delete('/:id/promotions/:promoId', staffAuthorization, removePromotionController)
router.put('/:id/promotions/:promoId', staffAuthorization, updatePromotionController)
router.get('/:id/promotions', getRoomPromotionsController)


export default router
