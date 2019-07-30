import React, { Component } from 'react';


class Leader extends Component {
    constructor() {
        super();
        this.state = {
          data: []
        }
      }
      componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        const request = new Request('http://127.0.0.1:8080/leader/'+params.get('id'));
        fetch(request)
          .then(response => response.json())    
            .then(data => this.setState({data: data}));
      }
 
  render() {
    return (
        <table className="table-hover">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{key+1}</td>
                      <td>{item.username}</td>
                      <td>{item.scr}</td>
                  </tr>
                )
             })}
          </tbody>
       </table>
    );
  }
}

export default Leader;