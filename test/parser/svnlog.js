var test = require('tape'),
	SvnLog = require('../../lib/parser/svnlog'),
	svnLog = new SvnLog();


test('one simple commit', function (t) {
	t.plan(1);

	var log = "------------------------------------------------------------------------\nr1 | stephan.vock | 2013-10-15 18:08:25 +0200 (Di, 15 Okt 2013) | 1 line\n\nadded LICENCE file\n------------------------------------------------------------------------";

	var actual = svnLog.parse(log);

	var expected = {};
	expected['1'] = 'added LICENCE file\n';

	t.deepEqual(actual, expected);
});

test('multiple commits', function (t) {
	t.plan(1);

	var log = "------------------------------------------------------------------------\nr2 | stephan.vock | 2013-10-15 18:13:02 +0200 (Di, 15 Okt 2013) | 3 lines\n\nparsing single commits in git\n------------------------------------------------------------------------\nr1 | stephan.vock | 2013-10-15 18:08:25 +0200 (Di, 15 Okt 2013) | 1 line\n\nadded LICENCE file\n------------------------------------------------------------------------";
	var actual = svnLog.parse(log);

	var expected = {};
	expected['1'] = 'added LICENCE file\n';
	expected['2'] = 'parsing single commits in git\n';

	t.deepEqual(actual, expected);

});
