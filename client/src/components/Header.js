import React,{Component} from 'react';
import { Link,NavLink} from 'react-router-dom';



 class  Header extends Component{
     constructor(props){
         super(props);
     }
    
   
    render(){
       
       let auth=this.props.context.authentication
       console.log( auth)
  
  
    if(auth){
    return(
            <div className="header">
            <div className="bounds">
                <h1 className="header---logo">Courses</h1>
                <nav><span>{`Welcome ${auth.firstName} ${auth.lastName}`}</span><NavLink className="signout" to="/signout-UserSignOut">Sign Out</NavLink></nav>:
                  
            </div>
            </div>
        
    )}
    else{
    return(
        <div className="header">
        <div className="bounds">
            <h1 className="header---logo">Courses</h1>
              <nav><NavLink className="signup" to="/signup-UserSignUp">Sign Up</NavLink></nav>
             <nav> <NavLink  className="signin" to="/signin-UserSignIn">Sign In</NavLink></nav>
        </div>
        </div>
    )
}
 }}

export default Header