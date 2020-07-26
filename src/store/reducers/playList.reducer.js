import PropTypes from 'prop-types';
import {
  CREATE_PLAYLIST,
  ADD_SONG_TO_PLAYLIST,
  DELETE_PLAYLIST,
  DELETE_SONG_FROM_PLAYLIST,
  EDIT_PLAYLIST,
} from '../actions/playlist.action';
let initialState = {
  playList: [],
};

const playListReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PLAYLIST:
      return {};
    case ADD_SONG_TO_PLAYLIST:
      return {};
    case DELETE_SONG_FROM_PLAYLIST:
      return {};
    case DELETE_PLAYLIST:
      return {};
    case EDIT_PLAYLIST:
      return {};
    default:
      return state;
  }
};
export default playListReducer;
