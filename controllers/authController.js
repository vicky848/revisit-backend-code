const {JWT_SECRET } = require("../config");
const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require('jsonwebtoken'); 


// Sign up 


exports.signup = async (request, response) =>{
    const {username, email, password } = request.body 


   try {

    let user = await User.findOne({
        email
    });
    if(user){
        return response.status(400).json({msg:"User Already Exists"});
    }
    user = new User({username, email, password});

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password , salt);
       

       await user.save()



       const payload = {
        user:{
            id:user.id 
        }
       };

    jwt.sign(payload , JWT_SECRET , {
        expiresIn:"1h"
    },
     (err, token) => {
        if (err)throw err;
        response.status(200).json({token});
     }


);


   }catch(error){
    console.log(error.message)
    response.status(500).send("Error is Saving")
   }



}



// Login 



exports.login = async (request, response) => {
    const {email, password} = request.body 

    try {
        let user = await User.findOne({
            email
        }); 

        if(!user)
           return response.status(400).json({message: "User Not Exist"});


        const isMatch = await bcrypt.compare(password, user.password);

          if (!isMatch) 
              return response.status(400).json({message: "Incorrect Password"});


          const payload = { user: {id:user.id}};


          jwt.sign(payload, JWT_SECRET, {
                    expiresIn:3600
                  }, 
                  (err, token) => {
                    if (err)throw err; 
                    response.status(200).json({token});

                  });


    } catch(err) {
        console.error(err) 
        response.status(500).json({message:"Server Error"})
    }




}


