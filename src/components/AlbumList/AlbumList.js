//Parent Component to list the Albums
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './AlbumList.css';
import Song from '../Song/Song';
import Table from '../Table/Table';

import Pagination from 'react-js-pagination';

const AlbumList = () => {
  let PER_PAGE = 10;

  const albumList = useSelector((state) => state.songs.albumList);
  const songList = useSelector((state) => state.songs.songList);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentalbumList, setCurrentalbumList] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState({});
  const [showSelectedAlbum, setShowSelectedAlbum] = useState(false);
  const [filteredSongs, setFilteredSongs] = useState([]);
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setCurrentalbumList(
      albumList.slice((page - 1) * PER_PAGE, page * PER_PAGE)
    );
  };
  /**
   * View the list of songs for the selected album
   * @param  {} evt
   * 
   */
  const viewSelectedAlbum = (evt) => {
    let { name } = evt.target.dataset;
    setSelectedAlbum(
      albumList.filter((album) => {
        return album.title === name;
      })[0]
    );
    setShowSelectedAlbum(true);
  };
  /**
   * Hide the song view and shows the list of albums
   */
  const hideSongsView = () => {
    setShowSelectedAlbum(false);
    setSelectedAlbum({});
  };

  useEffect(() => {
    setCurrentalbumList(albumList.slice(0, PER_PAGE));
  }, [albumList]);

  useEffect(() => {
    setFilteredSongs(
      songList.filter((song) => {
        return song.albumId === selectedAlbum.id;
      })
    );
  }, [selectedAlbum]);

  return (
    <div className='container'>
      <div className='playlist-header'>Explore the trending albums!</div>
      <hr />
      {!showSelectedAlbum && (
        <div>
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
            {currentalbumList &&
              currentalbumList.map((album) => (
                <Song
                  key={album.id}
                  {...album}
                  clickHandler={viewSelectedAlbum}
                ></Song>
              ))}
          </div>
        </div>
      )}
      {showSelectedAlbum && (
        <div className='album-song-list-ctr'>
          <span className='container back' onClick={hideSongsView}>
            <i className='fa fa-chevron-circle-left' aria-hidden='true'></i>
            <span className='sub-title pointer'>View All Albums</span>
          </span>
          <Table
            columns={columns}
            data={filteredSongs}
            isSelectionRqd={false}
          />
        </div>
      )}
    </div>
  );
};

export default AlbumList;
