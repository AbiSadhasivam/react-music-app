import React from 'react';
import { Card, CardImg } from 'reactstrap';

import './Song.css';
import 'font-awesome/css/font-awesome.min.css';
const Song = (props) => {
  const subTitle = props.subTitle || 0;
  return (
    <div>
      <Card className='song-card'>
        {props.url && <CardImg src={props.url}></CardImg>}
        {!props.url && (
          <div className='img-holder'>
            <i className='fa fa-music' aria-hidden='true'></i>
          </div>
        )}
        <div className='middle'>
          <i
            className='fa fa-play-circle fa-3x'
            onClick={props.clickHandler}
            data-name={props.title}
            aria-hidden='true'
          ></i>
        </div>
      </Card>
      <div className='content'>
        <div className='content-title' title={props.title}>{props.title}</div>
        {subTitle !== 0 ? (
          <div className='sub-title'>{props.subTitle} Songs</div>
        ) : (
          props.subTitle === 0 && (
            <div className='sub-title'>No Songs found :(</div>
          )
        )}
      </div>
    </div>
  );
};

export default Song;
