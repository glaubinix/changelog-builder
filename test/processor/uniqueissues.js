var test = require('tape'),
	UniqueIssues = require('../../lib/processor/uniqueissues'),
	uniqueissues = new UniqueIssues();


test('uniqueissues process', function (t) {
	t.plan(1);

	var config = {
		'unique_issues': true,
		'issue_format': '#[0-9]+'
	};

	var diff = {
		1: 'fix something without issue reference',
		2: 'fix #1',
		3: 'another fix #1',
		4: 'fix #2'
	};

	var actual = uniqueissues.process(config, diff);

	var expected = {
		1: 'fix something without issue reference',
		3: 'another fix #1',
		4: 'fix #2'
	};

	t.deepEqual(actual, expected);
});

test('uniqueissues process feature disabled', function (t) {
	t.plan(1);

	var config = {
		'issue_format': '#[0-9]+'
	};

	var diff = {
		1: 'fix something without issue reference',
		2: 'fix #1',
		3: 'another fix #1',
		4: 'fix #2'
	};

	var actual = uniqueissues.process(config, diff);

	var expected = {
		1: 'fix something without issue reference',
		2: 'fix #1',
		3: 'another fix #1',
		4: 'fix #2'
	};

	t.deepEqual(actual, expected);
});
