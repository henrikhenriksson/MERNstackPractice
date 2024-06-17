const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(' ')[1]; // split into array by the blankspace, get the token in index 1 of the resulting array

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //  get user from the token:
      req.user = await User.findById(decoded.id).select("-password"); // dont include the password
      next(); // call the next part of the middleware
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, no token");
  }
});

module.exports = { protect };
