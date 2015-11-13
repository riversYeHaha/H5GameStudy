var exec = require("child_process").exec,
	querystring = require("querystring"),
	fs = require("fs");
	formidable = require("formidable");

function start(request, respone){
	console.log("Request handler 'start' was called.");

	var body = "<html>" + 
		"<head>" + 
		"<meta http-quiv='Content-Type' content='text/html;' " +
		"charset=UTF-8/>" + 
		"</head>" +
		"<body>" +
		"<form action='/upload' enctype='multipart/form-data' method='post'>" +
		"<input type='file' name='upload'>" +
		"<input type='submit' value='Upload file'/>" +
		"</form>" +
		"</body>" +
		"</html>";

	respone.writeHead(200, {"Content-Type":"text/html"});
	respone.write(body);
	respone.end();

	/*exec("dir", {timeout:10000, maxBuffer:20000*1024},
		 function(error, stdout, stderr){
			respone.writeHead(200, {"Content-Type":"text/plain"});
			respone.write(stdout);
			respone.end();
	});*/

	/*function sleep(milliSeconds){
		var startTime = new Date().getTime();
		while(new Date().getTime() < startTime + milliSeconds);
	}

	sleep(10000);
	return "Hello Start";*/
}

function upload(request, respone){
	console.log("Request handler 'upload' was called.");
	//return "Hello Upload";

	var form = new formidable.IncomingForm();
	form.uploadDir = "tmp";
	console.log("about to parse");

	form.parse(request, function(error, fields, files){
		if (error) 
		{
			console.log("parse faild");
			throw error;
		}
		console.log("parsing done");

		fs.rename(files.upload.path, "./tmp/test.png", function(err){
			if (err) throw err;

			respone.writeHead(200, {"Content-Type":"text/html"});
			respone.write("receive image:<br>");
			respone.write("<img src='/show'>");
			respone.end();
		});

	})

	
	/*respone.writeHead(200, {"Content-Type":"text/plain"});
	respone.write("You've sent:"+ querystring.parse(postData).text);
	respone.end();*/
}

function show(request, respone){
	console.log("Request handler 'show' was called.");
	fs.readFile("./tmp/test.png","binary",function(error, file){
		if (error){
			respone.writeHead(500, {"Content-Type":"text/plain"});
			respone.write(error + "\n");
			respone.end();
		}else{
			respone.writeHead(200, "binary");
			respone.write(file, "binary");
			respone.end();
		}
	});
}

exports.start = start;
exports.upload = upload;
exports.show = show;