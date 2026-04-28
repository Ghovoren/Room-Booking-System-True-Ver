import express from 'express'
import {
    getAllUsersController,
    updateUserController,
    deleteUserController,
    depositController,
    withdrawController,
    getUserByIdController,
    createNewUserController
} from './user-controller.js'


import { protect } from '../auth/authentication.js'
import { staffAuthorization, userAuthorization } from '../auth/authorization.js'

const router = express.Router()
router.use(protect)

// Users
router.get('/', staffAuthorization, getAllUsersController)
router.post('/', staffAuthorization, createNewUserController)
router.get('/:userId' , userAuthorization, getUserByIdController)
router.put('/:userId' , userAuthorization, updateUserController)
router.delete('/:userId' , userAuthorization, deleteUserController)


// Balance
router.put('/:userId/balance/deposit' , userAuthorization, depositController)
router.put('/:userId/balance/withdraw' , userAuthorization, withdrawController)

export default router
