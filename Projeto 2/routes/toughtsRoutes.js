import express from 'express'
import
ToughtController
from '../controllers/ToughtsController.js'
export const toughtsRoutes = express.Router()
toughtsRoutes.get('/', ToughtController.showToughts)