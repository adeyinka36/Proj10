import React, {Component} from 'react'
import { render } from 'react-dom';
import Cookies from 'js-cookie';

export default class Data extends Component{

    constructor(props){
       super(props);
       this.state={
        authentication:Cookies.getJSON('authenticatedUser') || null,
          emailAddress:"",
          password:""
       }
     
    }
deleteCourse(val,emailAddress,password){
    return fetch(`http://localhost:5000/api/courses/${val}`,{
        method:"DELETE",
        headers: new Headers({
       "Authorization": "Basic "+ btoa(emailAddress+":"+password)
     })
})
}
   updateCourse(val,obj,emailAddress,password){
       return fetch(`http://localhost:5000/api/courses/${val}`,{
        method:"put",
        headers:{
           'Content-Type': 'application/json',
           'Authorization': "Basic "+ btoa(emailAddress+":"+password)  
        },
        body: JSON.stringify(obj)
})
   }
    getCourses(){
       return  fetch(`http://localhost:5000/api/courses`)

    }
    getCourseDetail(val){
        return fetch(`http://localhost:5000/api/courses/${val}`)
    }
    updateCourse(val){
        return fetch(`http://localhost:5000/api/courses/${val}`)
    }

     signIn  =(emailAddress,password)=>{
        const user={emailAddress,password}
         console.log(this.state.emailAddress)
        // let encodedCrendtials=btoa(`${login}:${password}`)
        return fetch(`http://localhost:5000/api/users`,{
             method:"GET",
             headers: new Headers({
            "Authorization": "Basic "+ btoa(emailAddress+":"+password)
          })
    })

} 

createNewCourse(obj,emailAddress,password){
    return fetch(`http://localhost:5000/api/courses/`,{
             method:"POST",
             headers:{
                'Content-Type': 'application/json',
                'Authorization': "Basic "+ btoa(emailAddress+":"+password)  
             },
             body: JSON.stringify(obj)
    })
}




createUser(obt){
    return fetch(`http://localhost:5000/api/users`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(obt)
});
  
}

signOut(){
    Cookies.remove("authenticatedUser")
    Cookies.remove("authenticatedUserNum")
console.log("user signed out")
}

}