require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')

const PORT = process.env.PORT || 8888
const app = express()

connectDB()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))

app.use('/api/TeachingHours',require('./routes/teachingHoursRoute'))
app.use('/api/Institution',require('./routes/InstitutionRoute'))
app.use('/api/IntegrationHour',require('./routes/IntegrationHoursRoute'))
app.use('/api/PersonalBasketHours',require('./routes/PersonalBasketHoursRoute'))
app.use('/api/PersonalBasketStudent',require('./routes/PersonalBasketStudentRoute'))
app.use('/api/SupportAllocation',require('./routes/SupportAllocationRoute'))
app.use('/api/TeachersDetails',require('./routes/TeachersDetailsRoute'))
app.use('/api/User',require('./routes/UserRoute'))
app.use('/api/auth',require('./routes/authRoute'))
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
mongoose.connection.on('error', err => {
    console.log(err)
})