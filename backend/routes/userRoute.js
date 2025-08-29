import express from 'express';
import User from '../models/userModel.js';

const router  = express.Router();

// user signup route

router.post('/user/post', async (req, res) => {
    try {
            const {name, email, password} = req.body;
            const user = await User.findOne({email: email});

            if(user){
                res.status(400).json({success: false, message: "User alredy exists!"});
            }
            else{
                const newUser = await User.create({name, email, password});
                res.status(200).json({success: true, message: 'Created a new user'});
            }

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }


    // console.log("Submitted Data: " + name, email, password);
    // res.json({message: "User signup data received", user: {name, email}});
})

export default router;
