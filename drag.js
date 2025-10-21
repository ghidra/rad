//requires mouse, array,vector, math
//THIS IS BOGUS< DOES NOT WORK
/*rad.drag=function(move,release){
	this.move = move;
	this.release=release;
	//document.observe('mousemove',this.dragging);
	//document.observe('mouseup',this.stop);
	document.addEventListener('mousemove',this.dragging);
	document.addEventListener('mouseup',this.stop);
}*/
rad.drag={
	'modifier':false,//if the modifier is down to append to list
	'dragging':[],//data to hold onto
	'position':new rad.vector2(),//hold the vector of the initial mouse press
	'list':[],//be able to drag multiple things at once
	'list_data':[],//hold any data specific to this draggable element, like a lock
	'z_index' :10,
	'draggable':function(e,id,dragcall,releasecall,clamp,lock){
		this.dragcallback=dragcall;
		this.releasecallback=releasecall;
		//if we want to lock it to an axis
		clamp=(clamp!='undefined')?clamp:new rad.vector2(-1,-1);
		lock=(lock!='undefined')?lock:-1;
		//deal with multiple draggable elements
		if(!this.modifier){
			rad.flusharray(this.list);
			rad.flusharray(this.list_data);
		}
	    var add=true;
		for (var i=0;i<this.list.length;i++){
			if(this.list[i]==id){
				add=false;
				break;
			}
		}
	    if(add){
	    	this.list.push(id);
	    	this.list_data.push({'clamp':clamp,'lock':lock});
	    }
	    //--------
	    
		//var mo_po = rad.relativemouseposition(e);
		this.position = rad.mouseposition(e);
		//rad.flusharray(this.dragging);

	    //this.drag_data._x = mo_po[0];
	    //this.drag_data._y = mo_po[1];
	    //this.drag_data.windows = [];

		for (var i=0;i<this.list.length;i++){
			var win = document.getElementById(this.list[i]);
	        //this.dragging[i]=[];
	        //this.dragging[i][0] = (isNaN(parseInt(win.style.left, 10))) ? 0 : parseInt(win.style.left, 10);
	        //this.dragging[i][1] = (isNaN(parseInt(win.style.top, 10))) ? 0 : parseInt(win.style.top, 10);
	        var nx = (isNaN(parseInt(win.style.left, 10))) ? 0 : parseInt(win.style.left, 10);
	        var ny = (isNaN(parseInt(win.style.top, 10))) ? 0 : parseInt(win.style.top, 10);
	        this.dragging[i]=new rad.vector2(nx, ny);
	        win.style.zIndex = this.z_index;
		}
    
		rad.dragevent(this.go,this.stop);
	},
	'go':function(e){
		var _this = rad.drag;
   		//var mo_po = rad.relativemouseposition(e);
   		var mo_po = rad.mouseposition(e);
   		var pd = mo_po.sub(_this.position);
        //var xd = (mo_po[0] - _this.drag_data._x);
        //var yd = (mo_po[1] - _this.drag_data._y);
        
		for(var i = 0; i < _this.list.length; i++){
			var pn = _this.dragging[i].add(pd)
            //var xn = _this.drag_data.windows[i][0]+xd;
            //var yn = _this.drag_data.windows[i][1]+yd;
            //console.log(_this.list_data[i]);
            //lock
            xn=(_this.list_data[i].lock==1)? _this.dragging[i].x : pn.x;//lock to vertical axis
            yn=(_this.list_data[i].lock==0)? _this.dragging[i].y : pn.y;//lock to the horizontal axis
            
            //clamp
            xn=(_this.list_data[i].clamp.x>-1 && _this.list_data[i].lock==0)? rad.clamp(xn,_this.list_data[i].clamp.x,_this.list_data[i].clamp.y) : xn;
            yn=(_this.list_data[i].clamp.x>-1 && _this.list_data[i].lock==1)? rad.clamp(yn,_this.list_data[i].clamp.x,_this.list_data[i].clamp.y) : yn;
			
            //console.log(_this.list_data[i].clamp.x+":"+_this.list_data[i].clamp.y)
			var win = document.getElementById(_this.list[i]);
			win.style.left = xn + "px";
            win.style.top = yn + "px";
            //console.log(pn.x+":"+pn.y);
        }
        _this.dragcallback();
	},
	'stop':function(e){
		var _this = rad.drag;
		for (var i=0;i<_this.list.length;i++){
			document.getElementById(_this.list[i]).style.zIndex = _this.z_index-1;
		}
   		rad.removedragevent(_this.go,_this.stop);
   		_this.releasecallback();
	}
}