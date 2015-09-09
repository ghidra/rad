//requires ui
//this module will be for making customizagble panels that you can move around
// I need a way to manage the panels
//then each panel will have logic to move around


//panels, will say where panels are, and how many panels there are.
//as well as be able to divide a panel.

//each panel, will have controls to move it around and resize and swap with another panel

//maybe even have tabbed panels

rad.panels=function(parent){
	//the main partition
	//we need a parent to draw into
	this.p=[
		new rad.panels.partition({
			"id":"main",
			"width":100,
			"height":100,
			"width_label":0,
			"dtype":"%",
			"parent":parent
		})
	];
	var root = document.getElementById(parent);
	root.style.width="100%";
	root.style.height="100%";

	this.margin=2;//the edge margins, for something to grab onto
	this.draw(this.p);//draw the partitions
}
//my recursive draw function
rad.panels.prototype.draw=function(part){
	if(part.length>1){
		for( var n in part ){
			for(var o in part[n].p){
				rad.panels.draw(part[n].p[o]);//recurviely draw all the way down
			}
		}
	}else if(part.length===1){
		part[0].draw();
	}
}
//partition object
rad.panels.partition=function(d){
	rad.ui.prototype.init.call(this,d);

	this.p=[];//the partitions, only 2 [0,1]
	this.parent=d.parent
	
	return this;
}
rad.panels.partition.prototype=new rad.ui();
rad.panels.partition.prototype.constructor=rad.ui;

rad.panels.partition.prototype.draw=function(){
	this.element.style.width=this.width+this.dtype;
	this.element.style.height=this.height+this.dtype;
	this.element.style.position="relative";
	this.element.style.outline="thin solid #000000";

	/*var splitter = document.createElement("DIV");
	splitter.id = this.parent+"_splitter";
	splitter.style.width="10px";
	splitter.style.height="10px";
	splitter.style.float="right";
	splitter.style.outline="thin solid #000000";*/
	
	/*spmove = function(e){
		console.log("moving");
	}
	sprelease=function(e){
		console.log("release");
	}*/
	
	
	this.splitter = new rad.panels.splitter(this.id);
	this.element.appendChild(this.splitter.element);

	document.getElementById(this.parent).appendChild(this.element);
}
//splitter object
rad.panels.splitter=function(d){
	//rad.ui.prototype.init.call(this,d);
	this.parent=d
	this.dragging=false;

	this.element = document.createElement("DIV");
	this.element.id = d+"_splitter";
	this.element.style.width="10px";
	this.element.style.height="10px";
	this.element.style.float="right";
	this.element.style.outline="thin solid #000000";
	var _this = this;
	this.element.onmousedown=function(e){_this.dragsplit(e);};
	this.element.onmouseup =function(e){_this.mouseup(e);};
	this.element.onmousemove = function(e){_this.mousemove(e);};
	
	return this;
}

rad.panels.splitter.prototype.dragsplit=function(e){
	console.log(e.target);//e.srcElement
	this.dragging=true;
}
rad.panels.splitter.prototype.mousemove=function(e){
	if(this.dragging){
		console.log(e.target);//e.srcElement
	}
}
rad.panels.splitter.prototype.mouseup=function(e){
	if(this.dragging){
		this.dragging=false;
		console.log(e.target);//e.srcElement
	}
}