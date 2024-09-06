
import multer from "multer";
export const FileValidation={
    image:["image/jpeg","image/png","image/gif",'image/jpg'],
    file:["application/pdf,application/msword"]
}
export const fileUplouder=(customValidation=[])=>{

    const storage=multer.diskStorage({})
    function fileFilter(req,file,cb){

        if(customValidation.includes(file.mimetype)){
            cb(null,true)
        }else{
            cb('in-vaild file format',false)
        }

    }
    const uploud=multer({storage,fileFilter})
    return uploud
}