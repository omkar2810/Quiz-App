import React, { Component } from 'react';
import logo from './logo.svg';
// import './App.css';
import SignUp from './SignUp'
import Login from './Login'
import CreateGen from  './CreateGen'
import AddQuiz from  './AddQuiz'
import AddQues from './AddQues'
import ViewQuiz from './ViewQuiz'
import LoadQuiz from './LoadQuiz'
import ViewUsers from './ViewUsers'
import EditQuiz from './EditQuiz'
import Home from './Home'
import Leader from './Leader'
import QuizLeader from './QuizLeader'
import LogOut from './LogOut'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';



class App extends Component {

  componentDidMount(){
    // if(localStorage.getItem('id'))
    //   window.location = "http://localhost:3000/Home"
  }
  render() {
    return (
      <div>
        <Router>
          <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>React App</Link>
                </div>
                <ul className="nav navbar-nav">
                {!localStorage.getItem('id') && 
                  <div>
                  <li><Link to={'/SignUp'}>SignUp</Link></li>
                  <li><Link to={'/Login'}>Login</Link></li>
                  </div>
                }

              </ul>
              </div>
              {localStorage.getItem('id') &&
                  <div>
                  <h1><Link to={'/Home'}>Go to Home</Link></h1> 
                  </div>
              }
            </nav>
            <Switch>
     }            <Route exact path='/SignUp' component={SignUp} />
                 <Route exact path='/Login' component={Login} />
                 <Route exact path='/CreateGen' component={CreateGen} />
                 <Route exact path='/AddQuiz' component={AddQuiz} />
                 <Route exact path='/AddQues' component={AddQues} />
                 <Route exact path='/ViewQuiz' component={ViewQuiz} />
                 <Route exact path='/LoadQuiz' component={LoadQuiz} />
                 <Route exact path='/ViewUsers' component={ViewUsers} />
                 <Route exact path='/EditQuiz' component={EditQuiz} />
                 <Route exact path='/Home' component={Home} />
                 <Route exact path='/Leader' component={Leader} />
                 <Route exact path='/QuizLeader' component={QuizLeader} />
                 <Route exact path='/LogOut' component={LogOut} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
