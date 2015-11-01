var test = require('tape'),
	UniqueMessages = require('../../lib/processor/uniquemessages'),
	uniquemessages = new UniqueMessages();


test('uniquemessages process', function (t) {
	t.plan(1);

	var diff = {
		1: 'updated something without issue',
		2: 'did something else',
		3: 'updated something without issue',
		4: 'fixed #123',
		5: 'updated something without issue'
	};

	var actual = uniquemessages.process(diff);

	var expected = {
		1: 'updated something without issue',
		2: 'did something else',
		4: 'fixed #123'
	};

	t.deepEqual(actual, expected);
});