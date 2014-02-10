function ArrayHelper() {

}

ArrayHelper.prototype.diff = function (a, b) {
	return a.filter(function (i) {return (-1 !== b.indexOf(i)); });
};

module.exports = ArrayHelper;
