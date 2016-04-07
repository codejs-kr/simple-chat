/*!
 *
 * Simple Chatting - base.js
 * @author codeJS (codejs.co.kr / dodortus@gmail.com)
 *
 */
$(function() {
  var socket = io();
  var nickName = /* prompt('닉네임을 입력해 주세요') || */ 'Guest-' + new Date().getTime();
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
  
  // 참여 이벤트
  socket.emit('join', nickName);
  socket.on('join', function(nickName) {
  	addSystemMessage("<strong>" + nickName + "</strong> 님이 참여하였습니다.");
  });
  
  // 종료 이벤트
  $('#leave-room').click(function() {
  	socket.emit('leave', nickName);
  });
  
  socket.on('leave', function(nickName) {
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