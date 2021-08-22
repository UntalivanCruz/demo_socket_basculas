const path = require('path');
const express = require('express');
const app = express();

//settings
app.set('port', process.env.PORT || 80);

//static file
app.use(express.static(path.join(__dirname,'public')));

const server = app.listen(app.get('port'),()=>{
    console.log('Server on port', app.get('port'))
})

const SocketIO = require('socket.io');
const io = SocketIO(server);

io.on('connection',(socket)=>{
    console.log('nueva conexion', socket.id);
    sendData(socket);
});

function sendData(socket){
    socket.emit('bascula1', 220+Math.floor(Math.random() * 20));
    socket.emit('bascula2', 200+Math.floor(Math.random() * 20));
    socket.emit('bascula3', 230+Math.floor(Math.random() * 20));
    socket.emit('bascula4', 100+Math.floor(Math.random() * 20));
    socket.emit('bascula5', 150+Math.floor(Math.random() * 20));

    setTimeout(() => {
        sendData(socket);
    }, 500)
}