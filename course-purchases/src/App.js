import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CourseSales from './CourseSales'

class App extends Component {

  

  render() {
    var courses = [
    { name: "Web dev", price: 200},
    { name: "Ios dev", price: 250},
    { name: "Android dev", price: 150},
    { name: "Front end dev", price: 300}
    ];

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Course Purchase Page</h1>
        </header>
        <CourseSales courses = {courses}/>
      </div>
    );
  }
}

export default App;
