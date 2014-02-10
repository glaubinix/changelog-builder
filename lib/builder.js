var config = require('../config'),
	LogParser = require('./parser/' + config.vcs.type + 'log')
	ArrayHelper = require('./util/arrayhelper');

var logParser = new LogParser(),
	arrayHelper = new ArrayHelper();

function Builder() {
	this.oldLog = {};
	this.newLog = {};
}

Builder.prototype.setOldLog = function(log) {
	this.oldLog = logParser.parse(log);

	return true;
}

Builder.prototype.setNewLog = function(log) {
	this.newLog = logParser.parse(log);

	return true;
}

Builder.prototype.getDiff = function() {
	var diffKeys = arrayHelper.diff(Object.keys(this.newLog), Object.keys(this.oldLog));

	var diff = {};
	for (var i in diffKeys) {
		var key = diffKeys[i];
		diff[key] = this.newLog[key]
	}

	return diff;
}

module.exports = Builder;
