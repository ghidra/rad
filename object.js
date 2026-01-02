rad.isobject=function (arg) {
  return Object.prototype.toString.call(arg) === '[object Object]';
}
rad.objisempty=function(obj){
  for(var key in obj) {
      //if (obj.hasOwnProperty(key)) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
         return false;
      }
   }
   return true;
}
rad.objhasprop=function(o,prop){
	//for(var prop in o) {
    		if (Object.prototype.hasOwnProperty.call(o, prop)) {
      			return true;
    		}
  	//}
  	return false;
}
rad.objfindprop=function(o,prop){
  return Object.prototype.hasOwnProperty.call(o, prop);
}
rad.objhasfunction=function(o,func){
  return typeof o[func]==="function";
}
rad.objlength=function(o){
  //return the number of unique properties
  var count = 0;
  for (var prop in o){
    if( Object.prototype.hasOwnProperty.call(o, prop) ){
      count+=1;
    }
  }
  return count;
}
rad.objclonefast=function(o){
  //http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-an-object
  //dones not clone functions.. this is just for simple data cases
  return JSON.parse(JSON.stringify(o));
}
rad.objclear=function(o){
  for (var member in o) delete o[member];
}
///check if its a dom element
//http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
rad.isdomnode=function(o){
  return (
    typeof Node === "object" ? o instanceof Node : 
    o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
  );
}

//Returns true if it is a DOM element    
rad.isdomelement=function(o){
  return (
    typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
    o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
);
}