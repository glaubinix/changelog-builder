var test = require('tape'),
	CommitLength = require('../../lib/processor/commitlength'),
	commitlength = new CommitLength();


test('process commit full length', function (t) {
	t.plan(1);

	var config = {
		'commit_length': 'full'
	};

	var diff = {
		1: 'pint\npong',
		2: '*knock knock*'
	};

	var actual = commitlength.process(config, diff);

	var expected = {
		1: 'pint\npong',
		2: '*knock knock*'
	};

	t.deepEqual(actual, expected);
});

test('process commit single line length', function (t) {
	t.plan(1);

	var config = {
		'commit_length': 'single'
	};

	var diff = {
		1: 'pint\npong',
		2: '*knock knock*'
	};

	var actual = commitlength.process(config, diff);

	var expected = {
		1: 'pint',
		2: '*knock knock*'
	};

	t.deepEqual(actual, expected);
});
