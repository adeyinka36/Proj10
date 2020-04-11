import React, {Component} from 'react'
import Link from 'react-router-dom'
import Data from './Data.js';
import Cookies from 'js-cookie';

const courseContext= React.createContext();

export const UserConsumer= courseContext.Consumer




export class Provider extends Component{
    constructor(){
        super();
        this.data=new Data()
        this.state={
            authentication:null
        }
        }
    
  
render(){
    
    const value ={
         authentication:this.state.authentication,
        data:this.data
          }

    return (
      <courseContext.Provider value={value}>
      {this.props.children}
      </courseContext.Provider>
    )
}






}

export default function withContext(Component) {
    return function ContextComponent(props) {
      return (
        <courseContext.Consumer>
          {context => <Component {...props} context={context} />}
        </courseContext.Consumer>
      );
    }
  }