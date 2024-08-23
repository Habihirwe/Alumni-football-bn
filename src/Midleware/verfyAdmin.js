import User from "../Model/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const verifyAdmin = async (req, res, next) => {
  try {
    const verifyToken = req.headers["auth_token"];
    if (!verifyToken) {
      return res.status(401).json({
        status: "fail",
        unauthorizedAccess: "Access denied, Please login!",
      });
    }
    // console.log(verifyToken)
    const decodedToken = jwt.verify(
      verifyToken,
      process.env.JWT_SECRET,
      (err, value) => {
        if (err) {
          res.status(401).json({
            status: "fail",
            unauthorized: "You are not allowed to peform this action",
          });
        } else {
          return value;
        }
      }
    );

    req.user = decodedToken.id;

    const loggeInUser = await User.findOne({ _id: req.user });
    const userRole = loggeInUser.role;

    if (userRole !== "admin") {
      return res.status(401).json({
        status: "fail",
        unauthorized: "You are not allowed to peform this action",
      });
    }

    next();
  } catch (err) {
    res.status(500).json({
      status: "fail",
      error: err.message,
    });
  }
};

export default verifyAdmin;