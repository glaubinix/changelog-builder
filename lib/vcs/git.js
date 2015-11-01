var exec = require('child_process').exec,
	LogParser = require('../parser/gitlog'),
	parser = new LogParser(),
	util = require('util');

function Git() {

}

Git.prototype.getDiffLog = function (fromBranch, toBranch, callback) {
	var command = util.format("git log --no-merges '%s'..'%s'", fromBranch, toBranch);

	exec(command, {maxBuffer: 1024 * 1024 * 10}, function (err, stdout, stderr) {
		if (err) throw err;

		callback(parser.parse(stdout));
	});
};

module.exports = Git;
