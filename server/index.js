import express from "express"
import authRoutes from "./routes/authRoutes.js"
import passport from "./services/passport.js"


const app = express()

authRoutes(app)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`check at http://localhost:${PORT}`)
});
