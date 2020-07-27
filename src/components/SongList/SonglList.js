import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import './SongList.css';
import Table from '../Table/Table';

const SongList = () => {
  const columns = [
    {
      Header: '',
      Cell: (row) => {
        return (
          <div>
            <img
              className='thumbnail-img'
              alt='song-img'
              src={row.row.original.thumbnailUrl}
            />
          </div>
        );
      },
      accessor: 'thumbnailUrl',
    },
    {
      Header: 'Title',
      sortType: 'alphanumeric',
      accessor: 'title',
    },
    {
      Header: 'Album',
      sortType: 'alphanumeric',
      accessor: 'albumTitle',
    },
    {
      Header: 'Artist',
      sortType: 'alphanumeric',
      accessor: 'artist',
    },
    {
      Header: 'Duration',
      sortType: 'numeric',
      accessor: 'duration',
    },
  ];

  const songAndAlbumSelector = () =>
    createSelector(
      (state) => state.songs.songList,
      (state) => state.songs.albumList,
      (state) => state.playList,
      (songList, albumList) => {
        songList.forEach((song) => {
          albumList.forEach((album) => {
            if (album.id === song.albumId) {
              song['albumTitle'] = album.title;
              song['artist'] = 'Artist';
              song['duration'] = (Math.random() * 10).toFixed(2);
            }
          });
        });
        return songList;
      }
    );

  const selectSongAndAlbum = useMemo(songAndAlbumSelector, []);
  const songAndAlbumList = useSelector((state) =>
    selectSongAndAlbum(state, state)
  );
  return (
    <div className='container'>
      <div className='playlist-header'>Listen to your favourite music!</div>

      <hr></hr>
      <div className='songlist-wrapper'>
        <Table
          columns={columns}
          data={songAndAlbumList}
          isSelectionRqd={false}
        ></Table>
      </div>
    </div>
  );
};

export default SongList;
