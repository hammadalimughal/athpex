const mongoose = require('mongoose')
const { MONGODB_URI } = require('./config')

const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI)
        console.log(`Database Connected`)
        // await seedSpots();
    } catch (error) {
        console.log(error)
    }
}

connectMongoDB()
