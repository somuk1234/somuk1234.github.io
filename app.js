var app=require('./httpServer');
var wsServer=require('./wbServer');
var guid=require('./guid');
const clients={};
const games={};
wsServer.on('request',function(request){
	const connection=request.accept(null,request.origin);
	connection.on('message',function(message){
		var message=JSON.parse(message.utf8Data);
      if(message.method==='create'){
          var gameId=guid();
          var players=[];
          players.push(message.clientId);
          games[gameId]={
            "players" : players
          }
          var payload={
          	"method" : "create",
          	"gameId" : gameId,
          	"playId" : 1
          }
          clients[clientId].connection.send(JSON.stringify(payload));
      }
      if(message.method==='join'){
      	  games[message.gameId].players.push(message.clientId);
      	  var id=games[message.gameId].players.length;
          var payload={
            "method" : "join",
            "playId" : id
      	  }
          clients[clientId].connection.send(JSON.stringify(payload));
      }
      if(message.method==='play'){
      	var plyrs=games[message.gameId].players;
      	var payload={
           "method" : "play",
           "players" : plyrs.length
      	}
      	for(var i=0;i<plyrs.length;i++){
                clients[plyrs[i]].connection.send(JSON.stringify(payload));
             }	
      }
      if(message.method==='move'){
      	var payload={
      		  "method" : "move",
      		  "playId" : message.playId,
      		  "coordinate" : message.coordinate
             }
             var players=games[message.gameId].players;
             for(var i=0;i<players.length;i++){
                clients[players[i]].connection.send(JSON.stringify(payload));
             }		
      }
      if(message.method==='gameover'){
         var payload={
         	"method" : "gameover",
         	"winner" : message.playId
         }
         var pl=games[message.gameId].players;
         for(var i=0;i<pl.length;i++){
         	clients[pl[i]].connection.send(JSON.stringify(payload));
         }
         delete games[message.gameId];
      }
	});
	connection.on('close',function(){
       console.log('connection closed!');
	});
	const clientId=guid();
	clients[clientId]={
		"connection" : connection
	}
	var payload={
		"method" : "connect",
		"clientId" : clientId
	}
	connection.send(JSON.stringify(payload));
});
