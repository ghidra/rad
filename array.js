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
rad.indexstringtoarray=function(str){
	//takes a string of 0-10,12,15,20-22 and makes an array
	var a = [];
	var sections = str.split(",");
	for(var s = 0; s<sections.length; s++){
		var dashSections = sections[s].split('-');
		if(dashSections.length>1){
			var start=parseInt(dashSections[0]);
			var end=parseInt(dashSections[1]);
			for(var step=start; step<=end;step++){
				a.push(step);	
			}
		}else{
			var v=parseInt(sections[s]);
			a.push(v);
		}
	}
	return a;
}
rad.cleararraypastindex=function(array,index){
	if (index >= array.length || index < 0) {
		console.log("cleararraypastindex, index out of bounds")
		return array;
	}
	array.splice(index);
	return array;
}
rad.pushunique=function(arr,item){
	if(arr.indexOf(item) === -1) {
    	arr.push(item);
	}
}