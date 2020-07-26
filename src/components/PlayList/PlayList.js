import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AddPlayList from './AddPlayList/AddPlayList';
import ViewPlayList from './ViewPlayList/ViewPlayList';
import Song from '../Song/Song';
import './PlayList.css';

const PlayList = () => {
  const playLists = useSelector((state) => state.playList);
  const [selectedPlayList, setSelectedPlayList] = useState({});
  const [showSelectedPlayList, setShowSelectedPlayList] = useState(false);
  const showMusicList = (evt) => {
    let { name } = evt.target.dataset;
    setSelectedPlayList(playLists[name]);
    setShowSelectedPlayList(true);
  };

  return (
    <div>
      <div className='add-playlist-hldr'>
        {Object.keys(playLists).length <= 0 && <AddPlayList></AddPlayList>}
      </div>
      {!showSelectedPlayList && Object.keys(playLists).length > 0 && (
        <div>
          <div className='playlist-header'>Listen to your Playlists</div>
          <hr></hr>
          <div className='playlist-container'>
            {Object.values(playLists).map((playList, id) => (
              <Song
                title={playList.name}
                key={id}
                clickHandler={showMusicList}
              ></Song>
            ))}
          </div>
        </div>
      )}
      {showSelectedPlayList && (
        <ViewPlayList {...selectedPlayList}></ViewPlayList>
      )}
    </div>
  );
};
export default PlayList;
