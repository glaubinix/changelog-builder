
function NullEpic() {

}

NullEpic.prototype.parse = function(commits) {
	var groupedCommits = {
		'default': []
	};

	for (var key in commits) {
		groupedCommits.default.push(commits[key]);
	}

	return groupedCommits;
}

module.exports = NullEpic;
