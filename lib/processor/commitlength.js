var config = require('../../config');

function CommitLength() {

}

CommitLength.prototype.process = function(commits) {
	if ('full' == config.commit_length) return commits;

	var shortCommits = {};
	for (var key in commits) {
		if (commits.hasOwnProperty(key)) {
			var commit = commits[key];
			var lines = commit.split("\n");

			if (lines[0].length > 2) {
				shortCommits[key] = lines[0];
			} else {
				shortCommits[key] = lines[1];
			}
		}
	}

	return shortCommits;
}

module.exports = CommitLength;
