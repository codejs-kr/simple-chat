/*!
 *
 * Simple Chatting - base.js
 * @author codeJS (codejs.co.kr / dodortus@gmail.com)
 *
 */
$(function() {
  var socket = io();
  var nickName = /* prompt('닉네임을 입력해 주세요') || */ 'Guest-' + new Date().getTime();
	var roomId = '';
  var $body = $('body');
  var $roomName = $('#room-name');
  var $msgInput = $('#message');
  var $typing = $('#typing-icon');
  
  function getTime() {
	  var time = new Date();
  	// return time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
  	return time.getHours() + ":" + time.getMinutes();
  }
  
  function addUserMessage(nickName, msg, isMe) {
  	$('#chat-content').append([
    	"<li class='" + (isMe ? 'me' : '') + "'>",
    		"<strong class='name'>" + (isMe ? 'Me' : nickName)  + "</strong>",
    		"<p class='message'>" + msg + 
    			"<span class='date'>" + getTime() + "</span>",
  			"</p>",
    	"</li>"
    ].join('\n'));
  }
  
  function addSystemMessage(msg) {
  	$('#chat-content').append([
	  	"<li class='system'>",
	  		"<p class='message'>" + msg + "</p>",
	  	"</li>"
  	].join('\n'));
  }
  
  function getRandomNum() {
  	return Math.floor(Math.random() * 10000) + 1; // 1~10000
  }
  
  // 해시 체크
  if (location.hash.length >= 2) {
  	$roomName.val(location.hash.split('#')[1]);
  }
  
  // 룸생성, 참여 이벤트
  $('#create-room').click(function() {
	  socket.emit('joinRoom', getRandomNum(), nickName);
  });  
  
  $('#join-room').click(function() {
  	socket.emit('joinRoom', $roomName.val(), nickName);
  });
  
  socket.on('joinRoom', function(roomId, nickName) {
  	roomId = roomId;
  	location.hash = roomId;
  	$body.addClass('is-room');
  	addSystemMessage("<strong>" + nickName + "</strong> 님이 참여하였습니다.");
  });
  
  // 로비로 이동
  $('#leave-room').click(function() {
  	socket.emit('leaveRoom', roomId, nickName);
  	location.hash = '';
  	location.reload();
  });
  
  socket.on('leaveRoom', function(nickName) {
  	addSystemMessage("<strong>" + nickName + "</strong> 님이 나갔습니다.");
  });
  
  // 메시지 이벤트
  $('form').submit(function() {
  	var msg = $msgInput.val();
    socket.emit('message', {
    	nickName: nickName,
    	body: msg
    });
    $msgInput.val('');
    addUserMessage(nickName, msg, true);
    
    return false;
  });
  
  socket.on('message', function(data) {
    console.log('message', data);
    addUserMessage(data.nickName, data.body);
    
		$typing.removeClass('visible');
  });
  
  // 타이핑 이벤트
  $msgInput.keydown(function() {
  	socket.emit('typing', nickName);
  });
  
 	var typingTime = null;
  socket.on('typing', function(nickName) {
  	console.log('typing', nickName);
  	
  	$typing.addClass('visible');
  	
  	// 아이콘 자동 숨김
  	/*
  	clearTimeout(typingTime);
  	var typingTime = setTimeout(function() {
  		$typing.removeClass('visible');
  	}, 3000);
  	*/
  });
});