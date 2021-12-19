import express from 'express'
import
ToughtController
from '../controllers/ToughtsController.js'
import {
    checkAuth
} from '../helpers/auth.js'
export const toughtsRoutes = express.Router()
toughtsRoutes.get('/', ToughtController.showToughts)
toughtsRoutes.get('/add', checkAuth, ToughtController.createTought)
toughtsRoutes.get('/edit/:id', checkAuth, ToughtController.updateTought)
toughtsRoutes.post('/edit', checkAuth, ToughtController.updateToughtSave)
toughtsRoutes.post('/add', checkAuth, ToughtController.createToughtSave)
toughtsRoutes.post('/remove', checkAuth, ToughtController.removeTought)
toughtsRoutes.get('/dashboard', checkAuth, ToughtController.dashboard)