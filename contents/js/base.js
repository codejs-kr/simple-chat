/*!
 *
 * Simple Chatting - base.js
 * @author codeJS (codejs.co.kr / dodortus@gmail.com)
 *
 */
$(function() {
  var socket = io();
  var $msgInput = $('#message');
  
  $('form').submit(function() {
    socket.emit('message', $msgInput.val());
    $msgInput.val('');
    return false;
  });
  
  socket.on('message', function(msg) {
    console.log('message', msg);
    $('#chat-content').append($('<li/>').text(msg));
  });
});