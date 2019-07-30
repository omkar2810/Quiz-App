import React, { Component } from 'react';

class CreateGen extends Component {
    constructor() {
        super();
        this.state = {
          formData: {
            qzname : "",
            gid : 0
          },
          data : [],
          submitted: false,
        }
        this.handleGChange = this.handleGChange.bind(this);
        this.handleQChange = this.handleQChange.bind(this);    
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount() {
        const request = new Request('http://127.0.0.1:8080/genre/');
        fetch(request)
          .then(response => response.json())
            .then(data => this.setState({data: data}));
      }

      handleSubmit (event) {
        console.log(this.state.formData)
        event.preventDefault();
        fetch('http://localhost:8080/quiz', {
         method: 'POST',
         body: JSON.stringify(this.state.formData),
       })
          .then(response => {
            if(response.status >= 200 && response.status < 300)
              this.setState({submitted: true});
          });
      }

      handleGChange(event) {
        this.state.formData.gid = Number(event.target.value);
      }

      handleQChange(event) {
        this.state.formData.qzname = event.target.value;
      } 
    render() { 
        return (  

            <div>    
                {localStorage.getItem('id')&&
                <div>
                <div className="formContainer">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Quiz Name</label>
                        <input type="text" className="form-control" value={this.state.qzname} onChange={this.handleQChange}/>
                    </div>
                    <select class="custom-select" onChange={this.handleGChange}>    
                    <option>Select</option>
                    {this.state.data.map(function(item, key) {
                    return (
                            <option key={key} value={item.id}>{item.gname}</option>
                    )
                    })}
                    </select>
                    <br></br>
                    <br></br>
                    <button type="submit" class="btn btn-success">Add Quiz</button>
                </form>
                </div>
            
                {this.state.submitted &&
                    <div>
                    <h2>
                        New Quiz Added.
                    </h2>
                    </div>
                }
                </div>   }
            </div>
        );
    }
}
 
export default CreateGen;