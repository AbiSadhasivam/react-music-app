// import PropTypes from 'prop-types';
// TODO : Define proptypes
import { ADD_SONG, ADD_ALBUM } from '../actions/songs.action';

let initialState = {
  songList: [],
  albumList: [],
};

const songsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SONG:
      return {
        ...state,
        songList :action.data
      };
    case ADD_ALBUM:
      return {
        ...state,
        albumList: action.data
      };
    default:
      return state;
  }
};
export default songsReducer;
