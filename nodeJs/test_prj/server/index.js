var server = require("./server_respone");
var route = require("./route");
var requestHandelers = require("./requestHandelers");

var handle = {}
handle["/"] = requestHandelers.start;
handle["/start"] = requestHandelers.start;
handle["/upload"] = requestHandelers.upload;
handle["/show"] = requestHandelers.show;

server.start(route.route, handle);