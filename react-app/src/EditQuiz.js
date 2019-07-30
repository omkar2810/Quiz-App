import React, { Component } from 'react';

class LoadQuiz extends Component {
    constructor() {
        super();
        this.state = {
          formData:{
            id : 0,
            qbody : "",
            opa : "",
            opb : "",
            opc : "",
            crt : "",
            img : "",
            snd : ""
          },

          data: []
        }
        this.updateQues = this.updateQues.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
      }
      
    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        const request = new Request('http://127.0.0.1:8080/quiz/'+params.get('id'));
        fetch(request)
          .then(response => response.json())
            .then(data =>this.setState({data: data}));
    
      }
    updateQues(event,key,type){
        if(type == 1){
            this.state.data[key].qbody = event.target.value;
        }       
        else if(type == 2){
            this.state.data[key].opa = event.target.value;
        }  
        else if(type == 3){
            this.state.data[key].opb = event.target.value;
        }   
        else if(type == 4){
            this.state.data[key].opc = event.target.value;
        } 
        else if(type == 5){
            this.state.data[key].crt = event.target.value;
        }  
        else if(type == 6){
            this.state.data[key].img = event.target.value;
        } 
        else if(type == 7){
            this.state.data[key].snd = event.target.value;
        }        
        // console.log(this.state.data[key])
      }

      handleSubmit (event,key) {
        event.preventDefault();
        this.state.formData = this.state.data[key]
        // this.state.formData.id = Number(this.state.formData.id) 
        console.log(this.state.formData) 
        fetch('http://localhost:8080/ques/'+this.state.formData.id, {
         method: 'PUT',
         body: JSON.stringify(this.state.formData),
       })
          .then(response => {
            if(response.status >= 200 && response.status < 300)
              this.setState({submitted: true});
          });
      }
    render() { 
            
        return ( 
            <div>
                {this.state.data.map((item, key) => {
                   return (
                      <div key={key}> 
                          <textarea defaultValue={item.qbody} onChange={(event) => { return this.updateQues(event,key,1)}}></textarea>
                          <label>Option A</label>
                          <input type="text" placeholder={item.opa} onChange={(event) => { return this.updateQues(event,key,2)}}></input>
                          <label>Option B</label>
                          <input type="text" placeholder={item.opb} onChange={(event) => { return this.updateQues(event,key,3)}}></input>
                          <label>Option C</label>
                          <input type="text" placeholder={item.opc} onChange={(event) => { return this.updateQues(event,key,4)}}></input>
                          <label>Correct</label>
                          <input type="text" placeholder={item.crt} onChange={(event) => { return this.updateQues(event,key,5)}}></input>
                          <br></br>
                          <label>Image Url(Leave Blank if No Image)</label>
                          <input type="text" className="form-control" placeholder={item.img} onChange={(event) => { return this.updateQues(event,key,6)}}/>
                          <input type="text" className="form-control" placeholder={item.snd} onChange={(event) => { return this.updateQues(event,key,7)}}/>
                          <button type="submit" onClick={(event) => { return this.handleSubmit(event,key)}}>Update</button>
                          <hr></hr>
                      </div>
                    )
                 })}
            </div>

         );
    }
}
 
export default LoadQuiz;