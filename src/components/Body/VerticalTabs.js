import React, { useState } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from 'reactstrap';
import classnames from 'classnames';
import SongList from '../SongList/SonglList';
import AlbumList from '../AlbumList/AlbumList';
import PlayList from '../PlayList/PlayList';
import './VerticalTabs.css';

// import SongList from '../SongList/SongList';

const VerticalTabs = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  // TODO: Change the tab names to generate dynamically
  return (
    <Row className='main-ctr'>
      <Col xs='6' sm='4' md='2'>
        <Nav tabs vertical className='nav-custom'>
          <NavItem className='nav-item'>
            <NavLink
              className={classnames(
                { 'active-tab': activeTab === '1' },
                'nav-link'
              )}
              onClick={() => {
                toggle('1');
              }}
            >
              <i className='fa fa-headphones icon-tab' aria-hidden='true'></i>
              <strong>Albums</strong>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ 'active-tab': activeTab === '2' })}
              onClick={() => {
                toggle('2');
              }}
            >
              <i className='fa fa-play icon-tab' aria-hidden='true'></i>
              <strong> Songs</strong>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ 'active-tab': activeTab === '3' })}
              onClick={() => {
                toggle('3');
              }}
            >
              <i className='fa fa-star icon-tab' aria-hidden='true'></i>
              <strong> Playlist</strong>
            </NavLink>
          </NavItem>
        </Nav>
      </Col>
      <Col xs='6' sm='8' md='10'>
        <TabContent activeTab={activeTab}>
          <TabPane tabId='2'>
            <Row>
              <Col sm='12'>
                <SongList></SongList>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId='1'>
            <Row>
              <Col sm='12'>
                <AlbumList></AlbumList>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId='3'>
            <Row>
              <Col sm='12'>
                <PlayList></PlayList>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </Col>
    </Row>
  );
};

export default VerticalTabs;
