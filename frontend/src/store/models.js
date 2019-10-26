import produce from 'immer';

const delay = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

export const chat = {
  // initial state
  state: {
    count: 0,
    nickname: '짱구발가락',
    roomName: '공개채팅방',
    myInfo: {
      id: 'user1',
      nickname: '짱구',
      profileImage:
        'https://lh3.googleusercontent.com/-NWx_E8i2cEE/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcyW9Y7YloaN8IvNg58Y_ewM2DRKw.CMID/s32-c/photo.jpg',
      participatingTime: 1572010340059,
    },
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
    increment(state, payload) {
      return produce(state, (draft) => {
        draft.count = state.count + payload;
      });
    },
    add(state, payload) {
      return produce(state, (draft) => {
        draft.messages.push(payload);
      });
    },
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async incrementAsync(payload, rootState) {
      console.log('incrementAsync', payload, rootState);
      await delay(1000);
      dispatch.chat.increment(payload);
    },

    async send(payload, rootState) {
      console.log('send', payload, rootState);
      const { chat } = rootState;
      await delay(100);

      // socket send
      dispatch.chat.add({
        ...chat.myInfo,
        message: payload,
      });
    },

    async leave(payload, rootState) {
      console.log('leave', payload, rootState);
      await delay(1000);
      // socket leave
    },
  }),
};
