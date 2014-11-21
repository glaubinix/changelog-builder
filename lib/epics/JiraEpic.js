var config = require('../../config'),
	JiraApi = require('jira').JiraApi,
	jira = new JiraApi('https', config.epics.jira.host, null, config.epics.jira.user, config.epics.jira.password, 'latest', true, true);

function JiraEpic() {

}

JiraEpic.prototype.parse = function (commits, callback) {
	var self = this;

	var issueKeys = [],
		issuesToCommits = {},
		commitsWithoutIssues = [];
	for (var i in commits) {
		var commit = commits[i];
		var match = commit.match(config.issue_format);
		if (match) {
			issuesToCommits[match[0]] = commit;
			issueKeys.push(match[0]);
		} else {
			commitsWithoutIssues.push(commit);
		}
	}

	jira.listFields(function (err, fields) {
		if (err) throw err;

		var epicLinkFieldId,
			epicNameFieldId;
		for (var j in fields) {
			if (fields[j].name == "Epic Link") {
				epicLinkFieldId = fields[j].id;
			} else if (fields[j].name == "Epic Name") {
				epicNameFieldId = fields[j].id;
			}
		}

		jira.searchJira("key in (" + issueKeys.join(',') + ")", { fields: [ epicLinkFieldId, 'issuetype', 'parent' ], maxResults:1000 }, function (err, result) {
			if (err) throw err;

			var issue,
				parents = {},
				parentKeys = [],
				epics = {};

			for (var k in result.issues) {
				issue = result.issues[k];
				if ("Sub-task" === issue.fields.issuetype.name) {
					if (!parents[issue.fields.parent.key]) {
						parents[issue.fields.parent.key] = [];
						parentKeys.push(issue.fields.parent.key);
					}

					parents[issue.fields.parent.key].push(issue.key);
				} else {
					var epic = issue.fields[epicLinkFieldId] ? issue.fields[epicLinkFieldId] : 'none';
					if (!epics[epic]) {
						epics[epic] = [];
					}

					epics[epic].push(issue.key);
				}
			}

			if (0 === parentKeys.length) return self.fetchEpicNames(epics, issuesToCommits, commitsWithoutIssues, epicNameFieldId, callback);
			jira.searchJira("key in (" + parentKeys.join(",") + ")", { fields: [ epicLinkFieldId, 'issuetype', 'parent' ]}, function (err, result) {
				if (err) throw err;

				for (var l in result.issues) {
					issue = result.issues[l];

					var epic = issue.fields[epicLinkFieldId] ? issue.fields[epicLinkFieldId] : 'none';
					if (!epics[epic]) {
						epics[epic] = [];
					}

					for (var m in parents[issue.key]) {
						epics[epic].push(parents[issue.key][m]);
					}
				}

				self.fetchEpicNames(epics, issuesToCommits, commitsWithoutIssues, epicNameFieldId, callback);
			});
		});
	});
};

JiraEpic.prototype.fetchEpicNames = function (epics, issuesToCommits, commitsWithoutIssues, epicNameFieldId, callback) {
	var epicKeys = [];
	for (var i in epics) {
		if ('none' !== i) {
			epicKeys.push(i);
		}
	}

	var groupedCommits = {
		'default': commitsWithoutIssues
	};

	if (epics.none) {
		for (var j in epics.none) {
			groupedCommits.default.push(issuesToCommits[epics.none[j]]);
		}
	}

	jira.searchJira("key in (" + epicKeys.join(",") + ")", { fields: [ epicNameFieldId ]}, function (err, result) {
		for (var k in result.issues) {
			var issue = result.issues[k];
			groupedCommits[issue.fields[epicNameFieldId]] = [];
			for (var l in epics[issue.key]) {
				groupedCommits[issue.fields[epicNameFieldId]].push(issuesToCommits[epics[issue.key][l]]);
				delete issuesToCommits[epics[issue.key][l]];
			}
		}
		for (var j in issuesToCommits) {
			groupedCommits.default.push(issuesToCommits[j]);
		}

		callback(groupedCommits);
	});
};


module.exports = JiraEpic;
