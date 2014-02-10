var test = require('tape'),
	GitLog = require('../../lib/parser/gitlog'),
	gitLog = new GitLog();


test('one simple commit', function (t) {
	t.plan(1);

	var log = "commit d6b1064f0031ac577096f8b9940261912d89b8ff\nAuthor: Stephan Vock <stephan.vock@gmail.com>\nDate:   Wed Oct 16 00:17:38 2013 +0200\n\niml file not necessary";

	var actual = gitLog.parse(log);

	var expected = {};
	expected['d6b1064f0031ac577096f8b9940261912d89b8ff'] = 'iml file not necessary';

	t.deepEqual(actual, expected);
});

test('multiple simple commits', function (t) {
	t.plan(1);

	var log = "commit 540194de5436675a6bfc71f0b1e033f2f32d0be8\nAuthor: Stephan Vock <stephan.vock@gmail.com>\nDate:   Wed Oct 16 01:03:17 2013 +0200\n\nparsing single commits in git\n\ncommit d6b1064f0031ac577096f8b9940261912d89b8ff\nAuthor: Stephan Vock <stephan.vock@gmail.com>\nDate:   Wed Oct 16 00:17:38 2013 +0200\n\niml file not necessary\n\ncommit 25bf459c9248ec5fb7d3c8638fcc4ea76f4e19ad\nAuthor: Stephan Vock <stephan.vock@gmail.com>\nDate:   Wed Oct 16 00:15:58 2013 +0200\n\nadded LICENCE file";
	var actual = gitLog.parse(log);

	var expected = {};
	expected['540194de5436675a6bfc71f0b1e033f2f32d0be8'] = 'parsing single commits in git';
	expected['d6b1064f0031ac577096f8b9940261912d89b8ff'] = 'iml file not necessary';
	expected['25bf459c9248ec5fb7d3c8638fcc4ea76f4e19ad'] = 'added LICENCE file';

	t.deepEqual(actual, expected);

});
