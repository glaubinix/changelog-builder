var test = require('tape'),
	CommitIgnore = require('../../lib/processor/commitignore'),
	commitIgnore = new CommitIgnore();


test('process', function (t) {
	t.plan(1);

	var config = {
		'ignore_comments': [
			"<<<<"
		]
	};

	var diff = {
		1: '<<<< merge >>>>',
		2: 'commit'
	};

	var actual = commitIgnore.process(config, diff);

	var expected = {
		2: 'commit'
	};

	t.deepEqual(actual, expected);
});
