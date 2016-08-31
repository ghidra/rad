rad.flusharray=function(a){
	while(a.length>0){
        a.pop();
    }
}
//http://stackoverflow.com/questions/5767325/how-to-remove-a-particular-element-from-an-array-in-javascript
rad.removefromarray=function(a,elem){
	var i = a.indexOf(elem);
	if (i > -1) {
    	a.splice(i, 1);
	}
}