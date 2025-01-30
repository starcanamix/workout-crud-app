import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const requireAuth = async (req, res, next) => {
    const {authorization} = req.headers;

    if(!authorization) throw Error("Authorization token required");

    const token = authorization.split(" ")[1];

    try {
        const {_id} = jwt.verify(token, process.env.SECRET);        
        const user = await User.findOne({_id}).select('_id');
        if(!user) throw Error("User not found!");
        req.user = user._id.toString();
        next();
    }
    catch(err) {
        console.log(`Error: ${err.message}`);
        res.status(401).json({message: "Request is not authorized!"});
    }
}

export default requireAuth;