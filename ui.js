// !!!! requires mouse module and object

rad.defaults.ui={
	//"width_label":60,
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
		"slider":{
			"style":{
				"float":"right"
			}
		},
		"bg":{
			"className":"slider_BG",
			"style":{
				"height":22,
  				"backgroundColor":"#ccc",
  				"float":"right"
  			}
		},
		"fg":{
			"className":"slider_FG",
			"style":{
				"height":20,
	    			"margin":1,
	    			"backgroundColor":"white",
	    			"float":"left"
			}
		},
		"in":{
			"className":"slider_IN",
			"type":"text",
			"style":{
				"width":40,
				"float":"right",
		    		"color":"black",
		    		"margin-right":2
	    		}
		}
	},
	"dropdown":{
		"style":{}
	},
	"textbox":{
		"type":"text",
		"style":{
			//"float":"right"
		}
	},
	"button":{
		"style":{
			"float":"right"
		}
	},
	"label":{
		"className":"rad_ui_label",
		"style":{
			"width":60
		}
	}
};
//-----------base class
rad.ui=function(){
	return this;
}
rad.ui.prototype.init=function(d){

	//make the container, the main element that will hold the children
	var tmp = {
		"id":d.id,
		"style":rad.defaults.ui.style
	};
	this.container = new rad.element("DIV",tmp);

	this.id = (d.id!=undefined)?d.id:"";
	this.label = (d.label!=undefined)?d.label:"";//for easy data access, as ids are using these vars
	this.value = (d.value!=undefined)?d.value:"0";
	this.uitype = 'none';//the type of ui element this is, set automatically

	//init the css style
	this.container.appendstyle(rad.defaults.ui.style);
	this.container.appendstyle(d.style);
	this.container.setstyle();//set/apply the style yo the element
	//this.style=(d.style!=undefined)?d.style:{};//passed in style to overwrite default values

	//this.dtype=(d.dtype!=undefined)?d.dtype:rad.defaults.ui.dtype;////switch this to measure later

	//this.width_label = (d.width_label!=undefined)?d.width_label:60;

	//this.width = (d.width)?d.width:this.style.width;
	//this.height = (d.width)?d.height:this.style.height;
	//this.margin = (d.margin!=undefined)?d.margin:this.style.margin;
	//this.fontsize = (d.fontsize)?d.fontsize:this.style.fontSize;

	//this.element = document.createElement("DIV");
	//this.element.id = this.id;

	//this.setstyle(this.element,this.style);//set the style of the top level element

	//now we can do the label element
	this.label_container = new rad.element("DIV",rad.defaults.ui.label,"&nbsp;"+d.label);
	this.label_container.appendstyle(d.style_label);
	this.label_container.setstyle();

	if(this.label_container.style.width>0){
		this.container.element.appendChild(this.label_container.element);
	}
}


