import produce from 'immer';
import utils from 'modules/utils';
import socket from 'modules/socket';

// socket join
// socket leave
// socket message, typing
// socket disconnect

const initialState = {
  name: '오픈채팅방',
  isActiveUserList: false,
  users: [
    {
      id: 'user1',
      nickname: '짱구',
      profileImage: 'http://img.lifestyler.co.kr/uploads/program/1/1765/menu/2/html/f131755988183457049(0).jpg',
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
      type: 'chat',
      id: 'user1',
      nickname: '짱구', // users에서 탐색하여 정보를 표시하면 방을 나간 사람 정보 노출이 안되기때문에 고민
      profileImage: 'http://img.lifestyler.co.kr/uploads/program/1/1765/menu/2/html/f131755988183457049(0).jpg',
      message: '안녕하세요',
      time: 1572010340059,
    },
    {
      type: 'chat',
      id: 'user2',
      nickname: '짱구엄마', // users에서 탐색하여 정보를 표시하면 방을 나간 사람 정보 노출이 안되기때문에 고민
      profileImage: 'http://img.lifestyler.co.kr/uploads/program/1/1661/menu/2/html/f131611716040131952(0).jpg',
      message: 'hi~',
      time: 1572010340059,
    },
    {
      type: 'chat',
      id: 'user1',
      nickname: '짱구', // users에서 탐색하여 정보를 표시하면 방을 나간 사람 정보 노출이 안되기때문에 고민
      profileImage: 'http://img.lifestyler.co.kr/uploads/program/1/1765/menu/2/html/f131755988183457049(0).jpg',
      message: '안녕하세요',
      time: 1572010340059,
    },
    {
      type: 'chat',
      id: 'user2',
      nickname: '짱구엄마', // users에서 탐색하여 정보를 표시하면 방을 나간 사람 정보 노출이 안되기때문에 고민
      profileImage: 'http://img.lifestyler.co.kr/uploads/program/1/1661/menu/2/html/f131611716040131952(0).jpg',
      message: 'hi~',
      time: 1572010340059,
    },
    {
      type: 'chat',
      id: 'user1',
      nickname: '짱구', // users에서 탐색하여 정보를 표시하면 방을 나간 사람 정보 노출이 안되기때문에 고민
      profileImage: 'http://img.lifestyler.co.kr/uploads/program/1/1765/menu/2/html/f131755988183457049(0).jpg',
      message: '안녕하세요',
      time: 1572010340059,
    },
    {
      type: 'chat',
      id: 'user2',
      nickname: '짱구엄마', // users에서 탐색하여 정보를 표시하면 방을 나간 사람 정보 노출이 안되기때문에 고민
      profileImage: 'http://img.lifestyler.co.kr/uploads/program/1/1661/menu/2/html/f131611716040131952(0).jpg',
      message: 'hi~',
      time: 1572010340059,
    },
  ],
};

export default {
  // initial state
  state: initialState,
  reducers: {
    // handle state changes with pure functions
    updateRoomName(state, payload) {
      return produce(state, (draft) => {
        draft.name = payload;
      });
    },
    addUser(state, payload) {
      return produce(state, (draft) => {
        draft.users.push(payload);
      });
    },
    removeUser(state, payload) {
      return produce(state, (draft) => {
        draft.users = draft.users.filter((user) => {
          // console.log('removeUser', user.id, payload.id, user.id === payload.id);
          return user.id !== payload.id;
        });
      });
    },
    addUserMessage(state, payload) {
      return produce(state, (draft) => {
        draft.messages.push(payload.userMessage);
      });
    },
    addSystemMessage(state, payload) {
      return produce(state, (draft) => {
        draft.messages.push({
          type: 'system',
          ...payload,
        });
      });
    },
    resetState() {
      return initialState;
    },
    updateActiveUserList(state, payload) {
      return produce(state, (draft) => {
        draft.isActiveUserList = payload;
      });
    },
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions

    /**
     * 메시지 전송처리
     * @param {*} payload
     * @param {*} rootState
     */
    async send(payload, rootState) {
      const { base } = rootState;
      const { addUserMessage } = dispatch.room;
      const data = {
        to: 'all',
        userMessage: {
          ...base.myInfo,
          type: 'chat',
          message: payload,
        },
      };

      // send message
      await socket.emit('message', data);

      // add message
      addUserMessage(data);
    },

    /**
     * 나가기 처리
     * @param {*} payload
     * @param {*} rootState
     */
    async leave(payload, rootState) {
      console.log('leave', payload, rootState);
      const { resetState } = dispatch.room;
      const { roomName, myInfo } = payload;

      socket.emit('leave', roomName, myInfo);
      await utils.delay(10);
      resetState();
    },

    /**
     * 참여자 목록 노출 상태 처리
     * @param {*} payload
     * @param {*} rootState
     */
    toggleActiveUserList(payload, rootState) {
      const { updateOverlayState } = dispatch.base;
      const { updateActiveUserList } = dispatch.room;
      const { room } = rootState;
      let isActive = !room.isActiveUserList;

      if (typeof payload === 'boolean') {
        isActive = payload;
      }

      updateOverlayState(isActive);
      updateActiveUserList(isActive);
    },
  }),
};
