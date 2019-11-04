import produce from 'immer';
import utils from 'helpers/utils';
import io from 'socket.io-client';

const socket = io('http://localhost:9090');
socket.emit('join', 123123, '짱구');

export default {
  // initial state
  state: {
    roomName: '공개채팅방',
    users: [
      {
        id: 'user1',
        nickname: '짱구',
        profileImage:
          'https://lh3.googleusercontent.com/-NWx_E8i2cEE/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcyW9Y7YloaN8IvNg58Y_ewM2DRKw.CMID/s32-c/photo.jpg',
        participatingTime: 1572010340059,
      },
      {
        id: 'user2',
        nickname: '짱구엄마',
        profileImage: 'http://img.lifestyler.co.kr/uploads/program/1/1661/menu/2/html/f131611716040131952(0).jpg',
        participatingTime: 1572010340059,
      },
    ],
    messages: [
      {
        id: 'user1',
        nickname: '짱구', // users에서 탐색하여 정보를 표시하면 방을 나간 사람 정보 노출이 안되기때문에 고민
        profileImage:
          'https://lh3.googleusercontent.com/-NWx_E8i2cEE/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcyW9Y7YloaN8IvNg58Y_ewM2DRKw.CMID/s32-c/photo.jpg',
        message: '안녕하세요',
        time: 1572010340059,
      },
      {
        id: 'user2',
        nickname: '짱구엄마', // users에서 탐색하여 정보를 표시하면 방을 나간 사람 정보 노출이 안되기때문에 고민
        profileImage: 'http://img.lifestyler.co.kr/uploads/program/1/1661/menu/2/html/f131611716040131952(0).jpg',
        message: '안녕하세요1',
        time: 1572010340059,
      },
      {
        id: 'user2',
        nickname: '짱구엄마', // users에서 탐색하여 정보를 표시하면 방을 나간 사람 정보 노출이 안되기때문에 고민
        profileImage: 'http://img.lifestyler.co.kr/uploads/program/1/1661/menu/2/html/f131611716040131952(0).jpg',
        message: '안녕하세요2',
        time: 1572010340059,
      },
    ],
  },
  reducers: {
    // handle state changes with pure functions
    updateRoomName(state, payload) {
      return produce(state, (draft) => {
        draft.roomName = payload;
      });
    },

    addUser(state, payload) {
      return produce(state, (draft) => {
        draft.users.push(payload);
      });
    },

    removeUser(state, payload) {
      return produce(state, (draft) => {
        draft.users.push(payload);
      });
    },

    addMessage(state, payload) {
      return produce(state, (draft) => {
        draft.messages.push(payload);
      });
    },
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async send(payload, rootState) {
      console.log('send', payload, rootState);
      const { base } = rootState;
      const { addMessage } = dispatch.room;
      await utils.delay(100);

      // socket send
      addMessage({
        ...base.myInfo,
        message: payload,
      });
    },

    async leave(payload, rootState) {
      console.log('leave', payload, rootState);
      await utils.delay(1000);
      // socket leave
    },
  }),
};
