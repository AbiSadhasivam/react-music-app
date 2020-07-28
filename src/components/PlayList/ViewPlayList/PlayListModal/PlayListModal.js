import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormGroup, Input, Label } from 'reactstrap';
import { createSelector } from 'reselect';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Table from '../../../Table/Table';
import * as storeAction from '../../../../store/actions/action';
import './PlayListModal.css';
const PlayListModal = (props) => {
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
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
  const [filteredData, setFilteredData] = useState(songAndAlbumList);

  const filterChanged = (evt) => {
    let filterData = evt.target.value;
    let data = songAndAlbumList.filter((song) => {
      return song.title.includes(filterData);
    });
    setFilteredData(data);
  };

  const addSongs = (selectedSongs) => {
    selectedSongs.forEach((song) => {
      dispatch(storeAction.addSongToPlaylist({ name: props.name, song: song }));
    });
    toggle();
    return;
  };

  return (
    <div>
      <Button className='primary' onClick={toggle}>
        Add Songs
      </Button>
      <Modal isOpen={modal} toggle={toggle} className='modal-title'>
        <ModalHeader>Add Songs</ModalHeader>
        <ModalBody>
          <div>
            <FormGroup className='range-group'>
              <div className='group'>
                <Label className='inputLabel' for='range-start'>
                  Filter Songs
                </Label>
                <Input
                  type='text'
                  name='filter-song'
                  id='filter-song'
                  className='input-filter'
                  onChange={filterChanged}
                />
              </div>
            </FormGroup>
          </div>
          <Table
            columns={columns}
            data={filteredData}
            selectHandler={addSongs}
          />
        </ModalBody>
        <ModalFooter>
          <Button color='secondary' onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default PlayListModal;
