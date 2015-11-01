var config = require('./config'),
	Vcs = require('./lib/vcs/' + config.vcs.type),
	Epic = require('./lib/epics/' + config.epics.type + 'Epic'),
	Printer = require('./lib/printer/terminalprinter'),
	CommitIgnore = require('./lib/processor/commitignore'),
	UniqueIssues = require('./lib/processor/uniqueissues'),
	UniqueMessages = require('./lib/processor/uniquemessages'),
	CommitLength = require('./lib/processor/commitlength');

if (process.argv.length < 4) return console.error('Missing argument: Usage node index.js old_branch new_branch');

var oldBranch = process.argv[2];
var newBranch = process.argv[3];

var vcs = new Vcs(),
	printer = new Printer(),
	epic = new Epic(),
	commitIgnore = new CommitIgnore(),
	uniqueIssues = new UniqueIssues(),
	uniqueMessages = new UniqueMessages(),
	commitLength = new CommitLength();

vcs.getDiffLog(oldBranch, newBranch, function(logDiff) {
	logDiff = commitIgnore.process(config, logDiff);
	logDiff = commitLength.process(config, logDiff);
	logDiff = uniqueIssues.process(config, logDiff);
	logDiff = uniqueMessages.process(logDiff);
	epic.parse(logDiff, function (groupedCommits) {
		printer.printChangeLog(groupedCommits);
	});
});
