import multer from 'multer';
// const storage = multer.diskStorage({
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB file size limit
});
