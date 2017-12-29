/// layout is the overall top level element, that can hold information relevant to the underlying bsp
/////////////////////////////////////////////////////////////////////////////////////////////////

rad.layout=function(container, setup, style, splitters, resizers){
	this.count=0;
	this.container=container;
	this.style = style || {outline:"thin solid #000000"};
	this.show_splitter = splitters || false;
	this.show_resizer = resizers || false;

	var _this = this;

	if(setup != undefined){
		////use setup, no need to start from scratch
	}else{
		///start a default empty set up
		this.root = new rad.layout.partition(_this,container);
	}

	return this;
}

/////////////////////////////////////////////////////////////////////////////////////////////////

////A PANEL IS THE MAIN ELEMENT IN THIS BSP STYLE LAYOUT
rad.layout.partition=function(manager,container,split){
	//make an empty element for now
	rad.element.call(this,"div",{},"");

	this.manager = manager;
	this.container_id = container;
	this.split = split||-1; /// -1 is not split, a whole panel, 0 is horizontal, 1 is vertical
	this.panels=[];

	//determine deimension based on split
	this.percentage = 100;
	this.width=100;
	this.height=100;
	if(split==0){
		this.percentage=50;
		this.height=50;
	}
	if(split==1){
		this.percentage=50;
		this.width=50;
	}

	///styles
	this.appendstyle(manager.style);
	this.appendstyle({
		width:this.width+"%",
		height:this.height+"%",
	});
	this.setstyle();

	////put it in the document
	var parent_element = document.getElementById(container);
	rad.emptyelement(parent_element);
	parent_element.appendChild(this.element);

	return this;
}
rad.layout.partition.prototype=new rad.element();
rad.layout.partition.prototype.constructor=rad.element;

/////////////////////////////////////////////////////////////////////////////////////////////////

// I need a resizer

/////////////////////////////////////////////////////////////////////////////////////////////////

// I need a spliter

/////////////////////////////////////////////////////////////////////////////////////////////////