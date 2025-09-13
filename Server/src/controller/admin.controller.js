import bcrypt from 'bcryptjs';
const { genSaltSync, hashSync, compareSync } = bcrypt;
import { Admin } from '../models/admin.model.js';
import jsonwebtoken from 'jsonwebtoken';
const { sign } = jsonwebtoken;

export const createUser = async (req, res) => {
    try {
        const body = req.body;
        const check = await Admin.getUserByEmail(body.email);
        if(check){
            return res.status(400).json({
                success: 0,
                message: "Already registered"
            });
        }
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);


        // Call the User service to create a new user
        const results = await Admin.create(body);

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
        const results = await Admin.getUserByEmail(body.email);
        
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
        const { phonenumber, hostelname } = req.body;
        // Check if the required fields are provided
        if (!phonenumber && !hostelname) {
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
        const results = await Admin.updateUser({ phonenumber, hostelname }, email);

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

export const getAllUser = async (req, res) => {
    try {
        
        // Correctly access the hostel name from the decoded token
        const hostelname = req.user?.result?.hostelname;
        console.log(hostelname);
        if (!hostelname) {
            return res.status(400).json({
                success: 0,
                message: "Hostel not found in token"
            });
        }

        // Call the User service to update the user details
        const results = await Admin.getAllUsersByHostel(hostelname);

        if (!results) {
            return res.status(400).json({
                success: 0,
                message: "Nothing found"
            });
        }
        
        return res.status(200).json({
            success: 1,
            data:results
        });

    } catch (error) {
        return res.status(500).json({
            success: 0,
            message: "Server error"
        });
    }
};

export const roomAllot = async (req, res) => {
    try {
        const roomno=req.body.roomno;
        const student_email=req.body.email
        if (!roomno) {
            return res.status(400).json({
                success: 0,
                message: "No room number send"
            });
        }

        // Call the User service to update the user details
        const results = await Admin.allotRoom(student_email,roomno);

        if (!results) {
            return res.status(400).json({
                success: 0,
                message: "Error while updating room"
            });
        }
        
        return res.status(200).json({
            success: 1,
            data:results
        });

    } catch (error) {
        return res.status(500).json({
            success: 0,
            message: "Server error"
        });
    }
};

export const getAllPendingUser = async (req, res) => {
    try {
        const hostelname = req.user?.result?.hostelname;
        console.log('Hostel name from token:', hostelname);

        if (!hostelname) {
            return res.status(400).json({
                success: 0,
                message: "Hostel not found in token"
            });
        }

        const results = await Admin.usersRoomPending(hostelname);

        if (!results || results.length === 0) {
            return res.status(404).json({
                success: 0,
                message: "No pending users found"
            });
        }
        
        return res.status(200).json({
            success: 1,
            data: results
        });

    } catch (error) {
        console.error("Error fetching pending users:", error);
        return res.status(500).json({
            success: 0,
            message: "Server error"
        });
    }
};

export const getVacantRoom = async (req, res) => {
    try {
        const hostelname = req.user?.result?.hostelname;
        console.log('Hostel name from token:', hostelname);

        if (!hostelname) {
            return res.status(400).json({
                success: 0,
                message: "Hostel not found in token"
            });
        }

        const results = await Admin.vacantRoom(hostelname);

        if (!results || results.length === 0) {
            return res.status(404).json({
                success: 0,
                message: "No pending users found"
            });
        }
        
        return res.status(200).json({
            success: 1,
            data: results
        });

    } catch (error) {
        console.error("Error fetching pending users:", error);
        return res.status(500).json({
            success: 0,
            message: "Server error"
        });
    }
};

export const getOccupiedRoom = async (req, res) => {
    try {
        const hostelname = req.user?.result?.hostelname;
        console.log('Hostel name from token:', hostelname);

        if (!hostelname) {
            return res.status(400).json({
                success: 0,
                message: "Hostel not found in token"
            });
        }

        const results = await Admin.occupiedRoom(hostelname);

        if (!results || results.length === 0) {
            return res.status(404).json({
                success: 0,
                message: "No pending users found"
            });
        }
        
        return res.status(200).json({
            success: 1,
            data: results
        });

    } catch (error) {
        console.error("Error fetching pending users:", error);
        return res.status(500).json({
            success: 0,
            message: "Server error"
        });
    }
};


