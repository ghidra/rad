// !!!! requires mouse module and object

rad.defaults.ui={
	"width_label":60,
	"dtype":"px",
	"style":{
		"width":120,
		"height":10,
		"margin":0,
		"fontSize":10,
		"clear":"both",
		"float":"none"
	},
	"slider":{
		"bg":{
			"dtype":"px",
			"style":{
				"height":22,
  				"backgroundColor":"#ccc",
  				"float":"right"
  			}
		},
		"fg":{
			"dtype":"px",
			"style":{
				"height":20,
    			"margin":1,
    			"backgroundColor":"white",
    			"float":"left"
			}
		},
		"in":{
			"dtype":"px",
			"style":{
				"float":"right",
	    		"color":"black",
	    		"margin-right":2
	    	}
		}
	}
};
//-----------base class
rad.ui=function(){
	return this;
}
rad.ui.prototype.init=function(d){
	this.id = (d.id!=undefined)?d.id:"";
	this.label = (d.label!=undefined)?d.label:"";
	this.value = (d.value!=undefined)?d.value:"0";
	this.uitype = 'none';//the type of ui element this is, set automatically

	//init the css style
	this.style = rad.objclonefast(rad.defaults.ui.style);
	this.appendstyle(d.style);
	//this.style=(d.style!=undefined)?d.style:{};//passed in style to overwrite default values

	this.dtype=(d.dtype!=undefined)?d.dtype:"px";////switch this to measure later

	this.width_label = (d.width_label!=undefined)?d.width_label:60;

	this.width = (d.width)?d.width:120;
	this.height = (d.width)?d.height:10;
	this.margin = (d.margin!=undefined)?d.margin:0;

	this.fontsize = (d.fontsize)?d.fontsize:10;

	this.element = document.createElement("DIV");
	this.element.id = this.id;

	this.setstyle(this.element,this.style);//set the style of the top level element
}
rad.ui.prototype.getelement=function(){
	return this.element;
}
rad.ui.prototype.getvalue=function(){
	var v;
	switch(this.uitype){
		case "dropdown":
			v = document.getElementById("dd_"+this.id+"_"+this.label).value
			break;
		case "textbox":
			v = document.getElementById("tb_"+this.id+"_"+this.label).value;
			break;
		case "slider":
			v = this.value;
			break;
		case "button":
			break;
	}
	return v;
}
rad.ui.prototype.appendstyle=function(d){
	//updates or overwrites styles for use
	if(d!=undefined){
		for(var style_attribute in d){
			this.style[style_attribute] = d[style_attribute];
		}
	}
}
rad.ui.prototype.setstyle=function(elem,d){
	for(var style_attribute in d){
		if(d[style_attribute]!="none" && d[style_attribute]!=0 && d[style_attribute]!="0" ){
			elem.style[style_attribute] = d[style_attribute];
		}
	}
}

//-----------dropdown
rad.dropdown=function(d){
	/*{
		"id":"",
		"label":"",
		"options":[] || {},
		"value":0 || "",
		"dtype":"px",//dimension type
		"width":1,
		"height":1,
		"width_label":0,
		"margin":0,
		"fontsize":1,
		"callback":function(){}
	}*/
	rad.ui.prototype.init.call(this,d);
	this.uitype="dropdown";

	this.options = (d.options)?d.options:[];

	//label
	if(this.width_label>0){
		var dd_label = document.createElement("DIV");
		//dd_label.style.float = "left";
		dd_label.className="dd_label_ui";
		dd_label.innerHTML = "&nbsp;"+this.label;
		dd_label.style.fontSize=this.fontsize;
		dd_label.style.maxWidth = this.width_label+this.dtype;
		dd_label.style.margin = this.margin+this.dtype;
	}

	//this.element.style.clear="both";

	var dd = document.createElement("SELECT");
	//dd.style.float = "right";
	dd.style.width=this.width+this.dtype;
	dd.id = "dd_"+this.id+"_"+this.label;
	
	//the function
	var _this = this;
	//dd.onchange=function(e){_this.changed()};
	if(rad.objhasfunction(d,"callback")){
		dd.onchange=function(e){d.callback(_this)};
	}

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
	if(this.width_label>0)this.element.appendChild(dd_label);
	this.element.appendChild(dd);
	
	//return this.element;
	return this;
}
rad.dropdown.prototype=new rad.ui();
rad.dropdown.prototype.constructor=rad.ui;


