import React, { Component } from 'react';

class CreateGen extends Component {
    constructor() {
        super();
        this.state = {
          formData: {
            gname: "",
          },
          submitted: false,
        }
        this.handleGChange = this.handleGChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleSubmit (event) {
        event.preventDefault();
        fetch('http://localhost:8080/genre', {
         method: 'POST',
         body: JSON.stringify(this.state.formData),
       })
          .then(response => {
            if(response.status >= 200 && response.status < 300)
              this.setState({submitted: true});
          });
      }

      handleGChange(event) {
        this.state.formData.gname = event.target.value;
      }
    
    render() { 
        return (  

            <div>    
                {localStorage.getItem('id')=='admin' &&
                <div>
                <div className="formContainer">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Genre Name</label>
                        <input type="text" className="form-control" value={this.state.gname} onChange={this.handleGChange}/>
                    </div>
                    <button type="submit" className="btn btn-default">Add Genre</button>
                </form>
                </div>
            
                {this.state.submitted &&
                    <div>
                    <h2>
                        New Genre Added.
                    </h2>
                    </div>
                }
              </div>  
            }   
            </div>
        );
    }
}
 
export default CreateGen;