import React, { useState } from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from 'reactstrap';
import './Song.css';
import 'font-awesome/css/font-awesome.min.css';
const Song = (props) => {
  return (
    <Card className='song-card' >
      {props.url && <CardImg src={props.url}></CardImg>}
      {!props.url && (
        <div className='img-holder'>
          <i class='fa fa-music' aria-hidden='true'></i>
        </div>
      )}
      <CardBody>
        <CardTitle>{props.title}</CardTitle>
      </CardBody>
      <div class='middle'>
        <i class='fa fa-play-circle fa-3x' aria-hidden='true'></i>
      </div>
    </Card>
  );
};

export default Song;
