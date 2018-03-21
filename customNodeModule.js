// I this document I am creating a node.js module
exports.customModule = function () {
	var theDate = new Date();
	theDate = 'Todays date: '+theDate;
	return theDate;
}