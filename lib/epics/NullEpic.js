
function NullEpic() {

}

NullEpic.prototype.parse = function (commits, callback) {
	var groupedCommits = {
		'default': []
	};

	for (var key in commits) {
		groupedCommits.default.push(commits[key]);
	}

	callback(groupedCommits);
};

module.exports = NullEpic;
