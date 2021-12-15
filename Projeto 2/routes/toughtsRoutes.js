import express from 'express'
import
ToughtController
from '../controllers/ToughtsController.js'
export const router = express.Router()
router.get('/', ToughtController.showToughts)