import React from 'react';
import {Redirect,Link} from 'react-router-dom'
import { HeaderContext } from '../App';



export default  (props) => {
  
      props.context.signOut()

return(
    <div>
    
    <Redirect to="/courses"/>
    </div>
)
}