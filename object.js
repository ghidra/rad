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
rad.objclonefast=function(o){
  //http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-an-object
  //dones not clone functions.. this is just for simple data cases
  return JSON.parse(JSON.stringify(o));
}