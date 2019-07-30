import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom'

class Leader extends Component {
    constructor() {
        super();
        this.state = {
          data: []
        }
      }
      componentDidMount() {
        localStorage.clear();
        <Redirect to='/'/>
      }
 
  render() {
    return (
        <div>
            <h1>Logged Out</h1>
        </div> 
    );
  }
}

export default Leader;