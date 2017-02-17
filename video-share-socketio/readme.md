#video-share app demo
####tags: socket.io ,
####展示:[app demo](https://video-share-alok.herokuapp.com/)
####[教程视频](https://code.tutsplus.com/courses/connect-the-web-with-websockets/)
# Features
1. **聊天室，可发送视频链接**

# 学习笔记
1. ```
//server/main.js
var io = require('socket.io')(server); 
//自动生成 ../socket.io/socket.io.js
```
1. ```
//app/main.js 
io.connect(window.location.hostname,{'forceNew':true}); 
//{'forceNew':true} 自动对每个客户端建立新连接，无缓存
```
1. 使用 `io.sockets.emit` 来激活客户端里的事件


