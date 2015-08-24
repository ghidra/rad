rad.objisempty=function(obj){
  for(var key in obj) {
      //if (obj.hasOwnProperty(key)) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
         return false;
      }
   }
   return true;
}
rad.objhasprop=function(o){
	for(var prop in o) {
    		if (Object.prototype.hasOwnProperty.call(o, prop)) {
      			return true;
    		}
  	}
  	return false;
}
rad.totype=function(obj){
  //http://stackoverflow.com/questions/7390426/better-way-to-get-type-of-a-javascript-variable
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}