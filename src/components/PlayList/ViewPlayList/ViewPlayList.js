import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button } from 'reactstrap';

import './ViewPlayList.css';
const ViewPlayList = (props) => {
  return (
    <div className='container'>
      <div className='playlist-hdr'>
        <div className='img-holder'>
          <i class='fa fa-music' aria-hidden='true'></i>
        </div>
        <div className='title-ctr'>
          <div className='title'>{props.name}</div>
          <div className='sub-title'>Created At : {props.createdAt.toDateString()}</div>
          <div className='sub-title'>{props.songList.length} Songs</div>
        </div>
      </div>
      <div class='action-ctr'>
        <Button className='primary'> Add Songs</Button>
        <Button className='primary' disabled={props.songList.length==0}> Shuffle</Button>
      </div>
      <hr></hr>
      <div>{props.name}</div>
    </div>
  );
};
export default ViewPlayList;
