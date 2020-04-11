import {UserConsumer} from  './Context.js';
import {Redirect,Route} from 'react-router-dom'
import React, {Component} from 'react'
import Cookies from 'js-cookie';

const   PrivateRoute=  ({component:Component,...rest})=>{

    const val=false
    
   return(
       <UserConsumer>
           {context=>(
               <Route
               {...rest}
               render={props=> context.data.state.val? (<Component {...props}/>):(<Redirect to="/signup-UserSignUp"/>)}/>
           )}
       </UserConsumer>
   )
}


export default PrivateRoute