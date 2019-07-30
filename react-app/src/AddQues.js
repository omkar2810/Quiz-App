import React, { Component } from 'react';

class AddQues extends Component {
    constructor() {
        super();
        this.state = {
          quesData: {
            qbody : "",
            qzid : 0,
            opa : "",
            opb : "",
            opc : "",
            crt : "",
            img : "",
            snd : ""
          },
          data : [],
          submitted: false,
        }
        this.handleGChange = this.handleGChange.bind(this);
        this.handleQChange = this.handleQChange.bind(this);
        this.handleAChange = this.handleAChange.bind(this);    
        this.handleBChange = this.handleBChange.bind(this);    
        this.handleCChange = this.handleCChange.bind(this);    
        this.handleCrChange = this.handleCrChange.bind(this);
        this.handleIChange = this.handleIChange.bind(this);    
        this.handleSChange = this.handleSChange.bind(this);    
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount() {
        const request = new Request('http://127.0.0.1:8080/quiz/');
        fetch(request)
          .then(response => response.json())
            .then(data => this.setState({data: data}));
      }

      handleSubmit (event) {
        console.log(this.state.quesData)
        event.preventDefault();
        fetch('http://localhost:8080/ques', {
         method: 'POST',
         body: JSON.stringify(this.state.quesData),
       })
          .then(response => {
            if(response.status >= 200 && response.status < 300)
              this.setState({submitted: true});
          });
      }

      handleGChange(event) {
        this.state.quesData.qzid = Number(event.target.value);
      }

      handleQChange(event) {
        this.state.quesData.qbody= event.target.value;
      } 
      handleAChange(event) {
        this.state.quesData.opa= event.target.value;
      } 
      handleBChange(event) {
        this.state.quesData.opb= event.target.value;
      } 
      handleCChange(event) {
        this.state.quesData.opc= event.target.value;
      }
       handleCrChange(event) {
        this.state.quesData.crt= event.target.value;
      } 
      handleIChange(event) {
        this.state.quesData.img= event.target.value;
      } 
      handleSChange(event) {
        this.state.quesData.img= event.target.value;
      }
    render() { 
        return (  

            <div>  
            { localStorage.getItem('id')=='admin' &&    
            <div>  
                <div className="formContainer">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Enter Question</label>
                        <textarea className="form-control" value={this.state.qzname} onChange={this.handleQChange}/>
                    </div>
                    <br></br>
                    <div>
                        <label>OptionA</label>
                        <input type="text" className="form-control" value={this.state.opa} onChange={this.handleAChange}/>
                        <label>OptionB</label>
                        <input type="text" className="form-control" value={this.state.opb} onChange={this.handleBChange}/>
                        <label>OptionC</label>
                        <input type="text" className="form-control" value={this.state.opc} onChange={this.handleCChange}/>
                        <label>Correct Ans</label>
                        <input type="text" className="form-control" value={this.state.crt} onChange={this.handleCrChange}/>
                        <br></br>
                        <br></br>
                        <label>Image Url(Leave Blank if No Image)</label>
                        <input type="text" className="form-control" value={this.state.img} onChange={this.handleIChange}/>
                        <br></br>
                        <label>Sound Url(Leave Blank if No Image)</label>
                        <input type="text" className="form-control" value={this.state.img} onChange={this.handleSChange}/>
                    </div>
                    <br></br>
                    <div className="formContainer">
                    <select class="custom-select" onChange={this.handleGChange}>    
                    <option>Select</option>
                    {this.state.data.map(function(item, key) {
                    return (
                            <option key={key} value={item.id}>{item.qzname}({item.gname})</option>
                    )
                    })}
                    </select>
                    </div>
                    <br></br>
                    <button type="submit" class="btn btn-success">Add Question</button>
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
 
export default AddQues;