rad.object_is_empty=function(obj){
  for(var key in obj) {
      if (obj.hasOwnProperty(key)) {
         return false;
      }
   }
   return true;
}
rad.closure=function(scope,fn,arg){//bind my function with the proper this statment
	return function(e){
		fn.call(scope,e,arg);
	}
}