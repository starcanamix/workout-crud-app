import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: "3d"});
}

export const singup = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.signup(email, password);
        const token = createToken(user._id);

        res.status(200).json({email, token});
    }
    catch(err) {
        console.log(`Error: ${err.message}`);
        res.status(400).json({error: err.message});
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);

        res.status(200).json({email, token});
    }
    catch(err) {
        console.log(`Error: ${err.message}`);
        res.status(400).json({error: err.message});
    }
}