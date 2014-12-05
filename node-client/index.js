var server = require("./server");
var router = require("./router");
var requestHandlers_jsTestDriver = require("./requestHandlers");

var handle = {}

handle["/kill_browser"] = requestHandlers_jsTestDriver.kill_browser; 
handle["/enslave_browser"] = requestHandlers_jsTestDriver.enslave_browser; 

server.start(router.route, handle);
    
