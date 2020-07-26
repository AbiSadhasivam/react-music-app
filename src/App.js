import React, { Component } from 'react';
import './styles/app.css'
import MusicApp from './components/MusicApp/MusicApp';
import 'bootstrap/dist/css/bootstrap.css';

<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

class App extends Component {
  render() {
    return (
      <MusicApp></MusicApp>
    );
  }
}

export default App;
