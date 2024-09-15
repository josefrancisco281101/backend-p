import {pool} from '../config/db.js'
import bcrypt from 'bcrypt'

class User {
    static async all () {
        const [users] = await pool.query('SELECT user_id, f_name, m_name, l_name, username, email, image FROM users') 
        return users
    }

    static async findById (id) {
        const [user] = await pool.execute('SELECT user_id, f_name, m_name, l_name, username, email, password, image FROM users WHERE user_id = ?', [id])
        return user[0]
    }
    
    static findOne (columna, valor) {
        const [user] = pool.execute(`SELECT user_id, f_name, m_name, l_name, username, email, password, image FROM users WHERE ${columna} = ?`, [valor])
        return user[0]
    }

    static async create ({
        fName,
    lName,
    username,
    email,
    password,
    mName,
    image
    }) {
        const camposObligatorios = [
            'f_name',
            'l_name',
            'username',
            'email',
            'password'
        ]
        const encriptar = await bcrypt.hash(password, 10)
        const datosGuardar = [fName, lName, username, email, encriptar]
        
        if (mName) {
            camposObligatorios.push("m_name")
            datosGuardar.push(mName)
        }
        if (image) {
            camposObligatorios.push("image")
            datosGuardar.push(image)
            
        }
        const stringCamposObligatorios = camposObligatorios.join(", ")
        const placeholders = camposObligatorios.map(() => "?").join(", ")

        const query = `INSERT INTO users (${stringCamposObligatorios}) VALUES (${placeholders})`
        const [resultado] = await pool.execute(query, datosGuardar)
        const user = await this.findById(resultado.insertId)

        delete user.password
        return user
    }
    static async deleteByID (id) {
        const [resultado] = await pool.execute(
          'DELETE FROM users WHERE user_id = ?',
          [id]
        )
        return resultado
      }

    static async update ({ userId,
        fName,
        lName,
        username,
        email,
        password,
        mName,
        image}) {
            let query = 'UPDATE users SET '
            const camposActualizar = []
            const valoresActualizar = []
        
            if (fName) {
              camposActualizar.push('f_name = ?')
              valoresActualizar.push(fName)
            }
        
            if (lName) {
              camposActualizar.push('l_name = ?')
              valoresActualizar.push(lName)
            }
        
            if (username) {
              camposActualizar.push('username = ?')
              valoresActualizar.push(username)
            }
        
            if (email) {
              camposActualizar.push('email = ?')
              valoresActualizar.push(email)
            }
        
            if (password) {
              camposActualizar.push('password = ?')
              const encriptada = await bcrypt.hash(password, 10)
              valoresActualizar.push(encriptada)
            }
        
            if (mName) {
              camposActualizar.push('m_name = ?')
              valoresActualizar.push(mName)
            }
        
            if (image) {
              camposActualizar.push('image = ?')
              valoresActualizar.push(image)
            }
        
            if (camposActualizar.length === 0) return undefined
        
            query += camposActualizar.join(', ') + ' WHERE user_id = ?'
            valoresActualizar.push(userId)
        
            const [resultado] = await pool.execute(query, valoresActualizar)
            return resultado
}
}

export default User
