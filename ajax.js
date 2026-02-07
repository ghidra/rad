rad.ajax=function(){
	return this;
};

rad.ajax.prototype.get=function(script,data,method,onerror,timeout){
	var xhr = new XMLHttpRequest();
	if(timeout) xhr.timeout = timeout;
	xhr.onreadystatechange = function() {
	    if(this.readyState == 4){
	    	if(this.status == 200){
	    		if(method!=null) method(xhr.responseText);
	    	}else{
	    		if(onerror) onerror(this.status,xhr.responseText);
	    	}
	    }
	};
	if(onerror){
		xhr.ontimeout = function(){ onerror("timeout"); };
		xhr.onerror = function(){ onerror("network"); };
	}
	xhr.open("GET", script+"?"+data, true);
	xhr.send();
	return xhr;
};

//https://plainjs.com/javascript/ajax/send-ajax-get-and-post-requests-47/
// example request
//post('http://foo.bar/', 'p1=1&p2=Hello+World', function(data){ console.log(data); });
//post('http://foo.bar/', { p1: 1, p2: 'Hello World' }, function(data){ console.log(data); });
rad.ajax.prototype.post=function(script,data,method,onerror,timeout){
    var params = typeof data == 'string' ? data : Object.keys(data).map(
            function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
        ).join('&');

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    if(timeout) xhr.timeout = timeout;
    xhr.open('POST', script,true);
    xhr.onreadystatechange = function() {
        if(xhr.readyState>3){
        	if(xhr.status==200){
        		if(method) method(xhr.responseText);
        	}else{
        		if(onerror) onerror(xhr.status,xhr.responseText);
        	}
        }
    };
    if(onerror){
    	xhr.ontimeout = function(){ onerror("timeout"); };
    	xhr.onerror = function(){ onerror("network"); };
    }
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    return xhr;
}
