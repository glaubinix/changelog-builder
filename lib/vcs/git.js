var exec = require('child_process').exec,
    config = require('../../config');

function Git() {

}

Git.prototype.getLog = function (branch, minRevision, callback) {
	exec("git log --no-merges '" + branch + "'", {maxBuffer: 1024 * 10000, cwd: config.vcs.path}, function (err, stdout) {
		if (err) throw err;

		callback(stdout);
	});
};

Git.prototype.getMinVersion = function (oldBranch, newBranch, callback) {
	callback(0);
};

module.exports = Git;
