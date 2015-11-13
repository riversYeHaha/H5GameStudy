//function route(handle, pathname, respone, postData){
function route(handle, pathname, request, respone){
	console.log("About to route a request for " + pathname);
	if (typeof handle[pathname] === 'function'){
		//handle[pathname](respone, postData);
		handle[pathname](request, respone);
	}else{
		console.log("No request handler found for" + pathname);
		respone.writeHead(404, {"Content-Type":"text/plain"});
		respone.write("404 Note Found");
		respone.end();
	}
}

exports.route = route;