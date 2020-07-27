import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button } from 'reactstrap';
import * as storeAction from '../../../store/actions/action';

import './AddPlayList.css';
const AddPlayList = (props) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const playLists = useSelector((state) => state.playList);
  const createPlayList = () => {
    let playListNames = Object.keys(playLists);
    if (playListNames.indexOf(name) !== -1) {
      setError('A Playlist of same name is already available!!!');
      return;
    }
    dispatch(storeAction.createPlaylist(name));
    props.modalHandler();
  };

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  return (
    <div className='add-playlist-ctr'>
      <div className='add-playlist-hdr'>Create a New PlayList</div>
      <div className='add-playlist-body'>
        <Input
          type='text'
          id='add-playlist-input'
          placeholder='Enter your playlist name'
          onChange={handleNameChange}
        />
        {error.length !== 0 && <span className='error'>{error}</span>}
        <Button
          type='submit'
          id='create-playlist'
          disabled={name.length === 0}
          onClick={createPlayList}
        >
          Create
        </Button>
      </div>
      <hr></hr>
      <div className='add-playlist-footer' onClick={props.modalHandler}>
        <span>Cancel</span>
      </div>
    </div>
  );
};

export default AddPlayList;
