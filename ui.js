// !!!! requires mouse module 
//-----------dropdown
rad.dropdown=function(d){
	/*{
		"id":"",
		"label":"",
		"options":[] || {},
		"value":0 || "",
		"width":1,
		"width_label":0,
		"margin":0,
		"fontsize":1,
		"callback":function(){}
	}*/
	this.id = (d.id!=undefined)?d.id:"";
	this.label = (d.label!=undefined)?d.label:"";
	this.options = (d.options)?d.options:[];
	this.val = (d.val!=undefined)?d.val:"0";
	//this.is_object = object;

	this.element = document.createElement("DIV");
	
	//label
	var lw = (d.width_label)?d.width_label:0;
	if(lw>0){
		var dd_label = document.createElement("DIV");
		//dd_label.style.float = "left";
		dd_label.className="dd_label_ui";
		dd_label.innerHTML = "&nbsp;"+this.label;
		dd_label.style.fontSize=(d.fontsize)?d.fontsize:10;
		dd_label.style.maxWidth = lw+"px";
		dd_label.style.margin = (d.margin)?d.margin:0+"px";
	}

	this.element.style.clear="both";

	var dd = document.createElement("SELECT");
	//dd.style.float = "right";
	dd.style.width=(d.width)?d.width:10+"px";
	dd.id = "dd_"+this.id+"_"+this.label;
	
	//the function
	var _this = this;
	//dd.onchange=function(e){_this.changed()};
	dd.onchange=function(e){d.callback(_this)};

	for (var option in d.options){
		var opt = document.createElement("OPTION");
		var opt_string = (typeof d.options === 'object')?option:d.options[option];
		opt.value = opt_string;
		if(opt_string===d.value){
			opt.selected = true;
		}
		opt.innerHTML = d.options[option];
		dd.appendChild(opt);
	}
	if(lw>0)this.element.appendChild(dd_label);
	this.element.appendChild(dd);
	
	//return this.element;
	return this;
}

//-----------slider
rad.slider=function(d){
	/*{
		"id":"",
		"label":"",
		"value":0,
		"width":1,
		"width_label":1,
		"width_input":1,
		"margin":0,
		"fontsize":1,
		"callback":function(){}
	}*/
	this.id = (d.id!=undefined)?d.id:"";;
	this.label = (d.label!=undefined)?d.label:"";;
	this.value = (d.value!=undefined)?d.value:0;
	this.keep=false;//what is this shit?
	this.width_in = (d.width_input)?d.width_input:40;//with of the input box
	var margin = (d.margin)?d.margin:0;
	var width = (d.width)?d.width:100;
	this.width_max = (width-this.width_in-(margin*3));

	this.callback=d.callback;

	this.element = document.createElement("DIV");
	var s_label = document.createElement("DIV");
	var s_con = document.createElement("DIV");
	this.bg = document.createElement("DIV");
	this.fg = document.createElement("DIV");
	this.input = document.createElement("INPUT");

	this.element.style.clear="both";

	var lw = (d.width_label)?d.width_label:0;
	if(lw){
		s_label.className="slider_label_ui";
		s_label.innerHTML = "&nbsp;"+this.label;
		s_label.style.maxWidth = lw+"px";
		s_label.style.margin = margin+"px";
		s_label.style.fontSize=(d.fontsize)?d.fontsize:10;
	}

	s_con.style.float="right";

	this.bg.className="slider_BG";
	this.fg.className="slider_FG";
	this.input.className="slider_IN";
	this.input.style.width = this.width_in;
	this.input.type="text";
	this.input.value=this.value;

	this.bg.style.width=(width-this.width_in-(margin*2))+"px";
	this.bg.style.marginTop=margin+"px";
	this.bg.style.marginRight=margin+"px";

	this.fg.style.width=(Math.round(this.width_max/2))+"px";//for debug
	this.fg.style.maxWidth = this.width_max+"px"
	//dd.id = "dd_node_"+id+"_"+parm;

	this.bg.appendChild(this.fg);
	s_con.appendChild(this.bg);
	if(lw)this.element.appendChild(s_label);
	this.element.appendChild(this.input);
	this.element.appendChild(s_con);

	var _this = this;
	this.bg.onmousedown=function(e){_this.mousedown(e)};
	this.input.onchange=function(e){_this.input_changed(e)};

	return this;
}

rad.slider.prototype.mousedown=function(e){
	if(!this.keep){
		this.value = this.input.value;
		this.keep=true;
	}
	this.update(e);
	var _this = this;
	this.tmp_updater = function(e){_this.update(e)};//js.closure(this,this.update);
	this.tmp_release = function(e){_this.release(e)};//js.closure(this,this.release);
	rad.dragevent(this.tmp_updater,this.tmp_release);
}
rad.slider.prototype.input_changed=function(e){
	var new_value = parseFloat(this.input.value);
	if ( isNaN(new_value) ){
		//v.value=this.val;//the fuck is v?
	}else{
		var bounds = this.bounds(new_value);
		this.fg.style.width = (this.width_max/2)+"px";
		//now set the nodes value
		this.value = new_value;
		if (typeof this.callback === "function"){
			this.callback(this);
		}
		//draft.scripts[draft.activescript].nodes[this.id].class.inputs_values[this.parm]=this.val;
	}
}
rad.slider.prototype.update=function(e){
	var c = js.mouseposition(e);
	var p = js.position(this.bg);
	var s = js.size(this.bg);

	var mouse_offset = c.x-p.x;

	var new_position = js.clamp(mouse_offset,1,this.width_max);//i need to know the width to go to
	var bounds = this.bounds(this.value);
	var new_val = js.remap(new_position,1,this.width_max,bounds.min,bounds.max);
	//console.log(bounds.min+":"+bounds.max);
	this.fg.style.width = new_position;
	this.input.value = new_val.toFixed(2);
}
rad.slider.prototype.release=function(e){
	js.removedragevent(this.tmp_updater,this.tmp_release);
	//now i need to set the value on the node
	this.value = parseFloat(this.input.value);
	if (typeof this.callback === "function"){
		this.callback(this);
	}
	//draft.scripts[draft.activescript].nodes[this.id].class.inputs_values[this.parm]=this.val; 
}
rad.slider.prototype.bounds=function(val){
	val = parseFloat(val);	
	var span = (val==0)? 10 : val;
	var v = Math.abs(span);

	return {min:val-v, max:val+v};
}
