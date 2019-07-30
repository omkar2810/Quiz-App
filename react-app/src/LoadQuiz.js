import React, { Component } from 'react';

class LoadQuiz extends Component {
    constructor() {
        super();
        this.state = {
          data: [],
          resp : [],
          formData:{
              username : "",
              scr : 0,
              qzid : 0
          },
          scor : 0,
          l1 : true,
          l2 : true,
          minus : true
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.submitScore = this.submitScore.bind(this)
        this.lifeLine = this.lifeLine.bind(this)
        this.play = this.play.bind(this)
        this.pause = this.pause.bind(this)
        this.audio = new Audio("")
      }

    componentDidMount() {
        for(var i=0;i<50;i++){
            this.state.resp.push([])
        }
        const params = new URLSearchParams(this.props.location.search);
        this.state.formData.qzid = Number(params.get('id'))
        this.state.formData.scr = Number(0)
        const request = new Request('http://127.0.0.1:8080/quiz/'+params.get('id'));
        fetch(request)
          .then(response => response.json())
            .then(data => this.setState({data: data}));
      }

    addAns(event,key,type){
        if(type==1)
        {
            if(this.state.resp[key].indexOf('A')>-1){
                const list = this.state.resp[key];
                list.splice(this.state.resp[key].indexOf('A'), 1);
                this.setState(this.state.resp[key]);
            }
            else{
                this.state.resp[key].push('A')
            }    

        }
        else if(type==2)
        {
            if(this.state.resp[key].indexOf('B')>-1){
                const list = this.state.resp[key];
                list.splice(this.state.resp[key].indexOf('B'), 1);
                this.setState(this.state.resp[key]);
            }
            else{
                this.state.resp[key].push('B')
            } 
        }
        else if(type==3)
        {
            if(this.state.resp[key].indexOf('C')>-1){
                const list = this.state.resp[key];
                list.splice(this.state.resp[key].indexOf('C'), 1);
                this.setState(this.state.resp[key]);
            }
            else{
                this.state.resp[key].push('C')
            } 
        }
        // console.log(this.state.resp[key])
    }  

    play(event,url){
        console.log(url)
        var audio = new Audio(url);
        audio.play()
    }
    pause(event){
        this.audio.pause();
    }

    handleSubmit(event,key){
        console.log(this.state.resp[key].length,this.state.data[key].crt.length)
        var arr = []
        for(var i=0;i<this.state.data[key].crt.length;i++)
            arr.push(this.state.data[key].crt[i])
            this.state.resp[key].sort() 
            arr.sort()   
            console.log(arr,this.state.resp[key])
            if(JSON.stringify(this.state.resp[key]) == JSON.stringify(arr)){
                console.log("Correct")
                alert("Correct Ans")
                this.state.scor = this.state.scor + 10;
                console.log(this.state.scor)
            }
            else
            {
                if(this.minus){
                    this.state.scor = this.state.scor - 5;                    
                }
                else
                {
                    this.setState({minus: true})
                }
                console.log("Incorrect",this.state.scor)

            }      

    }  

    submitScore(event){
        this.state.formData.username = localStorage.getItem('id');
        this.state.formData.scr = this.state.score;
        console.log(this.state.formData)
        event.preventDefault();
        fetch('http://localhost:8080/score', {
         method: 'POST',
         body: JSON.stringify(this.state.formData),
       })
          .then(response => {
            if(response.status >= 200 && response.status < 300){
              this.setState({submitted: true});
              alert("Score Submitted");
            } 
            else
            {
                alert("Quiz already played");
            }
          });
    }

    lifeLine(event,key,type){

        console.log(this.state.l1,this.state.l2)
        if(type==1)
        {
            if(!this.state.l1)
            {
                alert("Sorry you have already used this lifeline")
            }       
            else
            {
                alert(this.state.data[key].crt.length);
                this.state.l1 = false
            }
        }
        else if(type==2)
        {
            if(!this.state.l2)
            {
                alert("Sorry you have already used this lifeline");
            }
            else
            {
                this.state.minus = false;
                this.state.l2 = false;
            }
        }

    }
    render() { 
        
        return ( 
            <div>
                {localStorage.getItem('id') &&
                <div>
                {this.state.data.map((item, key) =>{
                   return (
                      <div class="jumbotron jumbotron-fluid" key={key}> 
                      <div class="container">
                          {(()=> {
                            if(item.img){
                              return(<div>
                                  <br></br>
                                  <img src={item.img} alt="error" class="img-thumbnail"></img></div>)  
                            }   
                          })()
                          }
                          {(()=> {
                            if(item.snd){
                              return(<div>
                                  <br></br>
                                  <button onClick={(event) => { return this.play(event,item.snd)}}>Play</button>
                                  <button onClick={(event) => { return this.pause(event)}}>Pause</button>
                                  </div>)  
                            }   
                          })()
                          } 
                          <p class="lead">{item.qbody}</p>
                          <label>{item.opa}</label>
                          <input type="checkbox"  onClick={(event) => { return this.addAns(event,key,1)}}></input>
                          <label>{item.opb}</label>
                          <input type="checkbox" onChange={(event) => { return this.addAns(event,key,2)}}></input>
                          <label>{item.opc}</label>
                          <input type="checkbox" onChange={(event) => { return this.addAns(event,key,3)}}></input>
                          <br></br>
                          <button type="submit" onClick={(event) => { return this.handleSubmit(event,key)}}>Check Ans</button>
                          <button type="submit" onClick={(event) => { return this.lifeLine(event,key,2)}}>No Negative</button>
                          <button type="submit" onClick={(event) => { return this.lifeLine(event,key,1)}}>How Many Correct?</button>
                          
                      </div>             
                      </div>
                    )
                 })}
                  <button  className="btn btn-default" onClick={this.submitScore}>End Quiz</button>
                  </div>
                }
                {!localStorage.getItem('id') &&
                    <div>
                        <h1>Access Denied</h1>
                    </div>
                } 
            </div>

         );
    }
}
 
export default LoadQuiz;