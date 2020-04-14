import React from 'react';


export default (props) => {
  
  props.context.data.signOut()
//  return props.history.push("/courses")
return(
    <h1>You are signed Out</h1>
)
}