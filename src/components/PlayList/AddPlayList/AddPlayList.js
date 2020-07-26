import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button } from 'reactstrap';
import * as storeAction from '../../../store/actions/action';

import './AddPlayList.css';
const AddPlayList = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState();

  const createPlayList = () => {
    // TODO: Check if the playlist of the name is already available
    //TODO: ADD validation for create
    dispatch(storeAction.createPlaylist(name));
  };

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  return (
    <div className='add-playlist-ctr'>
      <div className='add-playlist-hdr'>Create a New PlayList</div>
      <div>
        <Input
          type='text'
          id='add-playlist-input'
          placeholder='Enter your playlist name'
          onChange={handleNameChange}
        />
        <Button type='submit' id='create-playlist' onClick={createPlayList}>
          Create
        </Button>
      </div>
      <hr></hr>
      <div className='add-playlist-footer'>
        <span>Cancel</span>
      </div>
    </div>
  );
};

export default AddPlayList;
