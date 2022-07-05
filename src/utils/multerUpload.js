import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: path.join(process.cwd(), './public/uploads'),
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.fieldname}-${file.originalname}`)
    },
})

const upload = multer({
    storage:storage,
    limits: {fileSize:1000000000},
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|gif|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if(mimetype && extname){
            return cb(null, true)
        }
        cb('Error: El el archivo debe tener una extensión válida - jpg|jpeg|gif|png - max 1mb')
    }
}).single('avatar');

export default upload