import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom';

function Header(){
    return(
        <div className="header">
        <div className="bounds">
            <h1 className="header---logo">Courses</h1>
            <nav><NavLink to="/signout-UserSignOut"><a className="signout">Sign Out</a></NavLink></nav>:
              <nav><NavLink to="/signup-UserSignUp"><a className="signup">Sign Up</a></NavLink></nav>
             <nav> <NavLink to="/signin-UserSignIn"><a className="signin" >Sign In</a></NavLink></nav>
        </div>
        </div>
    )
}

export default Header