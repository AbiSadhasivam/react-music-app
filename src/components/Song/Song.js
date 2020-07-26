import React, { useState } from 'react';
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import './Song.css';
import 'font-awesome/css/font-awesome.min.css';
const Song = (props) => {
  return (
    <div>
      <Card className='song-card' >
        {props.url && <CardImg src={props.url}></CardImg>}
        {!props.url && (
          <div className='img-holder'>
            <i class='fa fa-music' aria-hidden='true'></i>
          </div>
        )}
        <div class='middle' >
          <i class='fa fa-play-circle fa-3x'onClick={props.clickHandler} data-name={props.title} aria-hidden='true'></i>
        </div>
      </Card>
      <div className='content'>
        <div className='content-title'>{props.title}</div>
      </div>
    </div>
  );
};

export default Song;
