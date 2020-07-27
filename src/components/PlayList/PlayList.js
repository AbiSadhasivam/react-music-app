import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AddPlayList from './AddPlayList/AddPlayList';
import ViewPlayList from './ViewPlayList/ViewPlayList';
import Song from '../Song/Song';
import './PlayList.css';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';

const PlayList = () => {
  const playLists = useSelector((state) => state.playList);
  const [selectedPlayList, setSelectedPlayList] = useState({});
  const [showSelectedPlayList, setShowSelectedPlayList] = useState(false);
  const [modal, showModal] = useState(false);
  const showMusicList = (evt) => {
    let { name } = evt.target.dataset;
    setSelectedPlayList(playLists[name]);
    setShowSelectedPlayList(true);
  };

  const hidePlayListView = () => {
    setShowSelectedPlayList(false);
  };

  const showAddPlayListModal = () => {
    showModal(!modal);
  };

  return (
    <div>
      <div className='add-playlist-hldr'>
        {Object.keys(playLists).length <= 0 && <AddPlayList></AddPlayList>}
      </div>
      {!showSelectedPlayList && Object.keys(playLists).length > 0 && (
        <div>
          <div className='playlist-header'>
            Listen to your Playlists
            <Button className='primary' onClick={showAddPlayListModal}>
              Add PlayList
            </Button>
          </div>

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
        <span className='container back' onClick={hidePlayListView}>
          <i className='fa fa-chevron-circle-left' aria-hidden='true'></i>
          <span className='sub-title pointer'>View All PlayList</span>
        </span>
      )}
      {showSelectedPlayList && (
        <ViewPlayList {...selectedPlayList}></ViewPlayList>
      )}
      <div>
        <Modal isOpen={modal} toggle={showAddPlayListModal}>
          <ModalHeader toggle={showAddPlayListModal}>Modal title</ModalHeader>
          <ModalBody>
            <AddPlayList modalHandler={showAddPlayListModal}></AddPlayList>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
};
export default PlayList;
