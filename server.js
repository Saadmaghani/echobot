var restify = require('restify');
var builder = require('botbuilder');

// Get secrets from server environment
var botConnectorOptions = { 
    appId: "50d618c4-ba02-4980-8e92-772973dcd5ef", 
    appSecret: "hdktZ8ENNpcJZW39806wm2G" 
};

// Create bot
var bot = new builder.BotConnectorBot(botConnectorOptions);
bot.add('/', function (session) {
    
    //respond with user's message
    session.send("You said " + session.message.text);
});

// Setup Restify Server
var server = restify.createServer();

// Handle Bot Framework messages
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());

// Serve a static web page
server.get(/.*/, restify.serveStatic({
	'directory': '.',
	'default': 'index.html'
}));

server.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', server.name, server.url); 
});
