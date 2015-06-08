var http = require('http');
var fs= require('fs');

var server=http.createServer(function (req, res) { 	
  res.writeHead(200, {'Content-Type': 'text/plain'});   
  
  switch(req.url){
	case "/index":{
		res.end("welcome");
		//console.log("welcome");
	}break;
	case "/about":{
		res.end("plernsoft + nodejs");
		//console.log("plernsoft + nodejs");
	}break;	
	case "/upload":{ 
		console.log("upload");
		if(req.method=="POST"){
			 console.log("OKOK");
			 var stream = null;
			 req.on('data', function(chunk) {
				console.log("Received body data:");
				if(stream==null){
					stream = fs.createWriteStream("my_file.png");					
				}								
				stream.once('open',function(fd){
					stream.write(chunk);
					stream.end();
				});							 
			});			
			req.on('end',function(){
				res.end("OK");
			});		
			
		}else{
			console.log("!!!");
			res.end("OK");
		}			 
		
	}break;
	case "/close":{
		res.end('good bye!\n');
		server.close();
	}break;
	default:{
		console.log("h");
		res.end('Hello World from node\n');
	}break;	
  }    
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
