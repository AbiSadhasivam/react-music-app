import { combineReducers } from 'redux';
import songsReducer from './songs.reducer';
import playListReducer from './playList.reducer';

export default combineReducers({
  songs: songsReducer,
  playList: playListReducer,
});
