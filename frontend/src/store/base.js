import produce from 'immer';
import utils from 'modules/utils';

export default {
  // initial state
  state: {
    overlay: false,
    myInfo: {
      id: utils.getUUID(),
      nickname: 'JS',
      profileImage: 'http://img.lifestyler.co.kr/uploads/program/1/1765/menu/2/html/f131755988183457049(0).jpg',
      participatingTime: 1572010340059,
    },
  },
  reducers: {
    // handle state changes with pure functions
    updateOverlayState(state, payload) {
      return produce(state, (draft) => {
        draft.overlay = payload;
      });
    },
    updateMyInfo(state, payload) {
      return produce(state, (draft) => {
        draft.myInfo = {
          ...draft.myInfo,
          ...payload,
        };
      });
    },
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
  }),
};
