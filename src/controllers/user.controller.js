import User from '../models/User.js'

class UserController {
   static async index (req, res) {
    try {
        const users = await User.all()
        res.json(users)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
   }

   static async getByID (req, res) {
    try {
        delete req.user.password
        res.json(req.user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
   }

   static async store (req, res) {
    try {
        const {fName, mName, lName, username, email, password} = req.body
        if (!fName || !lName || !username || !email || !password) return res.status(400).json({message: "Faltan datos"})

        const user = await User.create({fName, mName, lName, username, email, password})
        res.status(201).json({message: "Usuario creado", data: user})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
   }
   static async delete (req, res) {
    try {
        const {id} = req.params
        const resultado = await User.deleByID(id)

        if (resultado.affectedRows === 0) return res.status(404).json({message: "Usuario no encontrado"})
            
        res.json({message: "Usuario eliminado"})
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
   }

   static async updatePut (req, res) {
    try {
        const {id} = req.params
        const {fName, mName, lName, username, email, password, image} = req.body

        if (!fName || !lName || !username || !email || !password) return res.status(400).json({message: "Faltan datos"})

            const resultado = await User.update({
                userId: id,
                fName,
                mName,
                lName,
                username,
                email,
                password,
                image
            })
            
            if (resultado.affectedRows === 0) return res.status(404).json({message: "Usuario no encontrado"})
                const user = await User.findById(id)
            delete user.password
            res.json({ message: 'Usuario actualizado', data: user })
            }  catch (error) {
                res.status(500).json({message: error.message })
        
            } 
      }
        
      static async updatePatch (req,res) {
        try {
            const { id } = req.params
      const {
        fName,
        lName,
        username,
        email,
        password,
        mName,
        image
      } = req.body

      const resultado = await User.update({
        userId: id,
        fName,
        mName,
        lName,
        username,
        email,
        password,
        image
      })
      if (resultado.affectedRows === 0) return res.status(404).json({ message: 'No se pudo actualizar el usuario' })
     
        const user = await User.findById(id)
        delete user.password

        res.json({message: 'Usuario actualizado', data: user})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
      }
    }       

    export default UserController