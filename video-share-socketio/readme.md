#video-share app demo
####tags: socket.io ,

####display:[app demo](https://video-share-alok.herokuapp.com/)
####[Tutorial video](https://code.tutsplus.com/courses/connect-the-web-with-websockets/)
# Features
1. **Send Message with video-link,just the same as chatting room**

# Learning notes
1. ```
//server/main.js
var io = require('socket.io')(server); 
//automatically create ../socket.io/socket.io.js
```
1. ```
//app/main.js 
io.connect(window.location.hostname,{'forceNew':true}); 
//{'forceNew':true} force to create new connection every client,no-cache
```
1. use `io.sockets.emit` to active relative event in all clients.


