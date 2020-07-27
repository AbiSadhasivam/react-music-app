import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './SongList.css';
import Song from '../Song/Song';
import Pagination from 'react-js-pagination';

const SongList = () => {
  let PER_PAGE = 10;

  const songList = useSelector((state) => state.songs.songList);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentSongList, setCurrentSongList] = useState([]);

  let handlePageChange = (page) => {
    setCurrentPage(page);
    setCurrentSongList(songList.slice((page - 1) * PER_PAGE, page * PER_PAGE));
  };
  useEffect(() => {
    setCurrentSongList(songList.slice(0, PER_PAGE));
  }, [songList]);
  return (
    <div className='container'>
      <div className='playlist-header'>
        Listen to your favourite music!
      </div>

      <hr></hr>
      <Pagination
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
    </div>
  );
};

export default SongList;
