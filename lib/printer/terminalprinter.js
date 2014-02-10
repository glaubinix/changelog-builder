
function TerminalPrinter() {

}

TerminalPrinter.prototype.printChangeLog = function(groupedCommits) {
	for (var epic in groupedCommits) {
		console.log(epic);

		var commits = groupedCommits[epic];
		for (var i in groupedCommits[epic]) {
			console.log(commits[i]);
		}

		console.log("\n");
	}
}

module.exports = TerminalPrinter;
