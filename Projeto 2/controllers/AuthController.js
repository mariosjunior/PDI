import bcrypt from 'bcryptjs'
import {
    User
} from '../models/User.js'

export default class AuthController {
    static login(req, res) {
        res.render('auth/login')
    }
    static async loginPost(req, res) {
        const {
            email,
            password
        } = req.body

        //Encontrar usuario
        const user = await User.findOne({
            where: {
                email: email
            }
        })

        if (!user) {
            req.flash('message', 'Usuário não existe!')
            res.render('auth/login')
            return
        }
        // Checar senhas

        const passwordMatch = bcrypt.compareSync(password, user.password)

        if (!passwordMatch) {
            req.flash('message', 'Senha inválida!')
            res.render('auth/login')
            return
        }
        //Inicializar a sessão
        req.session.userid = user.id

        req.flash('message', 'Usuário logado com sucesso!')

        req.session.save(() => {
            res.redirect('/')
        })
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

        } catch (e) {
            console.error(e)
        }


    }
    static logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }
}