import {
    Tought
} from '../models/Tought.js'
// import {
//     User
// } from '../models/User'

export default class ToughtController {
    static async showToughts(req, res) {
        res.render('toughts/home')
    }

    static async dashboard(req, res) {
        res.render('toughts/dashboard')
    }

    static async createTought(req, res) {
        res.render('toughts/create')
    }

    static async createToughtSave(req, res) {
        const tought = {
            title: req.body.title,
            UserId: req.session.userid
        }
        try {
            await Tought.create(tought)

            req.flash('message', 'Pensamento criado com sucesso!')
            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch (e) {
            console.error(e)
        }

    }
}