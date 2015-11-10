//requires ui, object
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
	var _this=this;//i have to give this to the object so I can call draw
	this.p=[
		new rad.panels.partition({
			"id":"partition0",
			"width":100,
			"height":100,
			"width_label":0,
			"dtype":"%",
			"parent_id":parent,
			"panel":_this,
			"side":-1,
			"orientation":-1
		})
	];
	this.resizers=[];//hold resizers to place after drawing paritions
	

	this.margin=2;//the edge margins, for something to grab onto
	this.count=0;//count for partition naming
	this.draw();//draw the partitions
}
//this is the function I call to redraw everything
rad.panels.prototype.draw=function(){
	//erase everything first
	//console.log("main panel draw")
	//console.log(this.p[0].parent_id);
	//clear the resizers
	rad.flusharray(this.resizers);

	document.getElementById(this.p[0].parent_id).innerHTML="";
	this.draw_partitions(this.p);

	//now drop in the resizers
	s="";
	for(i=0;i<this.resizers.length;i++){
		s+=this.resizers[i].id+":";
		//we replace the intial value that is a partition with a new resizer
		this.resizers[i] = new rad.panels.resizer(this.resizers[i]);
		var p0 = document.getElementById('partition0');
		p0.appendChild(this.resizers[i].element);
	}
	//console.log(s);
}
//my recursive draw function
rad.panels.prototype.draw_partitions=function(part){
	//if the partition has children then we need to draw them instead
	for(parts in part){
		var children = part[parts].p.length;
		//console.log("children:"+children);
		if(children==0){//if we DO NOT have children, we can draw this one
			part[parts].draw(1);//draw it with the split boxes	
		}else{//if we DO have children, we need to iterate
			part[parts].draw(0);//draw the container, with no splitters
			//since we have maybe this is where we draw the resizer
			this.resizers.push(part[parts].p[0]);
			this.draw_partitions(part[parts].p);		
		}
	}
}
//recursive search function
rad.panels.prototype.match_id=function(id,part){
	//this isnt grabbing it if its the in the second one
	for(parts in part){
		var name = part[parts].id;
		if(name===id){//if we DO NOT have children, we can draw this one
			return part[parts];//draw it with the split boxes	
		}else{//if we DO have children, we need to iterate
			var rtn = this.match_id(id,part[parts].p);
			//this keeps it from returning and erasing a found object
			if (rtn != null)
				return rtn;	
		}
	}
}

///////
//partition object
rad.panels.partition=function(d){
	rad.ui.prototype.init.call(this,d);

	this.p=[];//the partitions, only 2 [0,1]
	this.parent_id=d.parent_id;
	this.panel = d.panel;//give it the main panel object for calling draw
	this.side = d.side;//this is the side,basiaclly, if its the first or second partion under a parent
	this.orientation = d.orientation;//partition type, horizontal=1 or vertical=0

	return this;
}
rad.panels.partition.prototype=new rad.ui();
rad.panels.partition.prototype.constructor=rad.ui;

rad.panels.partition.prototype.draw=function(draw_splitters){
	//console.log("we are drawing");
	this.element.innerHTML="";//clean it out
	this.element.style.width=this.width+this.dtype;
	this.element.style.height=this.height+this.dtype;
	this.element.style.position="relative";
	this.element.style.outline="thin solid #000000";
	this.element.style.display="inline-block";
	
	var _this = this;

	//make splitters, to split partitions
	if(draw_splitters){
		
		//console.log(this);
		this.splitter_v = new rad.panels.splitter(_this,1);
		this.element.appendChild(this.splitter_v.element);

		this.splitter_h = new rad.panels.splitter(_this,0);
		this.element.appendChild(this.splitter_h.element);
	}

	document.getElementById(this.parent_id).appendChild(this.element);
}
rad.panels.partition.prototype.getparent=function(){
	return this.panel.match_id(this.parent_id,this.panel.p);
}

