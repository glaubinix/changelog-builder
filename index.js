var config = require('./config'),
	Vcs = require('./lib/vcs/' + config.vcs.type),
	Builder = require('./lib/builder'),
	Epic = require('./lib/epics/' + config.epic_type + 'epic'),
	Printer = require('./lib/printer/terminalprinter'),
	CommitIgnore = require('./lib/processor/commitignore'),
	UniqueIssues = require('./lib/processor/uniqueissues'),
	CommitLength = require('./lib/processor/commitlength');

if (process.argv.length < 4) return console.error('Missing argument: Usage node index.js old_branch new_branch')

var oldBranch = process.argv[2];
var newBranch = process.argv[3];


var vcs = new Vcs(),
	builder = new Builder(),
	printer = new Printer(),
	epic = new Epic();
	commitIgnore = new CommitIgnore(),
	uniqueIssues = new UniqueIssues(),
	commitLength = new CommitLength();

var count = 0;

vcs.getMinVersion(oldBranch, newBranch, function(minRevision) {
	vcs.getLog(oldBranch, minRevision, function(log) {
		builder.setOldLog(log);
		if (count == 0) count++;
		else diff();
	});

	vcs.getLog(newBranch, minRevision, function(log) {
		builder.setNewLog(log);
		if (count == 0) count++;
		else diff();
	});
});

function diff() {
	var logDiff = builder.getDiff();
	logDiff = commitIgnore.process(logDiff);
	logDiff = commitLength.process(logDiff);
	logDiff = uniqueIssues.process(logDiff);
	logDiff = epic.parse(logDiff);

	printer.printChangeLog(logDiff);
}

/*


epic_type_factory = EpicTypeFactory()
epic_type = epic_type_factory.get_epic_type(config['epic_type'])

grouped_diff = epic_type.parse(config, diff)

printer = TermainalPrinter()
printer.print_change_log(grouped_diff)*/
