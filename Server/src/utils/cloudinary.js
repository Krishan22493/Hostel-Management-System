// here we will send file from server to cloudinary
import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

 // Configuration
    cloudinary.config({ 
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME , 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

// Upload
const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if(!localFilePath)return null;
        // upload on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })

        // console.log("File uploaded on cloudinary",response.url);
        fs.unlinkSync(localFilePath) // file will remove locally
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove locally saved file from server
        console.log("File not uploaded on cloudinary",error)
        return null;
    }
}

export {uploadOnCloudinary}

