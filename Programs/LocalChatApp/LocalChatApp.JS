const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', socket => {
    console.log('User connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
    socket.on('chat message', message => {
        io.emit('chat message', message);
    });
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
