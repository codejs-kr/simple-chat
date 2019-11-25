/**
 * 소켓 컨트롤러
 * @REF - https://github.com/socketio/socket.io
 *
 * io - 소켓 서버
 * socket - 클라이언트와 연결된 하나의 소켓
 * io.sockets.in(roomId).emit() - 타겟 룸 소켓들 전체에 메시지 전달
 * io.sockets.manager.rooms - 현재 생성되어 있는 모든 room 목록을 리턴
 *
 * [Send methods]
 * io.emit('message', data); 							 							// 자신 포함 전체룸 유저들에게 전송
 * io.sockets.in(roomId).emit('message', data); 				// 자신 포함 해당룸 유저들에게 전송
 * socket.broadcast.emit('message', data); 							// 자신 제외 전체에 메시지 전송
 * socket.broadcast.to(roomId).emit('message', data);  	// 자신 제외 해당룸 유저들에게 전송
 */
module.exports = (http) => {
  const io = require('socket.io')(http);
  let attendees = {}; // 서버에 연결된 사용자, 소켓정보를 담아 관리합니다.

  /**
   * 참여자 핸들링
   * @param {*} userInfo
   * @param {*} roomId
   * @param {*} socket
   */
  function onJoin(userInfo, roomId, socket) {
    socket.join(roomId); // 소켓을 특정 room에 binding합니다.

    // 유저 목록
    attendees[userInfo.id] = {
      ...userInfo,
      socketId: socket.id,
    };

    // 참여자 목록을 함께 내려주기 위해서 참여 당사자에게도 전달한다.
    io.sockets.in(roomId).emit('join', {
      userInfo,
      attendees: attendees,
    });
  }

  /**
   * 이탈자 핸들링
   * @param {*} userInfo
   * @param {*} roomId
   * @param {*} socket
   */
  function onLeave(userInfo, roomId, socket) {
    socket.leave(roomId);
    socket.broadcast.to(roomId).emit('leave', {
      userInfo,
    });

    delete attendees[userInfo.id];
  }

  /**
   * 메시지 핸들링
   * @param {*} data
   * @param {*} roomId
   * @param {*} socket
   */
  function onMessage(data, roomId, socket) {
    // 룸 전체전송
    if (data.to === 'all') {
      socket.broadcast.to(roomId).emit('message', data); // 자신 제외 룸안의 유저
    } else {
      // 귓속말
      const targetSocketId = attendees[data.to].socketId;
      if (targetSocketId) {
        //io.to(targetSocketId).emit('message', data);
        io.sockets.connected[targetSocketId].emit('message', data);
      }
    }
  }

  /**
   * 소켓 커넥션 인스턴스 이벤트 바인딩
   */
  function bindSocketConnectionEvent() {
    io.on('connection', (socket) => {
      console.log('io connection', socket.id);
      let instanceRoomId = null;

      // 룸접속
      socket.on('join', (roomId, userInfo) => {
        instanceRoomId = roomId;
        onJoin(userInfo, roomId, socket);
        console.log('join', instanceRoomId, Object.keys(attendees).length);
      });

      // 룸퇴장
      socket.on('leave', (roomId, userInfo) => {
        instanceRoomId = null;
        onLeave(userInfo, roomId, socket);
        console.log('leave', roomId, Object.keys(attendees).length);
      });

      // 메시징 (userMessage, typing, webrtc signaling, etc)
      // Ojbect의 key값으로 메시지 type을 구분하여 중복형태의 메시지 전송 리스너 생성을 방지한다.
      socket.on('message', (data) => {
        console.log('message', data, instanceRoomId);

        if (!instanceRoomId) {
          return false;
        }

        onMessage(data, instanceRoomId, socket);
      });

      // 소켓 연결해제
      socket.on('disconnect', () => {
        console.log('a user disconnected', socket.id, instanceRoomId);

        for (let key in attendees) {
          if (attendees[key].socketId === socket.id) {
            const userInfo = attendees[key];
            onLeave(userInfo, instanceRoomId, socket);

            break;
          }
        }
      });
    });
  }

  function initialize() {
    bindSocketConnectionEvent();
  }
  initialize();
};
