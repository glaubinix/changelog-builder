var test = require('tape'),
	ArrayHelper = require('../../lib/util/arrayhelper'),
	arrayHelper = new ArrayHelper();


test('ArrayHelper::diff empty arrays', function (t) {
	t.plan(1);

	var actual = arrayHelper.diff([], []);

	t.deepEqual(actual, []);
});

test('ArrayHelper::diff against empty array', function (t) {
	t.plan(1);

	var actual = arrayHelper.diff([1, 2, 3], []);

	t.deepEqual(actual, [1, 2, 3]);
});

test('ArrayHelper::diff with empty array', function (t) {
	t.plan(1);

	var actual = arrayHelper.diff([], [1, 2, 3]);

	t.deepEqual(actual, []);
});


test('ArrayHelper::diff', function (t) {
	t.plan(1);

	var actual = arrayHelper.diff([1, 2, 3, 4], [1, 3]);

	t.deepEqual(actual, [2, 4]);
});
