function GitLog() {

}

GitLog.prototype.parse = function (log) {
	var matches = log.split(/\r?\n\r?\n/);
	var commits = {};

	var commit = '';
	for (var i in matches) {
		var partial = matches[i].match(/commit\s(.{40})/);
		if (partial) {
			if ('' !== commit) {
				commits = this.parseCommit(commit, commits);
			}

			commit = matches[i];
		} else {
			commit += "\n\n" + matches[i];
		}
	}

	commits = this.parseCommit(commit, commits);

	return commits;
};

GitLog.prototype.parseCommit = function (commit, commits) {
	var found = commit.match(/commit\s(.{40})/);
	if (!found) {
		throw new Error('no commit found');
	}

	var messages = commit.split(/\n\n/);
	if (!messages) {
		throw  new Error('no commit message found');
	}

	commits[found[1]] = messages[1];
	return commits;
};

module.exports = GitLog;
