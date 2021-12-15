import express from 'express'
import {
    engine
} from 'express-handlebars';
import session from 'express-session'
import sessionFileStore from 'session-file-store'
import flash from 'express-flash'
import {
    conn
} from './db/conn.js'
import {
    Tought
} from './models/Tought.js'
import {
    User
} from './models/User.js'
import {
    toughtsRoutes
} from './routes/toughtsRoutes.js'
import {
    authRoutes
} from './routes/authRoutes.js'
import ToughtController from './controllers/ToughtsController.js';

const app = express()

const FileStore = sessionFileStore(session);




app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.use(session({
    name: 'session',
    secret: 'nosso_secret',
    resave: false,
    saveUninitialized: true,
    store: new FileStore,
    cookie: {
        secure: false,
        maxAge: 360000,
        expires: new Date(Date.now() + 360000),
        httpOnly: true
    }
}))

//

app.use(flash())

//

app.use(express.static('public'))

//
app.use((req, res, next) => {
    if (req.session.userid) {
        res.locals.session = req.session
    }
    next()
})

//Routes
app.use('/tought', toughtsRoutes)
app.use('/', authRoutes)

app.get('/', ToughtController.showToughts)

//.sync({force:true})
conn.sync().then(() => {
    app.listen(3000)
}).catch((e) => console.error(e))