import React from 'react';
import { Redirect } from 'react-router-dom';

export default (props) => {
  
  props.context.data.signOut()


  return (
      
     <Redirect to="/courses" />
  );
}