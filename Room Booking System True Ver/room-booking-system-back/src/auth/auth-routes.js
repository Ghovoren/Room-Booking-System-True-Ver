import express from 'express'
import rateLimit from 'express-rate-limit'
import {
    registerUserController,
    logInUserController,
    logOutUserController
} from './auth-controller.js'
import { protect } from './authentication.js'

const router = express.Router()

const logInLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10, 
    message: 'Too many login attempts from this IP, please try again later'
})


// Auth
router.post('/register', registerUserController)
router.post('/login', logInLimiter, logInUserController)
router.post('/logout', logOutUserController)

router.get('/me', protect, (req, res) =>{
    res.json(req.user)
})

export default router
