function UniqueIssues() {

}

UniqueIssues.prototype.process = function (config, commits) {
	if (!config.unique_issues) return commits;

	var issues = {};
	var validCommits = {};
	var pattern = config.issue_format;

	for (var key in commits) {
		if (commits.hasOwnProperty(key) && commits[key]) {
			var commit = commits[key];
			var match = commit.match(pattern);
			if (!match) {
				validCommits[key] = commit;
			} else {
				issues[match[0]] = key;
			}
		}
	}

	for (key in issues) {
		var revision = issues[key];
		validCommits[revision] = commits[revision];
	}

	return validCommits;
};

module.exports = UniqueIssues;
