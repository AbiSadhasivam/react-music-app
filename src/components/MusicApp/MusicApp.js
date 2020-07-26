import React, { useState, useEffect } from 'react';
import { apiEndpoints } from '../../constants/apiEndpoints';
import { apiFetch } from '../../services/apiService/apiService';
import { useDispatch, useSelector } from 'react-redux';
import * as storeAction from '../../store/actions/action';
import Header from '../Header/Header';
import Body from '../Body/Body';
const MusicApp = () => {
  const dispatch = useDispatch();

  const fetMusicLibrary = () => {
    apiFetch(apiEndpoints.albums, 'GET').then(
      (data) => {
        dispatch(storeAction.createAlbumList(data));
        apiFetch(apiEndpoints.songs, 'GET').then(
          (data) => {
            dispatch(storeAction.createSongList(data));
          },
          (err) => {
            console.log(err);
            // TODO : Show loader and show error notification
          }
        );
      },
      (err) => {
        console.log(err);
        // TODO : Show loader and show error notification
      }
    );
  };

  useEffect(() => {
    fetMusicLibrary();
  }, []);

  return (
    <div>
      <Header></Header>
      <Body></Body>
    </div>
  );
};

export default MusicApp;
