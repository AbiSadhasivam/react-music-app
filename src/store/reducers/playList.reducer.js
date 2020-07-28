// import PropTypes from 'prop-types';
//TODO : Define proptypes
import {
  CREATE_PLAYLIST,
  ADD_SONG_TO_PLAYLIST,
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
      let isSongAvailable = playList.songList.filter((song) => {
        return song.id === action.data.song.id;
      });
      if (isSongAvailable.length > 0) {
        return {
          ...state,
        };
      }
      playList.songList.push(action.data.song);
      state[action.data.name] = playList;
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default playListReducer;
