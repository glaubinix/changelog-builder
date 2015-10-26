var exec = require('child_process').exec,
	ArrayHelper = require('../util/arrayhelper'),
	arrayHelper = new ArrayHelper(),
	config = require('../../config'),
	Builder = require('../builder'),
	util = require('util');

function Svn() {

}

Svn.prototype.getDiffLog = function (fromBranch, toBranch, callback) {
	var builder = new Builder();
	var count = 0;

	this.getMinVersion(fromBranch, toBranch, function (minRevision) {
		this.getLog(fromBranch, minRevision, function (log) {
			builder.setOldLog(log);
			if (count++) {
				callback(builder.getDiff());
			}
		});

		this.getLog(toBranch, minRevision, function (log) {
			builder.setNewLog(log);
			if (count++) {
				callback(builder.getDiff());
			}
		});
	}.bind(this));
};

Svn.prototype.getLog = function (branch, minRevision, callback) {
	this._executeSvnCommand(util.format("log -g -r %s:HEAD %s%s", minRevision, config.vcs.path, branch),  function (err, stdout, stderr) {
		if (err) throw err;

		callback(stdout);
	});
};

Svn.prototype.getMinVersion = function (oldBranch, newBranch, callback) {
	this.getRevisionsForBranch(oldBranch, function (oldRevisions) {
		this.getRevisionsForBranch(newBranch, function (newRevisions) {
			var revisionDiff = arrayHelper.diff(newRevisions, oldRevisions);

			callback(Math.min.apply(null, revisionDiff) - 1);
		});
	}.bind(this));
};

Svn.prototype.getRevisionsForBranch = function (branch, callback) {
	this._executeSvnCommand("propget svn:mergeinfo " + config.vcs.path + branch, function (err, stdout, stderr) {
		if (err) throw err;

		var revisions = [];
		var branchInfos = stdout.split("\n");
		for (var i in branchInfos) {
			if (0 === branchInfos[i].length) continue;
			var branchData = branchInfos[i].split(":");
			var revisionData = branchData[1].split(",");
			for (var j in revisionData) {
				var revisionString = revisionData[j];
				if (revisionString.indexOf('-') === -1) {
					revisions.push(parseInt(revisionString));
				} else {
					var lowerEndRevisions = revisionString.split("-");
					for (var k = parseInt(lowerEndRevisions[0]); k <= lowerEndRevisions[1]; k++) {
						revisions.push(k);
					}
				}
			}

		}

		callback(revisions.sort(function (a, b) {
			return a - b;
		}));
	});
};


Svn.prototype._executeSvnCommand = function(command, callback) {
	var command_string = "svn " + command;

	if (config.vcs.user && config.vcs.password) {
		command_string += util.format(" --username=%s --password=%s", config.vcs.user, config.vcs.password);
	}

	exec(command_string, {maxBuffer: 1024 * 1024 * 100}, callback);
};

module.exports = Svn;
