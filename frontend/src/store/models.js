import produce from 'immer';

const delay = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

export const chat = {
  // initial state
  state: {
    count: 0,
    nickname: '짱구발가락',
    roomName: '공개채팅방',
    myInfo: {
      id: 'adfdffd-ddfdfdf-dfdfddf',
      nickname: '짱구',
      profileImage: 'path',
      participatingTime: 1572010340059,
    },
    users: [
      {
        id: 'adfdffd-ddfdfdf-dfdfddf',
        nickname: '짱구',
        profileImage: 'path',
        participatingTime: 1572010340059,
      },
      {
        id: 'adfdffd-ddfdfdf-dfdfddf',
        nickname: '짱구2',
        profileImage: 'path',
        participatingTime: 1572010340059,
      },
    ],
    messages: [
      {
        id: 'adfdffd-ddfdfdf-dfdfddf',
        nickname: '짱구', // users에서 탐색하여 정보를 표시하면 방을 나간 사람 정보 노출이 안되기때문에 고민
        profileImage: 'path',
        message: '안녕하세요',
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
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async incrementAsync(payload, rootState) {
      console.log('incrementAsync', payload, rootState);
      await delay(1000);
      dispatch.chat.increment(payload);
    },

    async leave(payload, rootState) {
      console.log('leave', payload, rootState);
      await delay(1000);
      // socket leave
    },
  }),
};
