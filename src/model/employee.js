const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name:{
        type: String,
    },
    Date_of_birth: {
        type: Date,
    },
    email: {
		address: String,
		isVerified: {
			type: Boolean,
			default: false
		},
	},
    profileImage: String,
},
{
    timestamps: true,
});

module.exports = mongoose.model('Employee', employeeSchema);