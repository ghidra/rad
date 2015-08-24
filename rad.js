rad={};
//------------------------
rad.includes={
	module_path:"",
	use_modules:[],
	init_modules:function(path){
		this.module_path=path;
		//this.use_modules=[this.module_path+"rad_core.js"];
	},
	modules:function(libs){
		for(var i in libs){
			libs[i]=this.module_path+libs[i];
		}
		this.use_modules.concat(libs);
	},
	use_files:[],
	source:function(files){
		this.use_files=files;
		this.include();
	},
	insert:function(src){
		document.write('<script type="text/javascript" language="Javascript" src="'+src+'"></script>')
	},
	include:function(){
		var all = this.use_modules.concat(this.use_files);
		for(var i in all){
			this.insert(all[i]);		
		}
	}
}
//--------get the right path for modules
var r_s = document.getElementsByTagName("script");
var r_l = r_s[r_s.length-1].getAttribute("src");
var r_sp = r_l.split("/");
r_sp.pop();
var r_p = "";
for (var ri_i in r_sp){
	r_p+=r_sp[ri_i]+"/";
}
rad.includes.init_modules(r_p);
//----------------------------------------------
//determine, the modules I want to load first
//---
//rad.includes.modules(["",""]);
//add in the source files
//---
//rad.includes.source(["",""]);
//---
//can I run this automatically
//rad.includes.include();