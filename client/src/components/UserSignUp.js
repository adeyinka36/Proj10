import React ,{Component} from 'react'
import { Link} from 'react-router-dom';
import {HeaderContext} from '../App.js'

class UserSignUp extends Component{
    constructor(props){
        super(props)
  this.state={
     firstName:"",
     lastName:"",
     emailAddress:"",
     password:"",
     confirmPassword:"",
     errors:[]
  }
}
  change=()=>{
    this.setState({
      firstName:document.getElementById("firstName").value,
      lastName:document.getElementById("lastName").value,
       emailAddress:document.getElementById("emailAddress").value,
       password:document.getElementById("password").value,
       confirmPassword:document.getElementById("confirmPassword").value,

    })
  }

submit=(e)=>{
 e.preventDefault()
 try{
  const emailAddress= this.state.emailAddress
  const password=this.state.password
  const confirmPassword=this.state.confirmPassword
  const firstName=this.state.firstName
  const lastName=this.state.lastName
  const signUp= this.props.context.data.createUser
  const newUser={emailAddress,password,firstName,lastName}
  
  if(password===confirmPassword){
    // create user 
    
    signUp(newUser)
    .then(res=>{if(res.status===201)
      {
        return this.props.history.push("/courses")}
        else if(res.status===500){ this.props.history.push("/NotFound");return}
      else{
        return res.json()
      }
    })
    .then(errors =>{
     
      if(errors){
        
        if(typeof errors===Array){
          
        let errorMessages=errors.map(err=>err.message)
        
        this.setState({ 
          errors:errorMessages}
      );
        }else {
          
          let errorMessages=errors.message
          this.setState({
            errors:[errorMessages]
          })
        }

      }
    })
        
  
}
  else if(password!==confirmPassword){
    console.log("passwords dont match")
}
 }
catch(err){
 console.log(`there was an error trying to create : ${err}`)
}
}    
    render(){
    
      
      let error=  this.state.errors
     let errList
      if (error.length){
        
     errList= error.map((error,i)=>{return(
     <li key={i}>{error}</li>
     )})
      }
      else if(typeof error===Object){
        errList=error.message
      }
      
        return(
      <div>
      <HeaderContext/>
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <h1>Create Course</h1>
          {error.length?<div>
            {/* vlidation errors/error */}
            <div>
            <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
              <ul>
              {errList}
              </ul>
            </div>
          </div>
          </div>:null}
          <div>
        
            <form>
              <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" onChange={this.change}/></div>
              <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" onChange={this.change}/></div>
              <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={this.change}/></div>
              <div><input id="password" name="password" type="password" className="" placeholder="Password" onChange={this.change}/></div>
              <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password"
                  onChange={this.change}/></div>
              <div className="grid-100 pad-bottom"><button className="button" onClick={this.submit}>Sign Up</button><Link  to="/courses"><button className="button button-secondary">Cancel</button></Link></div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Already have a user account? <Link to="/signin-UserSignIn">Click here</Link> to sign in!</p>
        </div>
      </div>
      </div>
    
        )
    }
}



export default UserSignUp