export const CREATE_PLAYLIST = CREATE_PLAYLIST 
export const ADD_SONG_TO_PLAYLIST = ADD_SONG_TO_PLAYLIST
export const DELETE_SONG_FROM_PLAYLIST = DELETE_SONG_FROM_PLAYLIST 
export const DELETE_PLAYLIST = DELETE_PLAYLIST 
export const EDIT_PLAYLIST = EDIT_PLAYLIST 

export const createPlaylist = data => {
  return {
    type: CREATE_PLAYLIST,
    data
  };
};
export const addSongToPlaylist = data => {
  return {
    type: ADD_SONG_TO_PLAYLIST,
    data
  };
};
export const deletePlaylist = data => {
  return {
    type: DELETE_PLAYLIST,
    data
  };
};
export const deleteSong = data => {
  return {
    type: DELETE_SONG_FROM_PLAYLIST,
    data
  };
};
export const editPlaylist = data => {
  return {
    type: EDIT_PLAYLIST,
    data
  };
};
