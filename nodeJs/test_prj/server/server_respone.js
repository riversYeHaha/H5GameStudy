var http = require("http");
var url = require("url");

function start(route, handle){
	function onRequest(req, res){
		var pathname = url.parse(req.url).pathname;
		var postData = "";
		console.log("Reuest for" + pathname + " receive.");

		route(handle, pathname, req, res);

		/*req.setEncoding("utf8");
		req.addListener("data",function(postDataChunk){
			postData += postDataChunk;
			console.log("Received POST data chunk '"+
			postDataChunk + "'.");
		});

		req.addListener("end", function(){
			route(handle, pathname, res, postData);
		});*/

	}

	http.createServer(onRequest).listen(1234);
	console.log("Server has started.");
}

exports.start = start;