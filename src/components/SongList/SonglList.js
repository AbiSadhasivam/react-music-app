import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import './SongList.css';
import Table from '../Table/Table';

const SongList = () => {
  let PER_PAGE = 10;

  const songList = useSelector((state) => state.songs.songList);
  // const [currentPage, setCurrentPage] = useState(0);
  // const [currentSongList, setCurrentSongList] = useState([]);

  // let handlePageChange = (page) => {
  //   setCurrentPage(page);
  //   setCurrentSongList(songList.slice((page - 1) * PER_PAGE, page * PER_PAGE));
  // };
  // useEffect(() => {
  //   setCurrentSongList(songList.slice(0, PER_PAGE));
  // }, [songList]);
  const columns = [
    {
      Header: '',
      Cell: (row) => {
        console.log(row);
        return (
          <div>
            <img className='thumbnail-img' src={row.row.original.thumbnailUrl} />
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
      <Table columns={columns} data={songAndAlbumList} isSelectionRqd={false}></Table>
    </div>
  );
};

export default SongList;
/*<Pagination
        activePage={currentPage}
        pageRangeDisplayed={PER_PAGE}
        totalItemsCount={songList.length}
        onChange={handlePageChange}
        hideDisabled={false}
        itemClass='page-item'
        linkClass='page-link'
      />
      <div className='song-container'>
        {currentSongList &&
          currentSongList.map((song) => <Song key={song.id} {...song}></Song>)}
      </div>
      */
