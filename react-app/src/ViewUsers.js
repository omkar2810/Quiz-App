import React, { Component } from 'react';


class ViewUsers extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/people/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }
 
  render() {
    function deleteRow(id){
        console.log(id);
        const request = new Request('http://127.0.0.1:8080/people/'+ id )
        console.log(request);
        fetch(request,{method: 'DELETE'})
        .then(response => {
            if(response.status >= 200 && response.status < 300)
            window.location.reload()
          });
      }
  
    return (
        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>User Name</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.id}</td>
                      <td>{item.firstname}</td>
                      <td>{item.username}</td>
                      <td><button onClick={() => {deleteRow.bind(this,item.id)()}}>DELETE</button></td>
                  </tr>
                )
             })}
          </tbody>
       </table>
    );
  }
}

export default ViewUsers;