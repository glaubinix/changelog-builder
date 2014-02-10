function SvnLog() {

}

SvnLog.prototype.parse = function (log) {
	var matches = log.split("------------------------------------------------------------------------");
	var commits = {};

	for (var i in matches) {
		var commit = matches[i];
		if (commit.length > 10) {
			commits = this.parseCommit(commit, commits);
		}
	}

	return commits;
};

SvnLog.prototype.parseCommit = function (commit, commits) {
	var lines = commit.split(/\r\n|\r|\n/g);
	var found = lines[1].match("^r([0-9]+)");
	if (!found) throw new Error('no commit found:' + commit);

	var message = '';
	for (var i = 3; i < lines.length; i++) {
		message += lines[i] + (lines[i].length > 0 ? "\n" : "");
	}

	commits[found[1]] = message;
	return commits;
};

module.exports = SvnLog;
