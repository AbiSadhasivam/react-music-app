import React from 'react';

import VerticalTabs from './VerticalTabs';

import './Body.css';

const Body = () => {
  const tabNames = ['Songs', 'Playlist'];
  return <VerticalTabs tab-names={tabNames}></VerticalTabs>;
};
export default Body;
