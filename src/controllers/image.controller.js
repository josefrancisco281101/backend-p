import path from 'node:path'
import fs from 'node:fs/promises'

class ImageController {
    static async sendImage (req,res) {
        try {
            const {nombre} = req.params
            if (!nombre) return res.status(400).json({message: "Se requiere el nombre de la imagen"})

            const publicPath = path.sesolve( `./uploads/${nombre}`)
            await fs.access(publicPath)

            res.sendFile(publicPath)
            
            } catch (error) {
            
                if (error?.errno === -4058) return res.status(400).json({message: "La imagen no existe"})
                    res.status(500).json({message: error.message})
        }
    }
}

export default ImageController