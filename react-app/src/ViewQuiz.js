import React, { Component } from 'react';
import LoadQuiz from "./LoadQuiz"
import { BrowserRouter as Router, Link } from 'react-router-dom';
class ViewQuiz extends Component {
    constructor() {
        super();
        this.state = {
          data: []
        }
      }
    
      // Lifecycle hook, runs after component has mounted onto the DOM structure
      componentDidMount() {
        const request = new Request('http://127.0.0.1:8080/quiz/');
        fetch(request)
          .then(response => response.json())
            .then(data => this.setState({data: data}));
      }
    
      render() {
        function deleteQuiz(id){
          console.log(id);
          const request = new Request('http://127.0.0.1:8080/quiz/'+ id )
          console.log(request);
          fetch(request,{method: 'DELETE'})
          .then(response => {
              if(response.status >= 200 && response.status < 300)
              // window.location.reload()
              console.log("success")
            });
        }
        return (
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">View All Quizzes</h1>
            </header>
          {localStorage.getItem('id') &&
            <div class="formgroup">          
            <table className="table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Quiz Name</th>
                  <th>Genre</th>
                  <th>Play</th>
                </tr>
              </thead>
              
              <tbody>{this.state.data.map(function(item, key) {
                   return (
                     
                      <tr key = {key}>
                          <td>{item.id}</td>
                          <td>{item.qzname}</td>
                          <td>{item.gname}</td>
                          <td><Link to={'/LoadQuiz/?id='+item.id}><button type="submit" button type="button" class="btn btn-success">Play</button></Link></td>
                          <td><Link to={'/QuizLeader/?id='+item.id}><button type="submit" button type="button" class="btn btn-success">Quiz LeaderBoard</button></Link></td>
                          {localStorage.getItem('id')=='admin'&& 
                          <div>
                          <td><Link to={'/EditQuiz/?id='+item.id}><button type="submit" class="btn btn-primary" >Edit</button></Link></td>
                          <td><button class="btn btn-danger" onClick={() => {deleteQuiz.bind(this,item.id)()}}>DELETE</button></td>
                          </div>
                          }
                      </tr> 
                    )
                 })}
              </tbody>
           </table>
           </div>
          }
          {!localStorage.getItem('id') &&

            <div><h1>Access Denied</h1></div>
          }
          </div>
        );
      }
}
 
export default ViewQuiz;