import express from 'express'
import exphbs from 'express-handlebars'
import sessions from 'sessions'
import * as FileStore from 'session-file-store'
import flash from 'express-flash'
import {
    conn
} from './db/conn.js'
//const conn = require('./db/conn')
const app = express()

conn.sync().then(() => {
    app.listen(300)
}).catch((e) => console.error(e))