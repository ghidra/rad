rad.totype=function(obj){
  //http://stackoverflow.com/questions/7390426/better-way-to-get-type-of-a-javascript-variable
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}
rad.parseint=function(str){
	return parseInt(str.replace(/[^0-9\.]/g, ''), 10);
}
rad.strremovenumbers=function(str){
	return str.replace(/[0-9]/g, '');
}