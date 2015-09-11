//requires ui
//this module will be for making customizagble panels that you can move around
// I need a way to manage the panels
//then each panel will have logic to move around


//panels, will say where panels are, and how many panels there are.
//as well as be able to divide a panel.

//each panel, will have controls to move it around and resize and swap with another panel

//maybe even have tabbed panels

rad.panels=function(parent){
	//the root, will not change size or partition
	var root = document.getElementById(parent);
	root.style.width="100%";
	root.style.height="100%";
	//the main partition
	//there is only one to start, A.
	this.p=[
		new rad.panels.partition({
			"id":"partition0",
			"width":100,
			"height":100,
			"width_label":0,
			"dtype":"%",
			"parent":"NONE"
		})
	];
	

	this.margin=2;//the edge margins, for something to grab onto
	this.draw();//draw the partitions
}
//this is the function I call to redraw everything
rad.panels.prototype.draw=function(){
	this.draw_partitions(this.p);
}
//my recursive draw function
rad.panels.prototype.draw_partitions=function(part){
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
	this.p_type=0; //partition type, horizontal=1 or vertical=0
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
	
	//make splitters, to split partitions
	this.splitter_v = new rad.panels.splitter(this.id,0);
	this.element.appendChild(this.splitter_v.element);

	this.splitter_h = new rad.panels.splitter(this.id,1);
	this.element.appendChild(this.splitter_h.element);

	document.getElementById(this.parent).appendChild(this.element);
}
//splitter object
//private should never be called from outside this class itself
rad.panels.splitter=function(i,dir){
	//rad.ui.prototype.init.call(this,d);
	this.parent=i
	this.dragging=false;

	this.element = document.createElement("DIV");
	this.element.id = i+"_splitter";
	this.element.style.width="10px";
	this.element.style.height="10px";
	this.element.style.float="right";
	this.element.style.outline="thin solid #000000";
	this.element.style.margin="2px 2px 0px 1px";

	//the icon to split this thing
	var inside = document.createElement("DIV");
	inside.id = (dir===0)?i+"v_splitter":i+"h_splitter";
	inside.style.width=(dir===0)?"0px":"10px";
	inside.style.height=(dir===0)?"10px":"0.px";
	inside.style.position="relative";
	if(dir===0){
		inside.style.left="5px";
	}else{
		inside.style.top="5px";
	}
	//inside.style.float="right";
	inside.style.outline="thin solid #000000";

	this.element.appendChild(inside);
	//var _this = this;
	//this.element.onmousedown=function(e){_this.dragsplit(e);};
	//this.element.onmouseup =function(e){_this.mouseup(e);};
	//this.element.onmousemove = function(e){_this.mousemove(e);};
	
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