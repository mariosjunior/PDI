// import {
//     Tought
// } from '../models/Tought'
// import {
//     User
// } from '../models/User'

export default class ToughtController {
    static async showToughts(req, res) {
        res.render('toughts/home')
    }
}