import * as dotenv from 'dotenv'
dotenv.config()

import cloudinary from 'cloudinary'
// Configuration
cloudinary.v2.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret, // Click 'View Credentials' below to copy your API secret
    secure: true
});


export async function uploader({path,folderPath}) {
   
        return await cloudinary.v2.uploader.upload(path, {
            folder: `${process.env.APP_NAME}/${folderPath}`
        })
   
    
}

export default cloudinary.v2 