import {UserConsumer} from  './Context.js';
import {Redirect,Route} from 'react-router-dom'
import React, {Component} from 'react'
import Cookies from 'js-cookie';

const   PrivateRoute=  ({component:Component,...rest})=>{

    
    
   return(
       <UserConsumer>
           {context=>(
               <Route
               {...rest}
               render={props=> context.authentication? (<Component {...props}/>):(<Redirect to="/signup-UserSignUp"/>)}/>
           )}
       </UserConsumer>
   )
}


export default PrivateRoute