var config = require('../../config');

function CommitIgnore() {

}

CommitIgnore.prototype.process = function(commits) {
	if (config.ignore_comments.length === 0) return commits;

	for (var i in config.ignore_comments) {
		var ignoreComment = config.ignore_comments[i];
		for (var j in commits) {
			if (commits.hasOwnProperty(j)) {
				var commit = commits[j];
				if (commit.search(ignoreComment) != -1) {
					delete commits[j];
				}
			}
		}
	}

	return commits;
}

module.exports = CommitIgnore;
