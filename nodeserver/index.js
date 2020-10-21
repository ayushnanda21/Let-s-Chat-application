//Node js server handling socket.io
const io =require('socket.io')(8000)  //for acquiring socket.io

const users =  {};    //for all users

io.on('connection', socket =>{
  socket.on('new-user-joined',name =>{
    console.log("New user", name);   //this server will listen to incoming events
    users[socket.id] = name;
    socket.broadcast.emit('user-joined', name);      //will emit message to all those except which person who joined
  });

  socket.on('send', message =>{                   //send then make others receive
    socket.broadcast.emit('receive', {message : message,name:users[socket.id]})
  });
})
