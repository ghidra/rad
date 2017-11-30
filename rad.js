rad={};
rad.defaults={};
//------------------------
rad.includes={
	module_path:"",
	use_modules:[],
	queued_modules:[],//modules that have been called up so far
	required:{
		dom:["vector"],
		drag:["mouse", "array","vector", "math"],
		element:["object","dom"],
		graph:["vector"],
		io:["localstorage"],
		mouse:["vector"],
		noise:["vector"],
		panel:["element"],
		panels:["object", "dom", "element"],
		ui:["mouse","object"]
	},
	init_modules:function(path){
		this.module_path=path;
		this.use_modules=[this.module_path+"core.js"];
	},
	///this method allows us to recursively get requirements of dependant modules
	modules_complete:function(mod){
		//console.log(mod);
		if ( this.required.hasOwnProperty(mod) ){///check for requirements not included yet?
			for(var r in this.required[mod]){///loop the requirements
				this.modules_complete(this.required[mod][r]);
			}
		}
		///now we can add ourself to the list
		this.use_modules.push(this.module_path+mod+".js");//for loading
		this.queued_modules.push(mod);//so we know what is already queued up to load
	},
	modules:function(libs){
		for(var i in libs){
			if(this.queued_modules.indexOf(libs[i])<0){//only include if we havent already included the module
				this.modules_complete(libs[i]);
			}
		}
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

