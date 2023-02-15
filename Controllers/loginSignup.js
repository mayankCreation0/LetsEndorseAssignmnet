const models = require("../Models/userSignup");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose= require("mongoose");
require("dotenv").config();

const signup = async (req, res) => {
    const { email,password,mobile,fullName} = req.body;
    try {
        const existingUser = await models.findOne({
            email: email,
        });
        if (existingUser) {
            return res.status(400).json("User Already Registered");
        }
        const hashedPassword = await bcrypt.hash(password, 11);
        const hashedemail = await bcrypt.hash(email, 11);
        const hashedmobile = await bcrypt.hash(mobile, 11);
        const hashedname = await bcrypt.hash(fullName, 11);
        
        await models.create({
            email: email,
            password: hashedPassword,
            fullName: hashedname,
            mobile: hashedmobile
        });
        res.status(201).json("User Registered");
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "something went wrong" });
    }
};
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await models.findOne({ email: email });
        if (!existingUser) {
            return res.status(500).json({ message: "User not found" });
        }
        else{
        const match = bcrypt.compare(password, existingUser.password);
            console.log(existingUser._id);
            if (match) {
                const token = jwt.sign({ id: existingUser._id, email: existingUser.email, mobile: existingUser.mobile },process.env.SECRET_KEY, { expiresIn: '24h' });
                res.status(200).send({ token: token });
            } else {
                res.status(401).send({ error: 'Invalid email or password' });
            }
            
    }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Something went wrong" });
    }
};
const resetpassword = async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;
    try {
        const existingUser = await models.findOne({ email: email });
        if (!existingUser) {
            return res.status(500).json({ message: "User not found" });
        } else {
            const match = await bcrypt.compare(oldPassword, existingUser.password);
            if (match) {
                const hashedPassword = await bcrypt.hash(newPassword, 10);
                existingUser.password = hashedPassword;
                await existingUser.save();
                return res.status(200).json({ message: "Password updated successfully" });
            } else {
                return res.status(500).json({ message: "Old password is incorrect" });
            }
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

const updateData =  async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const { fullName, email, mobile } = req.body;

    try {
        const existingUser = await models.findOne({ _id: mongoose.Types.ObjectId(req.params.id) });
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        const encryptedName = bcrypt.hashSync(fullName, 10);
        // const encryptedEmail = bcrypt.hashSync(email, 10);
        const encryptedPassword = bcrypt.hashSync(mobile, 10);
        existingUser.name = encryptedName;
        existingUser.email = email;
        existingUser.password = encryptedPassword;
        await existingUser.save();

        res.status(200).json({ message: 'User details updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }

};


module.exports = {
    login,
    signup,
    resetpassword,
    updateData
};
