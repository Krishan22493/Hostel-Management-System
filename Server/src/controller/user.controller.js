import bcrypt from 'bcryptjs';
const { genSaltSync, hashSync, compareSync } = bcrypt;
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import jsonwebtoken from 'jsonwebtoken';
const { sign } = jsonwebtoken;

// Controller for creating a new user
export const createUser = async (req, res) => {
    try {
        const body = req.body;
        // Generate salt and hash the password
        const check = await User.getUserByEmail(body.email);
        if(check){
            return res.status(400).json({
                success: 0,
                message: "Already registered"
            });
        }
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        // Check for image in the request
        const idLocalPath = req.files?.idcard?.[0]?.path;
        if (!idLocalPath) {
            return res.status(400).json({
                success: 0,
                message: "ID card file required"
            });
        }

        // Upload on Cloudinary
        const idcard = await uploadOnCloudinary(idLocalPath);

        if (!idcard) {
            return res.status(400).json({
                success: 0,
                message: "Failed to upload ID card"
            });
        }

        body.idcard = idcard.url;

        // Call the User service to create a new user
        const results = await User.create(body);

        return res.status(200).json({
            success: 1,
            data: results
        });

    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
            success: 0,
            message: "Database connection error"
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const body = req.body;

        // Check if email and password are provided
        if (!body.email || !body.password) {
            return res.status(400).json({
                success: 0,
                message: "Email and password are required"
            });
        }

        // Call the User service to find user by email
        const results = await User.getUserByEmail(body.email);
        
        if (!results) {
            return res.status(400).json({
                success: 0,
                message: "Invalid user"
            });
        }

        // Compare provided password with stored hashed password
        const isPasswordValid = compareSync(body.password, results.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                success: 0,
                message: "Wrong credentials"
            });
        }

        // Exclude password from response data
        results.password = undefined;

        // Sign a JWT token
        const jsontoken = sign(
            { result: results },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY } // Ensure this is defined in your .env
        );

        // Set token as a cookie with options
        const options = {
            httpOnly: true, // Secure the cookie
            secure:true
        };

        return res
            .status(200)
            .cookie("token", jsontoken, options)
            .json({
                success: 1,
                message: "Login successful",
                data: results,
                token:jsontoken
            });

    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            success: 0,
            message: "Server error"
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const {phonenumber} = req.body;
        // Check if the required fields are provided
        if (!phonenumber) {
            return res.status(400).json({
                success: 0,
                message: "Nothing to update"
            });
        }
        
        // Correctly access the email from the decoded token
        const email = req.user?.result?.email;

        if (!email) {
            return res.status(400).json({
                success: 0,
                message: "Email not found in token"
            });
        }

        // Call the User service to update the user details
        const results = await User.updateUser({ phonenumber}, email);

        if (!results || results.affectedRows === 0) {
            return res.status(400).json({
                success: 0,
                message: "Update failed"
            });
        }
        
        return res.status(200).json({
            success: 1,
            message: "Updated successfully"
        });

    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({
            success: 0,
            message: "Server error"
        });
    }
};



