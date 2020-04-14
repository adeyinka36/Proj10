import React, { Component} from 'react';
import {Link} from 'react-router-dom';
import Cookies from 'js-cookie';


class UpdateCourse extends Component{
    constructor(props){
        super(props);
        this.state={
          course:"",
          courseId:"",
          emailAddress:"",
          password:"",
          title:"",
          description:"",
          estimatedTime:"",
          materialsNeeded:"",
          error:[]
        }
    }

   change=async ()=>{
   console.log(document.getElementById('title').value)
     await this.setState({
        title:document.getElementById('title').value,
        description:document.getElementById('description').value,
        estimatedTime:document.getElementById('estimatedTime').value,
        materialsNeeded:document.getElementById('materialsNeeded').value
      })
     
    }
    componentDidMount(){
      console.log("yes wroking so far")

      this.props.context.data.getCourseDetail(this.props.match.params.id)
      .then(response=>
        response.json())
    
      .then(res=>{this.setState({course:res,courseId:res.id,emailAddress:Cookies.getJSON('authenticatedUser').emailAddress,
      password:Cookies.getJSON("authenticatedUser").password})
    console.log("yes")})
    // redirect to forbidden if id stored in cookies isnt the same as the user id return for this course using the ".then" below
    // .then(res=>)
      
       .catch(err=>console.log(`there was this error ${err}`))
    }

    update=(e)=>{
    e.preventDefault()
    this.setState({title:"x"})
    console.log(this.state.title)
    try{
    
 let updates={title:this.state.title,
                   description:this.state.description,
                  estimatedTime:this.state.estimatedTime,
                materialsNeeded:this.state.materialsNeeded}
                console.log(updates)
    this.props.context.data.updateCourse(this.state.courseId,updates, this.state.emailAddress,this.state.password)
    // .then(errors =>{
    //   console.log(errors);
    //   if(errors.length === 1 || errors.length === 2){
    //     this.setState( ()=>{
    //       return {errors}
    //   });
    //    return <Redirect to="/notFound"/>
    //   }else{
    //       this.props.history.push('/courses');
    //       console.log(`the course was updated`);
    //     }
    // })
    
    // .catch(err => {
    //   console.log(err);
    //   this.props.history.push('/error');
    // });
    
  }catch(err){
    console.log(err)
  }

    }
    render(){
      let error=  this.state.errors
      if(this.state.course){
        return(
    <div>
      
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
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
                <div><input id="title" name="title" type="text" className="input-title course--title--input" 
                     onChange={this.change}/></div>
                <p>{`${this.state.course.User.firstName} ${this.state.course.User.lastName}`}</p>
              </div>
              <div className="course--description">
                <div><textarea id="description" name="description" className=""  defaultValue={this.state.course.description} onChange={this.change}></textarea></div>
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
                    <div><textarea id="materialsNeeded" name="materialsNeeded" className=""  defaultValue={this.state.course.materialsNeeded} onChange={this.change}>
</textarea></div>
                  </li>
                </ul>
              </div>
              
            </div>
            <div className="grid-100 pad-bottom"><button className="button" onClick={this.update}>Update Course</button><Link to="/courses"><button className="button button-secondary"  to='/courses'>Cancel</button></Link></div>
          </form>
        </div>
        
      </div>
    </div>
    
        )
      }
     return(
       <div></div>
     )
  }
 
}

export default UpdateCourse