//-----------textbox
rad.textbox=function(d){
	/*{
		"id":"",
		"label":"",
		"value":"",
		"width":1,
		"width_label":0,
		"margin":0,
		"fontsize":1,
		"callback":function(){}
	}*/
	rad.ui.prototype.init.call(this,d);
	this.uitype="textbox";
	
	if(this.width_label>0){
		var s_label = document.createElement("DIV");
		s_label.className="textbox_label_ui";
		s_label.innerHTML = "&nbsp;"+this.label;
		s_label.style.fontSize=this.fontsize;
		s_label.style.maxWidth = this.width_label+this.dtype;
		s_label.style.margin = this.margin+this.dtype;
	}
	this.element.style.clear="both";

	var s = document.createElement("INPUT");
	s.type = "text";
	s.value=this.value;
	//dd.style.float = "right";
	s.style.width=this.width+this.dtype;
	//console.log(this.width_input+"px");
	s.id = "tb_"+this.id+"_"+this.label;
	var _this = this;
	if(rad.objhasfunction(d,"callback")){
		s.onchange=function(e){d.callback(_this)};
	}

	if(this.width_label>0)this.element.appendChild(s_label);
	this.element.appendChild(s);

	return this;
}
rad.textbox.prototype=new rad.ui();
rad.textbox.prototype.constructor=rad.ui;


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
	rad.ui.prototype.init.call(this,d);
	this.uitype="slider";

	this.keep=false;//what is this shit?
	this.width_in = (d.width_input)?d.width_input:40;//with of the input box
	//var margin = (d.margin)?d.margin:0;
	//var width = (d.width)?d.width:100;
	this.width_max = (this.width-this.width_in-(this.margin*3));

	this.callback=d.callback;

	//this.element = document.createElement("DIV");
	var s_label = document.createElement("DIV");
	var s_con = document.createElement("DIV");
	this.bg = document.createElement("DIV");
	this.fg = document.createElement("DIV");
	this.input = document.createElement("INPUT");

	this.element.style.clear="both";

	if(this.width_label){
		s_label.className="slider_label_ui";
		s_label.innerHTML = "&nbsp;"+this.label;
		s_label.style.maxWidth = this.width_label+this.dtype;
		s_label.style.margin = this.margin+"px";
		s_label.style.fontSize=(d.fontsize)?d.fontsize:10;
	}

	s_con.style.float="right";

	this.bg.className="slider_BG";
	this.fg.className="slider_FG";
	this.input.className="slider_IN";
	this.input.style.width = this.width_in;
	this.input.type="text";
	this.input.value=this.value;

	this.bg.style.width=(this.width-this.width_in-(this.margin*2))+this.dtype;
	this.bg.style.marginTop=this.margin+this.dtype;
	this.bg.style.marginRight=this.margin+this.dtype;

	this.fg.style.width=(Math.round(this.width_max/2))+this.dtype;//for debug
	this.fg.style.maxWidth = this.width_max+this.dtype
	//dd.id = "dd_node_"+id+"_"+parm;

	this.bg.appendChild(this.fg);
	s_con.appendChild(this.bg);
	if(this.width_label)this.element.appendChild(s_label);
	this.element.appendChild(this.input);
	this.element.appendChild(s_con);

	var _this = this;
	this.bg.onmousedown=function(e){_this.mousedown(e)};
	this.input.onchange=function(e){_this.input_changed(e)};

	return this;
}

rad.slider.prototype=new rad.ui();
rad.slider.prototype.constructor=rad.ui

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
		this.fg.style.width = (this.width_max/2)+this.dtype;
		//now set the nodes value
		this.value = new_value;
		if (typeof this.callback === "function"){
			this.callback(this);
		}
		//draft.scripts[draft.activescript].nodes[this.id].class.inputs_values[this.parm]=this.val;
	}
}
rad.slider.prototype.update=function(e){
	var c = rad.mouseposition(e);
	var p = rad.domposition(this.bg);
	var s = rad.domsize(this.bg);

	var mouse_offset = c.x-p.x;

	var new_position = rad.clamp(mouse_offset,1,this.width_max);//i need to know the width to go to
	var bounds = this.bounds(this.value);
	var new_val = rad.remap(new_position,1,this.width_max,bounds.min,bounds.max);
	//console.log(bounds.min+":"+bounds.max);
	this.fg.style.width = new_position;
	this.input.value = new_val.toFixed(2);
}
rad.slider.prototype.release=function(e){
	rad.removedragevent(this.tmp_updater,this.tmp_release);
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


//-----------button
rad.button=function(d){
	/*{
		"id":"",
		"label":"",
		"width":1,
		"width_label":0,
		"margin":0,
		"fontsize":1,
		"callback":function(){}
	}*/
	rad.ui.prototype.init.call(this,d);
	this.uitype="button";

	if(this.width_label>0){
		var bu_label = document.createElement("DIV");
		bu_label.className="textbox_label_ui";
		bu_label.innerHTML = "&nbsp";
		bu_label.style.maxWidth = this.width_label+this.dtype;
		bu_label.style.margin = this.margin+this.dtype;
	}
	this.element.style.clear="both";

	var bu = document.createElement("BUTTON");
	//s.type = "text";
	//s.value=this.value;
	bu.style.float = "right";
	bu.style.width=this.width+this.dtype;
	//console.log(this.width_input+"px");
	bu.id = "tb_"+this.id+"_"+this.label;
	bu.innerHTML=this.label;
	var _this = this;
	bu.onclick=function(e){d.callback(_this)};

	if(this.width_label>0)this.element.appendChild(bu_label);
	this.element.appendChild(bu);

	return this;
}
rad.button.prototype=new rad.ui();
rad.button.prototype.constructor=rad.ui;
