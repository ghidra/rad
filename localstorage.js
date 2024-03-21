rad.localstorage=function(type){
    //type is either local or session..local is long term, session is just for the session
    type = type || "local";
    return this.init(type);
}
rad.localstorage.prototype.init=function(type){
    if(typeof(Storage)!=="undefined"){
        //we have storage, use it
        if(type=="local"){
            this.storage = window.localStorage;
	    }else{
            this.storage = window.sessionStorage;
        }
    }else{
        //we do NOT have storage
        return false;
    }
}
//use *obj to strigify json data
rad.localstorage.prototype.setobj=function(id,name,obj){
    newobj={}
    newobj[name]=obj;
    this.storage.setItem(id,JSON.stringify(newobj));
}
rad.localstorage.prototype.getobj=function(id){
    return JSON.parse(this.storage.getItem(id));
}
//use these just to set simple no object data
rad.localstorage.prototype.set=function(id,d){
    this.storage.setItem(id,d);
}
rad.localstorage.prototype.get=function(id){
    return this.storage.getItem(id);
}
///cleanup
rad.localstorage.prototype.deleteall=function(){
    return this.storage.clear();
}
rad.localstorage.prototype.deleteitem=function(name){
    return this.storage.removeItem(name);
}


