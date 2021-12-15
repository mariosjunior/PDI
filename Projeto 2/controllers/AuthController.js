// import {
//     Tought
// } from '../models/Tought'
// import {
//     User
// } from '../models/User'

export default class AuthController {
    static login(req, res) {
        res.render('auth/login')
    }
    static register(req, res) {
        res.render('auth/register')
    }
}