//-------------------resizer
rad.panels.resizer=function(part){
	var pos = part.element.getBoundingClientRect();
	var part_width = part.element.offsetWidth;
	var part_height = part.element.offsetHeight;
	var part_pos = rad.domposition(part.element);
	var clamp;
	var lock=0;

	//console.log(part.p[0].id)
	//console.log("width:"+part_width+" x:"+part_pos.x+" y:"+part_pos.y);

	this.element = document.createElement("DIV");
	this.element.id = part.id+"_resizer";
	this.element.style.position="absolute";
	this.element.style.outline="thin solid #000000";

	//we store the parent element, since this is where we are going to be pulling any data from
	this.parent = part.getparent();
	this.parent_dimensions = this.parent.element.getBoundingClientRect();
	
	if(part.orientation==1){
		this.element.style.width="10px";
		this.element.style.height="20px";
		this.element.style.left=pos.right-12+"px";
		this.element.style.top=(pos.top+(pos.bottom-pos.top)/2)-10+"px";
		clamp=new rad.vector2(this.parent_dimensions.left+20,this.parent_dimensions.right-20);
	}else{
		this.element.style.width="20px";
		this.element.style.height="10px";
		this.element.style.left=(pos.left+((pos.right-pos.left)/2))-10+"px";
		this.element.style.top=pos.bottom-12+"px";
		clamp=new rad.vector2(this.parent_dimensions.top+20,this.parent_dimensions.bottom-20);
		lock=1;
	}
	var _this=this;
	var dragging=function(e){/*console.log(part.id)*/};
	var release=function(e){_this.changesize(part)};
	this.element.onmousedown=function(e){rad.drag.draggable(e,part.id+"_resizer",dragging,release,clamp,lock);};
	//var header = new tentacle.element('div',{'class':'aBar','onmousedown':'tentacle.floating_window.drag(event,\''+id+'\')' });
	//this.element.style.left=pos.left+"px";
	//this.element.style.top=pos.top+"px";
	//console.log(part.orientation);

}
rad.panels.resizer.prototype.changesize=function(part){
	//part.getparent()
	console.log('do the size change')
}
//splitter object
//private should never be called from outside this class itself
rad.panels.splitter=function(part,dir){
	//rad.ui.prototype.init.call(this,d);
	this.parent_partition=part
	this.dragging=false;

	this.element = document.createElement("DIV");
	this.element.id = part.id+"_splitter";
	this.element.style.width="10px";
	this.element.style.height="10px";
	this.element.style.float="right";
	this.element.style.outline="thin solid #000000";
	this.element.style.margin="2px 2px 0px 1px";
	var _this=this;
	this.element.onclick=function(e){_this.split(dir)};

	//the icon to split this thing
	var inside = document.createElement("DIV");
	inside.id = (dir===0)?part.id+"v_splitter":part.id+"h_splitter";
	inside.style.width=(dir===0)?"10px":"0px";
	inside.style.height=(dir===0)?"0px":"10.px";
	inside.style.position="relative";
	if(dir===0){
		inside.style.top="5px";
	}else{
		inside.style.left="5px";
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
rad.panels.splitter.prototype.split=function(dir){
	//var part = rad.panels.find(this.parent);
	//console.log(this.parent+":"+dir);
	//console.log(this.parent);
	//console.log(this.parent_partition.id);
	var width = (dir)?50:100;
	var height = (dir)?100:50;
	//console.log(this);
	this.parent_partition.p[0]=
		new rad.panels.partition({
			"id":"partition"+(this.parent_partition.panel.count+1),
			"width":width,
			"height":height,
			"width_label":0,
			"dtype":"%",
			"parent_id":this.parent_partition.id,
			"panel":this.parent_partition.panel,
			"side":0,
			"orientation":dir
		});
	this.parent_partition.p[1]=
		new rad.panels.partition({
			"id":"partition"+(this.parent_partition.panel.count+2),
			"width":width,
			"height":height,
			"width_label":0,
			"dtype":"%",
			"parent_id":this.parent_partition.id,
			"panel":this.parent_partition.panel,
			"side":1,
			"orientation":dir
		});
	//console.log(this.parent_partition.id);
	this.parent_partition.panel.count+=2;
	this.parent_partition.panel.draw();//call the main draw function
}

/*rad.panels.splitter.prototype.dragsplit=function(e){
	//console.log(e.target);//e.srcElement
	this.dragging=true;
}
rad.panels.splitter.prototype.mousemove=function(e){
	if(this.dragging){
		//console.log(e.target);//e.srcElement
	}
}
rad.panels.splitter.prototype.mouseup=function(e){
	if(this.dragging){
		this.dragging=false;
		//console.log(e.target);//e.srcElement
	}
}*/