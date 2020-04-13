import React,{Component} from 'react';
import './App.css';
import Provider from './components/Context.js'
import {BrowserRouter,
       Router,
       Route,
       Switch,
       Redirect} from 'react-router-dom';
import Header from './components/Header.js';
import Courses from './components/Courses.js';
import withContext from './components/Context.js';
import CourseDetail from './components/CourseDetail.js';
import UpdateCourse from './components/UpdateCourse.js';
import UserSignIn from './components/UserSignIn.js';
import UserSignOut from './components/UserSignOut.js';
import CreateCourse from './components/CreateCourse.js';
import UserSignUp from './components/UserSignUp.js';
import PrivateRoute from './components/PrivateRoute.js'
import NotFound from './components/Notfound.js'
import Forbidden from './components/Forbidden.js'
import UnhanddledError from './components/UnhanddledError.js'







const CoursesWithContext= withContext(Courses)
const CourseDetailContext=withContext(CourseDetail)
const CourseUpdateContext= withContext(UpdateCourse)
const SignInContext=withContext(UserSignIn)
const SignOutContext=withContext(UserSignOut)
const CreateCourseContext=withContext(CreateCourse)
const SignUpContext=withContext(UserSignUp)

class  App extends Component {
   constructor(props){
     super(props);
     this.state={
       authentication:null
     }
   }


   
   render(){
     
  return (
    
    <div className="App">
    <BrowserRouter>
      
        <Header/>
        <Switch>
        <Route   exact path="/" component={CoursesWithContext}/>
        <Route   exact path="/courses" component={CoursesWithContext}/>
        <Route   exact path="/courses/:id" component={CourseDetailContext}/>
        <PrivateRoute  exact path="/courses/:id/update" component={CourseUpdateContext}/>
        <PrivateRoute  exact path="/courses/create" component={CreateCourseContext}/>
        <Route   exact path="/signin-UserSignIn" component={SignInContext}/>
        <Route   exact path="/signup-UserSignUp"  component={SignUpContext}/>
        <Route  exact path="/signout-UserSignOut"component={SignOutContext}/>
        <Route  exact path="/forbidden"   component={Forbidden}/>
        <Route exact path="/UnhanddledError" component={UnhanddledError}/>
        <Route  path="/notFound" component={NotFound}/>
        <Route   component={NotFound}/>
        </Switch>
         
      
    
    </BrowserRouter>
     
    </div>
  );
}
}
export default App;
