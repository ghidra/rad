//requires element
rad.panel=function(parent){
	///parent is a string, or maybe its a element? maybe, for now its a string
	//rad.element.prototype.init.call();
	rad.element.call(this,"div",{},"");

	var _this=this;//i have to give this to the object so I can call draw

	this.parent_id = parent;
	this.width="100%";
	this.height="100%";

	this.contents=[
	
	];

	var root = document.getElementById(parent);
	rad.emptyelement(root);
	root.appendChild(this.element);

	return this;
}

rad.panel.prototype=new rad.element();
rad.panel.prototype.constructor=rad.element;