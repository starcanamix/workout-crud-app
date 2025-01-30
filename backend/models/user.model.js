import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});


userSchema.statics.signup = async function(email, password) {
    if(!email || !password) throw Error("Please fill in all the fields!");
    if(!validator.isEmail(email)) throw Error("Invalid email format!");
    if(!validator.isStrongPassword(password)) throw Error("Password not strong enough!");

    const emailExists = await this.findOne({email});
    console.log(emailExists);
    
    if(emailExists) throw Error("Email is already in use!");

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({email, password: hash}); 

    return user;
}

userSchema.statics.login = async function(email, password) {
    if(!email || !password) throw Error("Please fill in all the fields!");

    const user = await this.findOne({email});
    if(!user) throw Error("Invalid email!");

    const matchPasswords = await bcrypt.compare(password, user.password);
    if(!matchPasswords) throw Error("Incorrect password!");

    return user;
}

const User = mongoose.model("User", userSchema); 

export default User;