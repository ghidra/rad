//requires object, dom
rad.element=function(type,data,inner){
	return this.init(type,data,inner);
}
rad.element.prototype.init=function(type,data,inner){
	this.style = {};
	this.element = document.createElement(type);
	this.setdata(data);
	//maybe I can check if this is a DOM element, and appendChild it instead
	this.element.innerHTML=(inner!=undefined)?inner:"";
}
rad.element.prototype.appendstyle=function(d){
	if(d!=undefined){
		for(var style_attribute in d){
			this.style[style_attribute] = d[style_attribute];
		}
	}
}
rad.element.prototype.setstyle=function(){
	//this has to be called from maker of this class. So it can do all the stuff it needs to first for styles and other data
	for(var style_attribute in this.style){
		//console.log(style_attribute)
		if(this.style[style_attribute]!="none" && this.style[style_attribute]!=0 && this.style[style_attribute]!="0" ){
			this.element.style[style_attribute] = this.style[style_attribute];
		}
		if(style_attribute=="display") this.element.style[style_attribute] = this.style[style_attribute];//if this is display saying none, then set it none
	}
}
rad.element.prototype.setdata=function(d){
	for(var attr in d){
		if(attr!="style"){
			this.element[attr]=d[attr];
		}else{
			this.style=rad.objclonefast(d.style);
			//console.log(d.style);
			//this.setstyle(d.style);
		}
	}
}
rad.element.prototype.remove=function(){
	return this.element.parentElement.removeChild(this.element);
}
//---getters
rad.element.prototype.get_element=function(){
	return this.element;
}
rad.element.prototype.get_id=function(){
	return this.element.id;
}
rad.element.prototype.get_domsize=function(){
	return rad.domsize(this.element);
}
rad.element.prototype.get_dimensions=function(){
	var w = this.element.style.width;
	var h = this.element.style.height;
	return rad.vector2(w,h);
}
rad.element.prototype.get_class=function(){
	return this.element.class;
}

// rad.element.empty=function(elem){
// 	while (elem.hasChildNodes()) {
// 	    elem.removeChild(elem.lastChild);
// 	}
// }