import produce from 'immer';
import utils from 'modules/utils';

export default {
  // initial state
  state: {
    overlay: false,
    myInfo: {
      id: utils.getUUID(),
      nickname: 'JS',
      profileImage:
        'https://cdn0.iconfinder.com/data/icons/profession-vol-1/32/avatar_superman_DC_comics_superhero_character_inspiression_-128.png',
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
