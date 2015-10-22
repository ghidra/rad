rad.storage=function(type){
    return this.init(type);
}
rad.storage.prototype.init=function(type){
    if(typeof(Storage)!=="undefined"){
        //we have storage, use it
        if(type=="local"){
            this.storage = window.localStorage;
	}else{
            this.storage = window.sessionStorage;
        }
    else{
        //we do NOT have storage
        return false;
    }
}
rad.storage.prototype.setobj=function(id,obj){
    this.storage.setItem(id,JSON.stringify(obj));
}
rad.storage.prototype.getobj=function(id){
    return JSON.parse(this.storage.getItem(id));
}
rad.storage.prototype.set=function(id,d){
    this.storage.setItem(id,d);
}
rad.storage.prototype.get=function(id){
    return this.storage.getItem(id);
}

