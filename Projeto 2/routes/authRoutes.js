import express from 'express'
import
AuthController
from '../controllers/AuthController.js'
export const authRoutes = express.Router()
authRoutes.get('/login', AuthController.login)
authRoutes.get('/register', AuthController.register)