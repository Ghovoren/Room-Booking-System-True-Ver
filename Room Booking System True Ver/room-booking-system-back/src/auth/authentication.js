import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'

export const protect = (req, res, next) => {
    const token = req.cookies?.token
    if (!token) {
        return res.status(401).json({ message: 'No Token Found'})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        console.error('JWT Auth Failed', error.message)
        return res.status(401).json({message: 'Invalid or Expired Token'})
    }
}