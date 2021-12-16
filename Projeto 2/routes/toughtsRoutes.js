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
toughtsRoutes.post('/add', checkAuth, ToughtController.createToughtSave)
toughtsRoutes.get('/dashboard', checkAuth, ToughtController.dashboard)