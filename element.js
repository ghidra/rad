//requires object, dom
rad.element=function(type,data,inner){
	return this.init(type,data,inner);
}
rad.element.prototype.init=function(type,data,inner){
	this.style = {};
	this.element = document.createElement(type);
	this.setdata(data);
}
rad.element.prototype.appendstyle=function(d){
	if(d!=undefined){
		for(var style_attribute in d){
			this.style[style_attribute] = d[style_attribute];
		}
	}
}
rad.element.prototype.setstyle=function(d){
	for(var style_attribute in d){
		console.log(style_attribute)
		if(d[style_attribute]!="none" && d[style_attribute]!=0 && d[style_attribute]!="0" ){
			this.element.style[style_attribute] = d[style_attribute];
		}
	}
}
rad.element.prototype.setdata=function(d){
	for(var attr in d){
		if(attr!="style"){
			this.element[attr]=d[attr];
		}else{
			this.style=rad.objclonefast(d.style);
			console.log(d.style);
			this.setstyle(d.style);
		}
	}
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