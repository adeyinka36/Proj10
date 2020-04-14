import React , { Component } from  'react';
import Cookies from 'js-cookie';

class CreateCourse extends Component{
    constructor(props){
        super(props);
        this.state={
          title:"",
          description:"",
          estimatedTime:"",
          materialsNeeded:"",
          error:[]
        }
    }
    change=()=>{
  
      this.setState({
        title:document.getElementById('title').value,
        description:document.getElementById('description').value,
        estimatedTime:document.getElementById('estimatedTime').value,
        materialsNeeded:document.getElementById('materialsNeeded').value
      })
    }
  
createCourse=(e)=>{
  
  e.preventDefault()
  document.getElementById('title').placeholder=""
  document.getElementById('description').placeholder=""
  document.getElementById('estimatedTime').placeholder=""
  document.getElementById('materialsNeeded').placeholder=""

  console.log(this.state.title)
   const {password} =Cookies.getJSON('authenticatedUser');
   const {emailAddress}=Cookies.getJSON('authenticatedUser');
  const title=this.state.title
  const description=this.state.description
  const course={title:title,description:description}
this.props.context.data.createNewCourse(course,emailAddress,password)
.then(errors =>{
  console.log(errors);
  if(errors.length === 1 || errors.length === 2){
    this.setState( ()=>{
      return {errors}
  });
  }else{
      this.props.history.push('/courses');
      console.log(`the course was created`);
    }
})

.catch(err => {
  console.log(err);
  this.props.history.push('/error');
});

}

   render(){
     let error=this.state.error
    
  
  
       return(
        
        <div className="bounds course--detail">
          <h1>Create Course</h1>
          {error?<div>
            {/* vlidation errors/error */}
            <div>
            <h2 class="validation--errors--label">Validation errors</h2>
            <div class="validation-errors">
              <ul>
                {error.map((error,i)=>`<li key={i}>${error}</li>`)}
              </ul>
            </div>
          </div>
          </div>:null}
            <form>
              <div className="grid-66">
               <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                      onChange={this.change}/></div>
                  <p>By Joe Smith</p>
                </div>
                <div className="course--description">
                  <div><textarea id="description" name="description" className="" placeholder="Course description..." onChange={this.change}></textarea></div>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                          placeholder="Hours" onChange={this.change}/></div>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." onChange={this.change}></textarea></div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid-100 pad-bottom"><button className="button"  onClick={this.createCourse}>Create Course</button><button className="button button-secondary" >Cancel</button></div>
            </form>
            </div>
            
          
          
      
       )
   }
}


export default CreateCourse