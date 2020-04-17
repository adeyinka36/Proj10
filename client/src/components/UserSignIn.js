import React, {Component} from 'react';
import {Link}from 'react-router-dom';
import Cookies from 'js-cookie';
import {HeaderContext} from '../App.js'




class UserSignIn extends Component{
    constructor(props){
        super(props);
        this.state={
          authenticated:null,
         passwordn:null,
         emailAddress:null,
         id:"",
         firstname:null,
         lastname:null
        }
    }


change=(e)=>{
  
  this.setState({
    password:document.getElementById('password').value,
    emailAddress:document.getElementById('emailAddress').value
  })
}

submit= async (event)=>{
event.preventDefault();
const { from } = this.props.location.state || { from: { pathname: '/courses' } }


 try{
const emailAddress= this.state.emailAddress
const password=this.state.password
const signIn= this.props.context.data.signIn

signIn(emailAddress,password)

.then(res=>{if(res.status===401){
  this.props.history.push("/error")
  return
  
  
}
else if(res.status===500){return this.props.history.push("/NotFound")}
else{
  
  return res.json()
}
})
.then(res=>{
  console.log("works")
  res.password=this.state.password
  let user=res
  this.props.context.make(user)

  this.setState({authenticated:user,id:res.id,firstname:res.firstName,lastname:res.lastName})
  Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });

Cookies.set("userId",JSON.stringify(this.state.id))
this.props.history.push(from)

})


.catch(err=>console.log(`there was an error siginin in :${err}`))
}catch(err){
console.log(`this is the try catch error : ${err}`)
}finally{
  // this.props.context.data.checkAuthentication()
}


}
    render(){
      return(
       <div>
          <HeaderContext/>
            <div className="bounds">
              <div className="grid-33 centered signin">
                <h1>Sign In</h1>
                <div>
                  <form>
                    <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={this.change}/></div>
                    <div><input id="password" name="password" type="password" className="" placeholder="Password" onChange={this.change}/></div>
                    <div className="grid-100 pad-bottom"><button className="button" type="submit" onClick={this.submit}>Sign In</button><Link to="/courses"><button className="button button-secondary"  >Cancel</button></Link></div>
                  </form>
                </div>
                <p>&nbsp;</p>
                <p>Don't have a user account? <Link to="/courses">Click here</Link> to sign up!</p>
              </div>
            </div>
          </div>
        
        )
    }
}

export default UserSignIn