rad.ui.prototype.getelement=function(){
	return this.container.element;
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

//-----------dropdown
rad.dropdown=function(d){
	/*{
		"label":"graph size",
	    "id":"graphsize",
	    "style":{//if the main container
	      "clear":"none",
	      "float":"left"
	    },
	    "label_style":{"width":0},
	    "dropdown_style":{},
	    "options":{
	      0:"4x4",
	      1:"8x8",
	      2:"16x16",
	      3:"32x32"
	    },//or as an array as well
	    "value": "3",
		"callback":function(){}
	}*/
	rad.ui.prototype.init.call(this,d);
	this.uitype="dropdown";

	this.options = (d.options)?d.options:[];

	//make the DROPDOWN ELEMENT
	var tmp = rad.defaults.ui.dropdown;
	tmp.id="dd_"+d.id+"_"+d.label;
	var dd = new rad.element("SELECT",tmp);
	dd.appendstyle({"width":this.container.style.width-this.label_container.style.width});//add in the width minus the label
	dd.appendstyle(d.style_dropdown);//we might be overwritting the above width calc, so di it first
	dd.setstyle();

	//the function
	var _this = this;

	if(rad.objhasfunction(d,"callback")){
		dd.element.onchange=function(e){d.callback(_this)};
	}

	//POPULATE THE DROPDOWN ELEMENT
	for (var option in d.options){
		var opt = document.createElement("OPTION");
		var opt_string = (typeof d.options === 'object')?option:d.options[option];
		opt.value = opt_string;
		if(opt_string===d.value){
			opt.selected = true;
		}
		opt.innerHTML = d.options[option];
		dd.element.appendChild(opt);
	}
	this.container.element.appendChild(dd.element);
	
	return this;

}
rad.dropdown.prototype=new rad.ui();
rad.dropdown.prototype.constructor=rad.ui;


//-----------textbox
rad.textbox=function(d){
	/*{
		 "id":"numberofframe",
	    "label":"frames",
	    "value": "1",
	    "style":{
	      "clear":"none",
	      "float":"left",
	      "width":40
	    },
	    "style_textbox":{
	      "width":40
	    },
	    "style_label":{
	      "width":0
	    },
		"callback":function(){}
	}*/
	rad.ui.prototype.init.call(this,d);
	this.uitype="textbox";
	
	var tmp = rad.defaults.ui.textbox;
	tmp.id="tb_"+d.id+"_"+d.label;
	tmp.value=this.value;
	var tb = new rad.element("INPUT",tmp);
	tb.appendstyle(d.style_textbox);
	tb.setstyle();
	/*var s = document.createElement("INPUT");
	s.type = "text";
	s.value=this.value;*/

	
	/*this.style_textbox = rad.objclonefast(rad.defaults.ui.textbox.style);
	if(d.style_textbox!=undefined){
		this.appendstyle(this.style_textbox, d.style_textbox);
	}
	this.setstyle(s,this.style_textbox);

	s.id = "tb_"+this.id+"_"+this.label;*/
	var _this = this;
	if(rad.objhasfunction(d,"callback")){
		tb.element.onchange=function(e){d.callback(_this)};
	}

	//if(this.width_label>0)this.element.appendChild(s_label);
	this.container.element.appendChild(tb.element);

	return this;
}
rad.textbox.prototype=new rad.ui();
rad.textbox.prototype.constructor=rad.ui;


//-----------slider
rad.slider=function(d){
	rad.ui.prototype.init.call(this,d);
	this.uitype="slider";

	this.keep=false;//what is this shit?
	//this.width_in = (d.width_input)?d.width_input:40;//with of the input box
	
	//get width    this.container.style.width

	this.callback=d.callback;

	//lets append all the data

	//this.element = document.createElement("DIV");
	//var s_label = document.createElement("DIV");
	this.con = new rad.element("DIV",rad.defaults.ui.slider.slider);//document.createElement("DIV");
	this.bg = new rad.element("DIV",rad.defaults.ui.slider.bg);//document.createElement("DIV");
	this.fg = new rad.element("DIV",rad.defaults.ui.slider.fg);//document.createElement("DIV");

	var tmp = rad.defaults.ui.slider.in;
	tmp.value=this.value;
	this.in = new rad.element("INPUT",tmp);//document.createElement("INPUT");

	if(d.slider!=undefined)
	{
		if(d.slider.slider!=undefined)
		{
			this.con.appendstyle(d.slider.slider.stlye);
			this.in.appendstyle(d.slider.in.stlye);
		}
	}

	this.width_max = this.container.style.width-this.in.style.width-(this.container.style.margin*3);

	if(d.slider!=undefined)
	{
		if(d.slider.bg!=undefined)
		{
			this.bg.appendstyle(d.slider.bg.stlye);
		}
	}
	tmpbgst={
		"stlye":{
			"width":this.width_max,//need to maybe add the measure or dtype eventually
			"marginTop":this.container.style.margin,
			"marginBottom":this.container.style.margin
		}
	}
	this.bg.appendstyle(tmpbgst);

	if(d.slider!=undefined)
	{
		if(d.slider.fg!=undefined)
		{
			this.fg.appendstyle(d.slider.fg.stlye);
		}
	}
	tmpfgst={
		"stlye":{
			"width":Math.round(this.width_max/2),//need to maybe add the measure or dtype eventually
			"maxWidth": this.width_max
		}
	}
	this.fg.appendstyle(tmpfgst);
	

	this.con.setstyle();//con is only an object for the possibilty in the future that might be useeful
	this.bg.setstyle();
	this.fg.setstyle();
	this.in.setstyle();

	//this.element.style.clear="both";

	/*if(this.width_label){
		s_label.className="slider_label_ui";
		s_label.innerHTML = "&nbsp;"+this.label;
		s_label.style.maxWidth = this.width_label+this.dtype;
		s_label.style.margin = this.margin+"px";
		s_label.style.fontSize=(d.fontsize)?d.fontsize:10;
	}*/

	//s_con.style.float="right";

/*	this.bg.className="slider_BG";
	this.fg.className="slider_FG";
	this.input.className="slider_IN";
	this.input.style.width = this.width_in-2;
	this.input.style.float = "right";
	this.input.type="text";
	this.input.value=this.value;

	this.bg.style.width=(this.width-this.width_in-(this.margin*2))+this.dtype;
	this.bg.style.marginTop=this.margin+this.dtype;
	this.bg.style.marginRight=this.margin+this.dtype;

	this.fg.style.width=(Math.round(this.width_max/2))+this.dtype;//for debug
	this.fg.style.maxWidth = this.width_max+this.dtype
	//dd.id = "dd_node_"+id+"_"+parm;
*/
	this.bg.element.appendChild(this.fg.element);
	this.con.element.appendChild(this.bg.element);
	this.container.element.appendChild(this.in.element);
	this.container.element.appendChild(this.con.element);

	var _this = this;
	this.bg.element.onmousedown=function(e){_this.mousedown(e)};
	this.in.element.onchange=function(e){_this.input_changed(e)};

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

	/*if(this.width_label>0){
		var bu_label = document.createElement("DIV");
		bu_label.className="textbox_label_ui";
		bu_label.innerHTML = "&nbsp";
		bu_label.style.maxWidth = this.width_label+this.dtype;
		bu_label.style.margin = this.margin+this.dtype;
	}*/
	//this.element.style.clear="both";

	var bu = document.createElement("BUTTON");
	//s.type = "text";
	//s.value=this.value;
	this.style_button = rad.objclonefast(rad.defaults.ui.button.style);
	if(d.style_button!=undefined){
		this.appendstyle(this.style_button, d.style_button);
	}
	this.setstyle(bu,this.style_button);
	//bu.style.float = "right";
	//bu.style.width=this.width+this.dtype;
	
	//console.log(this.width_input+"px");
	bu.id = "tb_"+this.id+"_"+this.label;
	bu.innerHTML=this.label;
	var _this = this;
	bu.onclick=function(e){d.callback(_this)};

	//if(this.width_label>0)this.element.appendChild(bu_label);
	this.element.appendChild(bu);

	return this;
}
rad.button.prototype=new rad.ui();
rad.button.prototype.constructor=rad.ui;
