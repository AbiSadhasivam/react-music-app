export const CREATE_PLAYLIST = "CREATE_PLAYLIST" ;
export const ADD_SONG_TO_PLAYLIST = "ADD_SONG_TO_PLAYLIST";

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
