import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRoutes from './users/user-routes.js'
import authRoutes from './auth/auth-routes.js'
import roomRoutes from './rooms/room-routes.js'
import bookingRoutes from './bookings/booking-routes.js'
import promotionRoutes from './promotions/promotion-routes.js'

try{
    
    const app = express()

    const allowedOrigins = [
        "http://localhost:3000",
        "https://uowtaskmaster.com",
        "http://localhost:5173"
    ]

    app.use(cors({
        origin : allowedOrigins,
        credentials : true
    }))
    app.set('view engine', 'ejs')
    app.use(express.json())
    app.use(cookieParser())
    app.use('/auth',authRoutes)
    app.use('/users', userRoutes)
    app.use('/rooms', roomRoutes)
    app.use('/bookings',bookingRoutes)
    app.use('/promotions', promotionRoutes)

    app.use((req, res) => {
        res.status(404).send('Not Found')
    })

    app.use((err, req, res, next) => {
        console.error(err.stack)
        res.status(err.status || 500).json({message: err.message || 'Internal Server Error'})
    })

    const port = process.env.PORT || 3000
    app.listen(port, () => {
        console.log(`Server running on Port ${port}`)
    })
}
catch(error){
    console.error('Error Initializing Server:',error)
}


