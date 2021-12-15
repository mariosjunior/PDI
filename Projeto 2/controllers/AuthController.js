import bcrypt from 'bcryptjs'
import {
    User
} from '../models/User.js'

export default class AuthController {
    static login(req, res) {
        res.render('auth/login')
    }
    static register(req, res) {
        res.render('auth/register')
    }
    static async registerPost(req, res) {
        const {
            name,
            email,
            password,
            confirmpassword
        } = req.body


        //Password match validation
        if (password != confirmpassword) {
            req.flash('message', 'As senhas não conferem, tente novamente!')
            res.render('auth/register')

            return
        }

        //Checar se o usuario existe
        const checkIfUserExists = await User.findOne({
            where: {
                email: email
            }
        })

        if (checkIfUserExists) {
            req.flash('message', 'O e-mail já está em uso!')
            res.render('auth/register')

            return
        }

        //Criar senha

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)
        const user = {
            name,
            email,
            password: hashedPassword
        }

        try {
            const createdUser = await User.create(user)
            //Inicializar a sessão
            req.session.userid = createdUser.id

            req.flash('message', 'Cadastro realizado com sucesso!')

            req.session.save(() => {
                res.redirect('/')
            })
            res.redirect('/')

        } catch (e) {
            console.error(e)
        }


    }
}