import React from 'react';
import { NavLink} from 'react-router-dom';

function Header(){
    return(
        <div className="header">
        <div className="bounds">
            <h1 className="header---logo">Courses</h1>
            <nav><NavLink className="signout" to="/signout-UserSignOut">Sign Out</NavLink></nav>:
              <nav><NavLink className="signup" to="/signup-UserSignUp">Sign Up</NavLink></nav>
             <nav> <NavLink  className="signin" to="/signin-UserSignIn">Sign In</NavLink></nav>
        </div>
        </div>
    )
}

export default Header