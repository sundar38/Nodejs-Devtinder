const jwt= require("jsonwebtoken");
const userModal = require("../models/user");


const userAuth= async(req, res, next)=> {
     try {
        const { token } = req.cookies;
        if (!token) {
          return res.status(401).json({ message: "Please login first" });
        }
        const { _id } = jwt.verify(token, process.env.JWT_TOKEN_ENCRYPTION_STRING)
        const user = await userModal.findById(_id);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        req.user= user;
        next();
      } catch (err) {
        res.status(401).json({ message: err.message });
      }
}

module.exports = {
    userAuth,
}