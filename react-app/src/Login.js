import React, { Component } from 'react';
import SignUp from './SignUp';
import Home from './Home'
import PropTypes from 'prop-types'
import  { Redirect } from 'react-router-dom'

class Login extends Component {
    constructor() {
        super();
        this.state = {
          formData: {
            username: "",
            password: "",
          },
          data:[],
          submitted: false,
        }
        this.handleUChange = this.handleUChange.bind(this);
        this.handlePChange = this.handlePChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      static contextTypes = {
        router : PropTypes.object,
      }
      handleSubmit (event) {
        event.preventDefault();
        fetch('http://localhost:8080/login', {
         method: 'POST',
         body: JSON.stringify(this.state.formData),
       })
          .then(response => {
            if(response.status >= 200 && response.status < 300){
                console.log("correct");
                localStorage.setItem('id',this.state.formData.username);
                window.location = "http://localhost:3000/Home"
            }    
            else{
               console.log("incorrect");
               alert("Incorrect UserName")
            }          
          });
      }

      handleUChange(event) {
        this.state.formData.username = event.target.value;
      }
      handlePChange(event) {
        this.state.formData.password = event.target.value;
      }
    render() { 
        return ( 
            
        <div>    
            <div className="formContainer">
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                {!localStorage.getItem('id') &&
                <div>
                    <label>User Name</label>
                    <input type="text" className="form-control" value={this.state.username} onChange={this.handleUChange}/>
                
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={this.state.password} onChange={this.handlePChange}/>
                </div>
                    <button type="submit" className="btn btn-default">Login</button>
                </div>
                }    
                {localStorage.getItem('id') &&
                  <h1>accee</h1>
                }
                </div>
            </form>
            </div>
       </div>
         );
    }
}
 
export default Login;