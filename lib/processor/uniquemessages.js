function UniqueMessages() {

}

UniqueMessages.prototype.process = function (commits) {
	var seen = {};
	var result = {};
	var message;

	for (var key in commits) {
		message = commits[key];

		if (!seen[message]) {
			seen[message] = true;
			result[key] = message;
		}
	}

	return result;
};

module.exports = UniqueMessages;
