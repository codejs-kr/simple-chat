/*!
 *
 * Simple Chatting - base.js
 * @author codeJS (codejs.co.kr / dodortus@gmail.com)
 *
 */
$(function() {
  var socket = io();
  var nickName = 'user-' + new Date().getTime();
  var $msgInput = $('#message');
  
  $('form').submit(function() {
    socket.emit('message', {
    	nickName: nickName,
    	body: $msgInput.val()
    });
    $msgInput.val('');
    return false;
  });
  
  socket.on('message', function(msg) {
    console.log('message', msg);
    
    $('#chat-content').append([
    	"<li>",
    		"<h3 class='name'>" + msg.nickName + "</h3>",
    		"<p class='message'>" + msg.body + "</p>",
    	"</li>"
    ]);
  });
});