import './App.css';
import React, { Component } from 'react';
import ContainerForDisplayingWeekWeather from './ContainerForDisplayingWeekWeather';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ContainerForDisplayingWeekWeather />
      </div>
    );
  }
}


export default App;
