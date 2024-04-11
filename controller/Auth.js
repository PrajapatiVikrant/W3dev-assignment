require('dotenv').config()
require('../config/db')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User')
const Auth = {
    signUp: async (req, res) => {
        try {
          const { name, email, password } = req.query;
      
          const hashedPassword = await bcrypt.hash(password, 10);
      
          const user = new User({
            name,
            email,
            password: hashedPassword,
            data:[]
          });
      
          await user.save();
          const token = jwt.sign({ email:email }, process.env.JWT_SECRET, { expiresIn: '1h' });
          
          res.json({ token });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      },
    Login:async (req, res) => {
        try {
        
          const { email, password } = req.query;
          console.log(email)
          const user = await User.findOne({ email:email });
          console.log(user)
      
          if (!user) {
            console.log('hello,I am running')
            return res.json({ message: 'Invalid credentials' });
          }
      
          const isPasswordValid = await bcrypt.compare(password, user.password);
          console.log(isPasswordValid)
          if (!isPasswordValid) {
            return res.json({ message: 'Invalid credentials' });
          }
      
          const token = jwt.sign({ email:email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      
         res.json({ 
             token:token,
             message:"Login successfully"
          });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      }
}
module.exports = Auth