import React, {Component} from 'react';
import {Link}from 'react-router-dom';
import Cookies from 'js-cookie';

const details= React.createContext();
export const Provider2=details.Provider;
export const Consumer2=details.Consumer;


class UserSignIn extends Component{
    constructor(props){
        super(props);
        this.state={
          authenticated:null,
         password:"",
         emailAddress:"",
         id:""
        }
    }


change=(e)=>{
  
  this.setState({
    password:document.getElementById('password').value,
    emailAddress:document.getElementById('emailAddress').value
  })
}

submit= (event)=>{
event.preventDefault();

 try{
const emailAddress= this.state.emailAddress
const password=this.state.password
const signIn= this.props.context.data.signIn

signIn(emailAddress,password)

.then(res=>{if(res.status===401){
  console.log(res)

}
else{
  const user={emailAddress:this.state.emailAddress,password:this.state.password}
  this.setState({authenticated:user,id:res.id})
  console.log(`we are in, here are the authenticated details to be saved in sign in stat : ${res}`)
  Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
  this.props.history.push(`/courses`)
   this.props.context.data.makeAuthenticationTrue(user)
console.log( Cookies.getJSON('authenticatedUser'))
Cookies.set("userId",JSON.stringify(this.state.id))
  
  
  
   
}

})


.catch(err=>console.log(`there was an error siginin in :${err}`))
}catch(err){
console.log(`this is the try catch error : ${err}`)
}


}
    render(){
      return(
       <div>
          
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