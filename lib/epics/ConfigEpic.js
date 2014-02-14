var config = require('../../config');

function ConfigEpic() {

}

ConfigEpic.prototype.parse = function (commits, callback) {
	var epicTypes = config.epics.types;
	var groupedCommits = {
		'default': []
	};

	for (var i in epicTypes) {
		groupedCommits[epicTypes[i]] = [];
	}

	for (var j in commits) {
		var found = false;
		for (var k in epicTypes) {
			var epic = epicTypes[k];
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

	callback(groupedCommits);
};


module.exports = ConfigEpic;
