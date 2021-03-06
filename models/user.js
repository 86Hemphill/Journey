const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

let userSchema = new Schema ({
    firstname: { type: String, required: true },
	lastname: { type: String, required: true },
	emailAddress: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	trips: [
		{
			startpoint: { type: String, required: true },
			endpoint: { type: String, required: true },
			budget: { type: Number },
			people: { type: Number, default: 1 },
			vehicle: { type: String },
			startDate: { type: Date },
			endDate: { type: Date },
			stops: { type: Array },
			night: { type: String }
		}
	]

});

// Define schema methods
userSchema.methods = {
	checkPassword: function (user, inputPassword) {
		return bcrypt.compareSync(inputPassword, user.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
userSchema.pre('save', function (next) {
	if (!this.password) {
		console.log('models/user.js =======NO PASSWORD PROVIDED=======')
		next()
	} else {
		console.log('models/user.js hashPassword in pre save');
		
		this.password = this.hashPassword(this.password)
		next()
	}
})

const User = mongoose.model('User', userSchema);

module.exports = User;