var exec = require('child_process').exec;

function Git() {

}

Git.prototype.getLog = function(branch, minRevision, callback) {
	exec("git log --no-merges " + branch, function(err, stdout, stderr) {
		if (err) throw err;

		callback(stdout);
	});
}

Git.prototype.getMinVersion = function(oldBranch, newBranch, callback) {
	callback(0);
}

module.exports = Git;
