var userId = localStorage.getItem('userId') || randomId();
var messageCache;

localStorage.setItem('userId',userId);
console.info('Hi i am user #'+ userId);

function randomId(){
	return Math.floor(Math.random()*1e11);
};

var socket = io.connect(window.location.hostname,{'forceNew':true}); 
//force to create new connection everytime,no-cache
socket.on('message',function(data){
	console.info(data);
	messageCache = data;
	render();
});

function render(){
	var data = messageCache;//refer
	var html = data.sort(function(a,b){
		return a.ts - b.ts;
	}).map(function(data,index){
		return (`
		<form class='message' onsubmit='return likeMessage(messageCache[${index}])'>
			<div class='name'> ${data.userName} </div>
				<a href='${data.content.link}' class='message' target=_blank>
					${data.content.text}
				</a>
				<div class='time'>${moment(data.ts).fromNow()}</div>	
				<input type='submit' class='like-count' value="${data.likedBy.length} Likes"/>			
		</form>			
			`)
	}).join('');
	document.getElementById('messages').innerHTML = html;
};

//add extra prop : messageId
function addMessage(e){
	var payload = {
		messageId: randomId(),
		userName:document.getElementById('username').value,
		content: {
			text:document.getElementById('message').value,
			link:document.getElementById('linkAddress').value
	},
		likedBy:[],
		ts:Date.now()
	}
	socket.emit('new-message',payload);
	return false;
};

//update one message with likedBy changed 
function likeMessage(message){
	var index = message.likedBy.indexOf(userId);
	if(index<0){
		message.likedBy.push(userId)
	} else{
		message.likedBy.splice(index,1) //cancel the like
	}
	socket.emit('update-message',message);
	render(); //update the messageCache then render again;
	return false;
};