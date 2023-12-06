const mongoose = require('mongoose')

const connect = async () => {
    try {
        const url = process.env.DATABASE_LOCAL;
        await mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true})
        console.log('connect to MongoDB successfully')
    }
    catch (error) {
        console.log('connect to MongoDB failure')
        console.log(error)
    }
}

module.exports = { connect }