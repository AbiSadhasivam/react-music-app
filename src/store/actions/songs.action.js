export const ADD_SONG = 'ADD_SONG';
export const ADD_ALBUM = 'ADD_ALBUM';

export const createSongList = data => {
  return {
    type: ADD_SONG,
    data
  }
}
export const createAlbumList = data => {
  return {
    type: ADD_ALBUM,
    data
  }
}