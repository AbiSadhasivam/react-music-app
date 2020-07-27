// import PropTypes from 'prop-types';
import {
  CREATE_PLAYLIST,
  ADD_SONG_TO_PLAYLIST,
  DELETE_PLAYLIST,
  DELETE_SONG_FROM_PLAYLIST,
  EDIT_PLAYLIST,
} from '../actions/playlist.action';
let initialState = {};

const playListReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PLAYLIST:
      let playlist = {};
      playlist[action.data] = {
        name: action.data,
        songList: [],
        createdAt: new Date(),
      };
      return {
        ...state,
        ...playlist,
      };
    case ADD_SONG_TO_PLAYLIST:
      let playList = state[action.data.name];
      playList.songList.push(action.data.song);
      state[action.data.name] = playList;
      return {
        ...state,
      };
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
