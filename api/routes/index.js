const express = require('express');
const router= express.Router();
const models= require('../models');
const bcrypt = require('bcryptjs');
const auth = require('basic-auth');
const { User }= models;
const { Course }= models;


// authentication middlewear

const authenticate= async (req,res,next)=>{
  
   let  message = null
   const credentials= auth(req)
   
   if(credentials){
     console.log("here it is")
     console.log(credentials)
       let  gottenUsers =  await User.findAll();
       gottenUsers=gottenUsers.map(u=>u.toJSON());

       const foundUser = gottenUsers.find(u=>u.emailAddress===credentials.name);

        if(foundUser){
            const authenticated = bcrypt.compareSync(credentials.pass, foundUser.password);
        
            if(authenticated){
            req.currentUser = foundUser
            }
            else{
            message= "Incorrect password "
            }
        }else{
            message= "User not found"
        }
    

    }else{
        message="Plese provide credentials"
    }
  if(message){
      const err = new Error(message)
      err.status=401
      next(err)
  }
  else{
      next()
  }

}





// function for validating  e-mail with regular expression
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

// home route
// setup a friendly greeting for the root route
router.get('/',(req, res) => {
      
    
    res.json({
      message: 'Welcome to the REST API project!',
    });
  });

  
//   return currently authenticated user
  router.get('/users',authenticate,async (req,res)=>{
     
     user=req.currentUser
    res.status(200).json({id:user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress})
  });

  
  
 // Creates a user, sets the Location header to "/", and returns no content 
  router.post('/users',async(req,res,next)=>{
      const userPassword = req.body.password
      const email=req.body.emailAddress
      const emailValidationResult= validateEmail(email);
      
      let  dataBaseEmails= await User.findAll();
         dataBaseEmails= dataBaseEmails.map(m=>m.toJSON())


         const doesEmailAlreadyExist= dataBaseEmails.find(e=>e.emailAddress===email)
         if(!req.body.emailAddress&&!req.body.password&&!req.body.firstName&!req.body.lastName){res.status(400).json({message:"Please provide values for all input fields"})}
         if(!req.body.password&&!req.body.emailAddress){res.status(400).json({message:"Please provide valid emailaddress and password"})}
         if(!req.body.password){res.status(400).json({message:"Please provide valid  password"})}
         if(!req.body.emailAddress){res.status(400).json({message:"Please provide valid emailaddress"})}
         if(!req.body.firstName){res.status(400).json({message:"Please make sure name fields are filled"})}
         if(!req.body.lastName){res.status(400).json({message:"Please make sure name fields are filled"})}
if(emailValidationResult && !doesEmailAlreadyExist ){
    if(!req.body.password){ return res.status(400).json({message:"please provide valid password"})}

      try{
          req.body.password=bcrypt.hashSync(req.body.password)
          const data=  await User.build(req.body)
          await data.save()
          console.log("sucess")

        res.setHeader("location","/")
        return res.status(201).end()
      }catch(error){
        if(error.name=== 'SequelizeValidationError'){
            const errors = error.errors.map(err => err.message);
            console.error('Validation errors: ', errors);
            return res.status(400).json(errors)
        }
        
        console.log(`this is not a validation error: ${error}`)
        return res.status(500).json({message:"Sorry there was an error on the server side"})
      }
    }
    else{
      console.log("invalid email or email already exists")
       return res.status(400).json({message:"Invalid email or email already exists"})
    }
  });

  
  
  // Returns a list of courses
  router.get('/courses',async (req,res)=>{
        let courses = await Course.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        include: [
          {
            model: User,
            attributes: {
              exclude: ["password", "createdAt", "updatedAt"]
            }
          }
        ]
      });
       courses = courses.map(c=>c.toJSON())
     
   res.status(200).json(courses)
  }) 

  
// Returns course including users that own course for that id
  router.get('/courses/:id',async (req,res)=>{
    try{
    let  course = await Course.findByPk(req.params.id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        include: [
          {
            model: User,
            attributes: {
              exclude: ["password", "createdAt", "updatedAt"]
            }
          }
        ]
      });
  
    course=course.toJSON()
    

    
   res.status(200).json(course)
    }
    catch(err){
      console.log("course not found")
      res.status(404).end()
    }
  }) 

  //Creates a course, sets the Location header to the URL for the course, and returns no content
  router.post('/courses/',authenticate, async (req,res,next)=>{
      
     try{
       
         req.body.userId=req.currentUser.id
         const newCourse = await   Course.build(req.body)
          await newCourse.save()
          let  data= await Course.findAll({where:{"title":req.body.title}})
          data  =  data.map(m=>m.toJSON())
          console.log(data)
        
        res.setHeader("location",`api/courses/${data[0].id}`)
        return res.status(201).end()
        
     }catch(error){
         if(error.name==="SequelizeValidationError"){
             const errors = error.errors.map(err=>err.message)
             console.log(`there were the following validation errors : ${errors}`)
            return  res.status(400).json(errors)
         }
         console.log(`this is not a validation error: ${error}`)
         return res.status(500).json({message:"server error"})
         
     }
    
  }) 


  //Updates a course and returns no content
  router.put('/courses/:id',authenticate, async (req,res)=>{
    console.log("passed")
    let  userCourse = await Course.findByPk(req.params.id)
    userCourse= userCourse.toJSON()
    const userIdofCourse= userCourse.userId
    console.log("yaii")
    console.log(req.body)
    if(req.body.title && req.body.description){
     if (req.currentUser.id===userIdofCourse){
         
      try{
        console.log("here")
        console.log(req.body)
        const updateCourse = await Course.findByPk(req.params.id);
        await  updateCourse.update(req.body,{where:{id:req.params.id}});
        
        res.status(204).end()
      
    }catch(error){
        if(error.name==="SequelizeValidataionError"){
            console.log(`we have this validation error ${error}`)
        return res.status(403).json({message:"Please provide value for title and description"})
        }
        else{
            console.log(error)
           return res.status(500).end()
            
        }
      }
}
else{
   res.status(403).json({message:"you do not have access to this course"})
}
    }
    else{
      if(!req.body.title && !req.body.description){
        console.log("no detal")
        return   res.status(400).json({message:"please enter value for title and description"})}
      
      if(!req.body.title){
      console.log("no title")
      return   res.status(400).json({message:"please enter value for title "})}
      if(!req.body.description){
        console.log("no description")
        return   res.status(400).json({message:"please enter value for description"})
      }
      
    }
})


    // Deletes a course and returns no content
  router.delete('/courses/:id',authenticate,async (req,res)=>{
    const userCourse = await Course.findByPk(req.params.id)
    if (!userCourse){return res.status(404).json({message:"Course not found"})}
    const userIdofCourse= userCourse.userId
    if (req.currentUser.id===userIdofCourse){
       const courseTodelete = await Course.findByPk(req.params.id)
      await courseTodelete.destroy()
      
    res.status(204).end()
}
 else{
     res.status(400).json({message:"you do not have access to this course"})
 }
})


module.exports= router
