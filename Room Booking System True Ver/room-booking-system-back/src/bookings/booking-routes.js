import express from 'express'
import {
    bookRoomController,
    getAllBookingsController,
    cancelBookingController,
    getBookingsByUserIdController
} from './booking-controller.js'


import { protect } from '../auth/authentication.js'
import { staffAuthorization, userAuthorization } from '../auth/authorization.js'

const router = express.Router()

router.use(protect)
router.post('/', bookRoomController)
router.delete('/:userId/:id', userAuthorization, cancelBookingController)
router.get('/:userId' , userAuthorization, getBookingsByUserIdController)
router.get('/', staffAuthorization, getAllBookingsController)



//code below in case staff needs to manually add booking if user really cannot
//router.post('/', staffAuthorization, bookRoomController)
export default router
