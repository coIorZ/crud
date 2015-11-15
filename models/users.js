var Users = (function () {
	var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		userSchema = new Schema({
			username: String,
			password: String,
			isAdmin: Boolean
		});
	// set field username unique
	userSchema.index({ username: 1 }, { unique: true });

	return mongoose.model('User', userSchema);
})();

module.exports = Users;

	
