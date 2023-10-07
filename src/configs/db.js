const mongoose = require('mongoose')

const connect = async () => {
    try {
        const url = process.env.DATABASE_URL;
        await mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true})
        console.log('connect successfully')
    }
    catch (error) {
        console.log('connect failure')
        console.log(error)
    }
}

module.exports = { connect }