import User from '../models/User.js'
import { SECRET_KEY } from '../config/config.js'
import jwt from 'jsonwebtoken'

export const validateJWT = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        if (!authorization) return res.status(401).json({message: "No autorizado"})
         
            const  decodificado = jwt.verify(authorization, SECRET_KEY)
            const user = await User.findById(decodificado.userId)

           user = user
            next()
        
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) return res.status(400).json({message: "Sesion expirada"})
        if (error instanceof jwt.TokenExpiredError) return res.status(400).json({message: "token invalido"})

        res.status(500).json({message: "Error al validar el token"})
    }
}