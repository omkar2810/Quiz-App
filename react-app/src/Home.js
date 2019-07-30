import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './Home.css'
class Home extends Component {
    state = {  }
    render() 
    {
      return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark" >
            {localStorage.getItem('id')=="admin" &&
            <ul className="navbar-nav pad">
            <li className="nav-item activNamee pad"><Link to={'/ViewUsers'}><h3>View Users</h3></Link></li>
            <li className="nav-item active pad"><Link to={'/CreateGen'}><h3>Add Genre</h3></Link></li>
            <li className="nav-item active pad"><Link to={'/AddQuiz'}><h3>Add Quiz</h3></Link></li>
            <li className="nav-item active pad"><Link to={'/AddQues'}><h3>Add Question</h3></Link></li>
            </ul>
            }{localStorage.getItem('id') && 
            <ul className="navbar-nav">
            <li className="nav-item active pad"><Link to={'/ViewQuiz'}><h3>View Quizzes</h3></Link></li>
            <li className="nav-item active pad"><Link to={'/Leader'}><h3>Leader Board</h3></Link></li>
            <li className="nav-item active pad"><Link to={'/LogOut'}><h3>Log Out</h3></Link></li>
            </ul>
            }
            {!localStorage.getItem('id') &&
            <div>
                <h2>Access Denied</h2>
            </div>
            }
      </nav>

        );
    }
}
 
export default Home;