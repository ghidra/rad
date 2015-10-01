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
	

	this.margin=2;//the edge margins, for something to grab onto
	this.count=0;//count for partition naming
	this.draw();//draw the partitions
}
//this is the function I call to redraw everything
rad.panels.prototype.draw=function(){
	//erase everything first
	//console.log("main panel draw")
	//console.log(this.p[0].parent_id);
	document.getElementById(this.p[0].parent_id).innerHTML="";
	this.draw_partitions(this.p);
}
//my recursive draw function
rad.panels.prototype.draw_partitions=function(part){
	//if the partition has children then we need to draw them instead
	for(parts in part){
		var children = part[parts].p.length;
		//console.log("children:"+children);
		if(children==0){//if we DO NOT have children, we can draw this one
			part[parts].draw(1);//draw it with the split boxes

			/*var resizer_elem = new rad.panels.resizer(part[parts]);
			var p0 = document.getElementById('partition0');
			p0.appendChild(resizer_elem.element);*/
			
		}else{//if we DO have children, we need to iterate
			
			//console.log("we have children")
			//i also need to draw a dividing drag slider in the middle
			part[parts].draw(0);//draw the container, with no splitters
			//since we have maybe this is where we draw the resizer
			var resizer_elem = new rad.panels.resizer(part[parts]);
			var p0 = document.getElementById('partition0');
			p0.appendChild(resizer_elem.element);

			this.draw_partitions(part[parts].p);
			
		}
	}
}
/*
rad.panels.prototype.find=function(id){
	return this.find_partition(this.p,id);
}
rad.panels.prototype.find_partition=function(part,id){
	//use id to to return the partition that we are going to operate on
	for( var n in part ){
		for(var o in part[n].p){
			var pid = part[n].p[o].id
			if(pid===id){
				return part[n].p[o];
			}else{
				rad.panels.find_partition(part[n].p[o],id);//recurviely draw all the way down
			}
		}
	}
}
*/
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

	//make the divider
	/*if(this.side==0 && draw_splitters){
	//if(draw_splitters){
		//get the width of this layer, then get the width of the next layer to determine where to place this to begin with
		//var part_width = this.element.offsetWidth;
		//var part_pos = rad.domposition(this.element);
		//console.log(part.p[0].id)
		//console.log("width:"+part_width+" x:"+part_pos.x+" y:"+part_pos.y);
		//lets just put a div here to see what I get
		this.resizer_elem = new rad.panels.resizer(_this);
		var p0 = document.getElementById('partition0');
		//this.element.appendChild(this.resizer_elem.element);
		p0.appendChild(this.resizer_elem.element);
		//console.log(document.getElementById(part[0].id).offsetWidth);
	}*/
}
rad.panels.resizer=function(part){
	var pos = part.element.getBoundingClientRect();
	var part_width = part.element.offsetWidth;
	var part_height = part.element.offsetHeight;
	var part_pos = rad.domposition(part.element);
	//console.log(part.p[0].id)
	//console.log("width:"+part_width+" x:"+part_pos.x+" y:"+part_pos.y);

	this.element = document.createElement("DIV");
	this.element.id = part.id+"_resizer";
	this.element.style.position="absolute";
	this.element.style.outline="thin solid #000000";
	if(part.orientation==1){
		this.element.style.width="10px";
		this.element.style.height="20px";
		//this.element.style.left=pos.left-5+"px";
		//this.element.style.top=((pos.bottom-pos.top)/2)-10+"px";
	}else{
		this.element.style.width="20px";
		this.element.style.height="10px";
		//this.element.style.left=(pos.left+((pos.right-pos.left)/2))-10+"px";
		//this.element.style.top=pos.top-5+"px";
	}
	this.element.style.left=pos.left+"px";
	this.element.style.top=pos.top+"px";
	//console.log(part.orientation);

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