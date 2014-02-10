var config = require('../../config');

function ConfigEpic() {

}

ConfigEpic.prototype.parse = function (commits) {
	var groupedCommits = {
		'default': []
	};

	for (var i in config.epics) {
		groupedCommits[config.epics[i]] = [];
	}

	for (var j in commits) {
		var found = false;
		for (var k in config.epics) {
			var epic = config.epics[k];
			if (-1 !== commits[j].toLowerCase().indexOf(epic.toLowerCase())) {
				groupedCommits[epic].push(commits[j]);
				found = true;
				break;
			}
		}

		if (!found) {
			groupedCommits.default.push(commits[j]);
		}

	}

	return groupedCommits;
};


module.exports = ConfigEpic;
