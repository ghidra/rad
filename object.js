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