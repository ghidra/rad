//requires object, dom, element
//this module will be for making customizagble panels that you can move around

rad.panels=function(parent,layout,callback){
	//layout is optional, it will build a default layout
	//the root, will not change size or partition
	var root = document.getElementById(parent);
	root.style.width="100%";
	root.style.height="100%";

	this.layout=layout;
	//the main partition
	//there is only one to start, A.
	var _this=this;//i have to give this to the object so I can call draw
	this.p=[
		new rad.panels.partition({
			"element":{
				"id":"partition_0",
				"style":{
					"width":"100%",
					"height":"100%",
					"clear":"none",
					"fontSize":0
				}
			},
			//"width":100,
			//"height":100,
			"width_label":0,
			"dtype":"%",
			"parent_id":parent,
			"panel":_this,
			"side":-1,
			"orientation":-1
		})
	];
	var elem = this.p[0];
	//if(OVERRIDE.style!=undefined){
		//styles can now be passed in per partition element
		//elem.appendstyle(  OVERRIDE.style );
	//}
	elem.setstyle();

	if(layout){
		this.layout_assign(layout);
	}

	this.resizers=[];//hold resizers to place after drawing paritions
	
	this.margin=2;//the edge margins, for something to grab onto
	this.count=0;//count for partition naming

	//callback on resize
	this.resize = rad.windowdoneresizing(rad.closure(_this,_this.windowresized));
	this.resizecallback = callback;
	//rad.addevent(window,'resize',function(e){console.log('yeah')});

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
		//console.log(this.resizers[i].parent.useresizers);
		if(this.resizers[i].parent.useresizers>0){
			var p0 = document.getElementById('partition_0');
			p0.appendChild(this.resizers[i].element);
		}
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
//deal with the passed in layout
rad.panels.prototype.layout_split=function(name,part,parent){
	//var orientation,size;
	parent=(parent)?parent:'0';
	var parentpart = this.match_id("partition_"+parent,this.p);
	var orientation=(part.split)?part.split:0;
	var size=(part.size)?part.size:50;
	size=(parentpart.p.length>0)?100-size:size;
	var usesplitters = (part.splitters)?part.splitters:0;
	var useresizers = (part.resizers)?part.resizers:0;
	var parttype = (part.type)?part.type:"%";
	
	//console.log(orientation)
	
	var width = (orientation)?size:100;
	var height = (orientation)?100:size;

	var this_=this;

	//console.log(parentpart.split)
	//console.log(orientation);
	
	//console.log(name);
	//console.log(part);
	//console.log("PARENTPART");
	//console.log(parentpart.p);
	
	parentpart.p[parentpart.p.length]=
		new rad.panels.partition({
			//"id":"partition_"+name,
			"element":{
				"id":"partition_"+name,
				"style":{
					"width":width+parttype,
					"height":height+parttype,
					"clear":"none",
					"fontSize":0,
				}
			},
			"width":width,
			"height":height,
			"width_label":0,
			"dtype":parttype,
			"parent_id":'partition_'+parent,
			"panel":this_,
			"side":parentpart.p.length-1,
			"orientation":orientation,
			"usesplitters":usesplitters,
			"useresizers":useresizers
		});

	var elem = parentpart.p[parentpart.p.length-1];
	if(part.partitions[name].style!=undefined){
		//styles can now be passed in per partition element
		elem.appendstyle(  part.partitions[name].style );
	}
	elem.setstyle();
}
rad.panels.prototype.layout_assign=function(obj,parent){
	//console.log(obj);
	//if parent is undefined, we are at the head partition, and we can set the values specific to that
	if(parent==undefined){
		this.p[0].useresizers=(obj.useresizers!=undefined)?obj.useresizers:0;
	}
	if(obj.partitions){
		//if we have partitions
		for( p in obj.partitions ){
			//make the split
			//console.log(p);//the name of the partition
			//this.layout_split(p,obj.partitions[p],parent);
			this.layout_split(p,obj,parent);
			//see if we have children partitions
			if(obj.partitions[p].partitions){
				//console.log(p)
				this.layout_assign(obj.partitions[p],p);
				//console.log(this);
				
			}
		}
	}
	/*var count = 0;
	for( p in obj.partitions ){
		var size = (count==0)?obj.size:100-obj.size;
		//console.log(obj.partitions)
		count+=1;
	}*/
}
rad.panels.prototype.get_panel=function(id){
	return document.getElementById("partition_"+id);
}
///this is kind of a private function that is only called when the user resizes the window
rad.panels.prototype.windowresized=function(){
	//i need to copy all the data that might be in the partitions, and put them back
	//because when I call the draw function, it basically erases everything that is in there
	//this.draw();
	if(this.resizecallback != undefined){
		this.resizecallback();
	}
}
///////
//partition object
rad.panels.partition=function(d){
	rad.element.prototype.init.call(this,"DIV",d.element);

	this.id = d.element.id;
	//this.width = d.element.style.width;
	//this.height = d.element.style.height;

	//this.dtype=d.dtype;

	this.p=[];//the partitions, only 2 [0,1]
	this.parent_id=d.parent_id;
	this.panel = d.panel;//give it the main panel object for calling draw
	this.side = d.side;//this is the side,basiaclly, if its the first or second partion under a parent
	this.orientation = d.orientation;//partition type, horizontal=1 or vertical=0
	this.usesplitters = (d.usesplitters!=undefined)?d.usesplitters:1;
	this.useresizers = (d.useresizers!=undefined)?d.useresizers:1;

	return this;
}
rad.panels.partition.prototype=new rad.element();
rad.panels.partition.prototype.constructor=rad.element;

rad.panels.partition.prototype.draw=function(draw_splitters){
	//console.log("we are drawing");
	this.element.innerHTML="";//clean it out
	
	//this.element.style.width=this.width+this.dtype;
	//this.element.style.height=this.height+this.dtype;
	//this.element.style.width=this.width+this.dtype;
	//this.element.style.height=this.height+this.dtype;
	//this.element.style.position="relative";
	this.element.style.outline="thin solid #000000";
	this.element.style.display="inline-block";
	this.element.style.float="left";
	this.element.id=this.id;
	
	var _this = this;

	//make splitters, to split partitions

	if(draw_splitters && this.usesplitters==1){
		
		//console.log(this);
		this.splitter_v = new rad.panels.splitter(_this,1);
		this.element.appendChild(this.splitter_v.element);

		this.splitter_h = new rad.panels.splitter(_this,0);
		this.element.appendChild(this.splitter_h.element);
	}
	//console.log(this.parent_id)
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
	var clamp;//vector to hold values of clamping
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
	this.orientation = part.orientation;//store the orientation of the division
	
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
	//console.log('do the size change');
	//get the parent partitions elements

	//console.log(this.parent.p[0].element);
	var all,pos,percentage;
	if(this.orientation==0){
		//var h_yoff = this.parent_dimensions.top;
		all = this.parent_dimensions.height;
		pos = rad.parseint(this.element.style.top); //this.element.style.top;
		percentage = Math.ceil((pos/all)*100)
		//set the updated sizes
		this.parent.p[0].height=percentage;
		this.parent.p[1].height=100-percentage;
	}else{
		all = this.parent_dimensions.width;
		pos = rad.parseint(this.element.style.left+(this.element.style.width/2)); //this.element.style.top;
		percentage = Math.ceil((pos/all)*100)
		//set the updated sizes
		this.parent.p[0].width=percentage;
		this.parent.p[1].width=100-percentage;
	}

	this.parent.p[0].panel.draw();
	//set the new ratio, since we are dealing with percentages
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
