var config = require('./config'),
	Vcs = require('./lib/vcs/' + config.vcs.type),
	Builder = require('./lib/builder'),
	Epic = require('./lib/epics/' + config.epics.type + 'epic'),
	Printer = require('./lib/printer/terminalprinter'),
	CommitIgnore = require('./lib/processor/commitignore'),
	UniqueIssues = require('./lib/processor/uniqueissues'),
	CommitLength = require('./lib/processor/commitlength');

if (process.argv.length < 4) return console.error('Missing argument: Usage node index.js old_branch new_branch');

var oldBranch = process.argv[2];
var newBranch = process.argv[3];


var vcs = new Vcs(),
	builder = new Builder(),
	printer = new Printer(),
	epic = new Epic(),
	commitIgnore = new CommitIgnore(),
	uniqueIssues = new UniqueIssues(),
	commitLength = new CommitLength();

var count = 0;

function diff() {
	var logDiff = builder.getDiff();
	logDiff = commitIgnore.process(config, logDiff);
	logDiff = commitLength.process(logDiff);
	logDiff = uniqueIssues.process(config, logDiff);
	epic.parse(logDiff, function (groupedCommits) {
		printer.printChangeLog(groupedCommits);
	});
}

vcs.getMinVersion(oldBranch, newBranch, function (minRevision) {
	vcs.getLog(oldBranch, minRevision, function (log) {
		builder.setOldLog(log);
		if (0 === count) count++;
		else diff();
	});

	vcs.getLog(newBranch, minRevision, function (log) {
		builder.setNewLog(log);
		if (0 === count) count++;
		else diff();
	});
});
