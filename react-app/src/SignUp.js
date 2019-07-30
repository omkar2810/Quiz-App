import React, { Component } from 'react';


class SignUp extends Component {
    constructor() {
        super();
        this.state = {
          formData: {
            firstName: "",
            username: "",
            password: "",
          },
          submitted: false,
        }
        this.handleFChange = this.handleFChange.bind(this);
        this.handleUChange = this.handleUChange.bind(this);
        this.handlePChange = this.handlePChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleSubmit (event) {
        event.preventDefault();
        fetch('http://localhost:8080/signup', {
         method: 'POST',
         body: JSON.stringify(this.state.formData),
       })
          .then(response => {
            if(response.status >= 200 && response.status < 300)
              this.setState({submitted: true});
          });
      }

      handleFChange(event) {
        this.state.formData.firstName = event.target.value;
      }
      handleUChange(event) {
        this.state.formData.username = event.target.value;
      }
      handlePChange(event) {
        this.state.formData.password = event.target.value;
      }

    render() { 
        return ( 
            <div className="App">
            <header className="App-header">
            <h1 className="App-title">Create a New User</h1>
            </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div claSignUpe="form-group">
                <label>First Name</label>
                <input type="text" className="form-control" value={this.state.firstName} onChange={this.handleFChange}/>
            </div>
            <div className="form-group">
                <label>User Name</label>
                <input type="text" className="form-control" value={this.state.lastName} onChange={this.handleUChange}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={this.state.city} onChange={this.handlePChange}/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>

        {this.state.submitted &&
          <div>
            <h2>
                Congratulations!! Your Account has been created
            </h2>
          </div>
        }

      </div>

         );
    }
}
 
export default SignUp;