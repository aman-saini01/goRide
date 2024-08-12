const cloudinary = require("cloudinary").v2
exports.imageUploader = async (file, folder, height, quality) => {
    
        const options = {folder}
        if (height){
            options.height = height
        }
        if(quality){
            options.quality = quality
        }
        options.resource_type = "auto"
        console.log("options",options)
        return await cloudinary.uploader.upload(file.tempFilePath, options)
    }