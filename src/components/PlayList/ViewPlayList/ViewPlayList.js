import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import PlayListModal from './PlayListModal/PlayListModal';
import Table from '../../Table/Table';

import './ViewPlayList.css';
const ViewPlayList = (props) => {
  const [modal, setModal] = useState(false);
  const [songList, setSongList] = useState(props.songList);
  const columns = [
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
    {
      Header: 'Added at',
      sortType: 'numeric',
      accessor: 'addedAt',
    },
  ];

  const shuffleSongList = () => {
    let sortedList = props.songList(0).sort(() => Math.random() - 0.5);
    setSongList(sortedList);
  };
  useEffect(() => {
    setSongList(props.songList);
  }, [props.songList]);

  return (
    <div className='container'>
      <div className='playlist-hdr'>
        <div className='img-holder'>
          <i className='fa fa-music' aria-hidden='true'></i>
        </div>
        <div className='title-ctr'>
          <div className='title'>{props.name}</div>
          <div className='sub-title'>
            Created At : {props.createdAt.toDateString()}
          </div>
          <div className='sub-title'>{songList.length} Songs</div>
        </div>
      </div>
      {songList.length > 0 && (
        <div className='action-ctr'>
          <PlayListModal
            buttonLabel='Add Songs'
            name={props.name}
          ></PlayListModal>
          <Button
            className='primary'
            disabled={songList.length === 0}
            onClick={shuffleSongList}
          >
            Shuffle
          </Button>
        </div>
      )}
      <hr></hr>
      {songList.length > 0 && (
        <Table
          modal={modal}
          columns={columns}
          data={songList}
          className='cell'
          isSelectionRqd={false}
        />
      )}
      {songList.length === 0 && (
        <div className='add-song-placeholder'>
          <span className='title'>Looks very quiet here!</span>
          <span className='sub-title'>Lets add some music!</span>
          <PlayListModal
            buttonLabel='Add Songs'
            name={props.name}
          ></PlayListModal>
        </div>
      )}
    </div>
  );
};
export default ViewPlayList;
