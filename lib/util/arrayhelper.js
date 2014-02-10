function ArrayHelper() {

}

ArrayHelper.prototype.diff = function(a, b) {
	return a.filter(function(i) {return !(b.indexOf(i) > -1);});
}

module.exports = ArrayHelper;
