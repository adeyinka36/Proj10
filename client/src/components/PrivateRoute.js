import {UserConsumer} from  './Context.js';
import {Redirect,Route} from 'react-router-dom'
import React from 'react'

const   PrivateRoute=  ({component:Component,...rest})=>{

 
    console.log("here")
   return(
       <UserConsumer>
           {context=>(
               <Route
               {...rest}
               render={props=> context.data.state.authentication? (<Component {...props}/>):(<Redirect to="/signup-UserSignUp"/>)}/>
           )}
       </UserConsumer>
   )
}


export default PrivateRoute