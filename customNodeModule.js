// I this document I am creating a node.js module
module.exports.customModule = function () { // For some reason this prints only as text...
	var theDate = new Date();
	theDate = 'Todays date: '+theDate;
	return theDate;
}