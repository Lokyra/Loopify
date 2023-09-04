import express from 'express'
import mongoose from 'mongoose';
import cookieSession from 'cookie-session'
import authRoutes from './routes/authRoutes.js'
import './models/User.js'
import passport from "./services/passport.js"
import keys from './config/keys.js'

mongoose.connect(keys.mongoURI)


const app = express()

app.use(
    cookieSession ({
        maxAge: 30 * 24 * 60 * 60 * 3600,
        keys: [keys.cookieKey]
    })
)

app.use(passport.initialize())
app.use(passport.session())


authRoutes(app)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`check at http://localhost:${PORT}`)
});
