var WebSocketServer = require('websocket').server;
var http = require('http');
const clients={};
var server = http.createServer(function(request, response) {
    response.writeHead(404);
    response.end();
});
server.listen(8080, function() {
    console.log('webserver is listening on port 8080');
});
wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});
module.exports=wsServer;