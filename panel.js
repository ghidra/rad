//requires element
rad.panel=function(){
	
	rad.element.call("div",{},"");

	var _this=this;//i have to give this to the object so I can call draw

	this.width="100%";
	this.height="100%";

	this.contents=[
	
	];

	return this;
}
