import passport from "passport"
import mongoose from 'mongoose'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import keys from "../config/keys.js"

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    
    User.findById(id).then(user => {
        done(null, user)
    })
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, 
    async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({googleId: profile.id}) 

        if (existingUser) {
            done(null, existingUser)
        } else {
            const user = await new User ({ googleId: profile.id }).save()
            done(null, user)
        }
    })
        
)

export default passport
