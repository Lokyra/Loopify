import express from "express"
import passport from "passport"
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import keys from "./config/key.js"

const app = express()

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, 
    accessToken => {
        console.log(accessToken)
    })
)


app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
    })
)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`check at http://localhost:${PORT}`)
});
