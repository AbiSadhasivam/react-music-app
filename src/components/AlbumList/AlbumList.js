import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './AlbumList.css';
import Song from '../Song/Song';
import Pagination from 'react-js-pagination';

const AlbumList = () => {
  let PER_PAGE = 10;

  const albumList = useSelector((state) => state.songs.albumList);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentalbumList, setCurrentalbumList] = useState([]);

  let handlePageChange = (page) => {
    setCurrentPage(page);
    setCurrentalbumList(albumList.slice((page - 1) * PER_PAGE, page * PER_PAGE));
  };
  useEffect(() => {
    setCurrentalbumList(albumList.slice(0, PER_PAGE));
  }, [albumList]);
  return (
    <div className='container'>
      <Pagination
        activePage={currentPage}
        pageRangeDisplayed={PER_PAGE}
        totalItemsCount={albumList.length}
        onChange={handlePageChange}
        hideDisabled={false}
        itemClass='page-item'
        linkClass='page-link'
      />
      <div className='song-container'>
        {currentalbumList && currentalbumList.map((album) => <Song key={album.id} {...album}></Song>)}
      </div>
    </div>
  );
};

export default AlbumList;
