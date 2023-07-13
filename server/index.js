import express from "express"
import passport from "./services/passport"
import authRoutes from "./routes/authRoutes"


const app = express()

authRoutes(app)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`check at http://localhost:${PORT}`)
});
