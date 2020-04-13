import React , { Component} from 'react';
import {Link,Redirect} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Cookies from 'js-cookie';



class CourseDetail extends Component{
    constructor(props){
        super(props)
     this.state={
       course:null,
       id:null,
       userId:null,
       emailAddress:null,
       password:null
     }
    }
deleteCourse(e){
  e.preventDefault()
  this.props.context.data.deleteCourse(this.state.id,this.state.emailAddress,this.state.password)
}

    componentDidMount(){
      console.log("hello")
      
     
      this.props.context.data.getCourseDetail(this.props.match.params.id)
      .then(response=>{if(response.status!==200){ return <Redirect to="/notFound"/>}
      else{
       return response.json()}})
      .then(res=>{
        
        this.setState({course:res,
                        id:res.id,
                      userId:res.User.id,
                      // emailAddress:Cookies.getJSON('authenticatedUser').emailAddress,
                      // password:Cookies.getJSON("authenticatedUser").password
        })})
       
    
     .catch(err=>console.log(`there was this error ${err}`))
    }
    render()
    {
    let num= this.state.userId
   async function cal (){
    let userId= await JSON.stringify(Cookies.getJSON('authenticatedUserNum'));
    let UserId= await ""+num
    userId=Number(userId);
    UserId=Number(UserId);
    return userId==UserId
   }
     

let shouldUpdateRender = cal()

if(this.state.course){
return(
    <div>
    
      
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">{ shouldUpdateRender?<span><Link className="button" to={`/courses/${this.state.course.id}/update`}>Update Course</Link><Link className="button" onClick={this.deleteCourse}>Delete Course</Link></span>:null}<Link
                className="button button-secondary" to="/courses">Return to List</Link></div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{this.state.course.title}</h3>
              <p>{`${this.state.course.User.firstName} ${this.state.course.User.lastName}`}</p>
            </div>
            <div className="course--description">
              <p>{this.state.course.description}</p>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{this.state.course.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                     <ReactMarkdown source={this.state.course.materialsNeeded}/>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      </div>
      );
}
  
    return(
      <div>
      
      </div>
    )
  
}
}


export default CourseDetail