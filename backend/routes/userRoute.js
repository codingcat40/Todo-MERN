import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt'

const router  = express.Router();


// to get the session info
router.get("/check-session", (req, res) => {
  if(req.session.userId){
    res.json({loggedIn: true, userId: req.session.userId})
  }
  else{
    res.json({loggedIn:false})
  }


});



// user signup route
router.post('/user/post', async (req, res) => {
    try {
            const {name, email, password} = req.body;
            const user = await User.findOne({email: email});

            if(user){
                res.status(400).json({success: false, message: "User alredy exists!"});
            }
            else{
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = await User.create({name, email, password: hashedPassword});
                req.session.userId = newUser._id;
                res.status(200).json({success: true, message: `Created a new user ${newUser}`});
            }

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
})



// user login Route
router.post('/user/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email})

        if(!user){
            res.json({success: false, message: "Could not find User!"});
        }
        else{
            bcrypt.compare(password, user.password, (err, result) => {
                if(err){
                    res.json({success: false, message: 'Error occured during password comparison!'})
                    return;
                }

                if(result){
                    req.session.userId = user._id;
                    req.session.save(errr => {
                        if(errr){
                            console.log("Session Save Error: ", errr);
                            return res.status(500).json({success:false, message: "Session save failed"})
                        }
                                            res.json({success: true, message: 'User Authenticated'})

                        
                    })

                }
                else{
                    res.json({success: false, message: 'Authentication Failed!'})
                }
                
            })
        }
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
})



// logout route
router.post('/user/logout', (req, res) => {
    if(req.session){
        req.session.destroy(err => {
            if(err){
                console.error(err)
                res.status(500).send('Failed to Destroy the session');
            }
            res.clearCookie('connect.sid');
            return res.status(200).json('Logout Successful');
        })
    }
    else{
        return res.status(200).json('No active session');
    }
})

export default router;
