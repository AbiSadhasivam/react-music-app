import React, { useEffect, useState } from 'react';
import { apiEndpoints } from '../../constants/apiEndpoints';
import { apiFetch } from '../../services/apiService/apiService';
import { useDispatch } from 'react-redux';
import * as storeAction from '../../store/actions/action';
import Header from '../Header/Header';
import Body from '../Body/Body';
import Loader from '../Loader/Loader';
const MusicApp = () => {
  const dispatch = useDispatch();
  const [showLoader, setLoaderVisiblity] = useState(false);

  // Visiblity

  let toggleLoader = (isVisible) => {
    setLoaderVisiblity(isVisible);
  };
  const fetMusicLibrary = () => {
    toggleLoader(true);
    apiFetch(apiEndpoints.albums, 'GET').then(
      (data) => {
        dispatch(storeAction.createAlbumList(data));
        apiFetch(apiEndpoints.songs, 'GET').then(
          (data) => {
            dispatch(storeAction.createSongList(data));
            toggleLoader(false);
          },
          (err) => {
            console.log(err);
            toggleLoader(false);
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
      {showLoader && <Loader></Loader>}
      <Header></Header>
      <Body></Body>
    </div>
  );
};

export default MusicApp;
