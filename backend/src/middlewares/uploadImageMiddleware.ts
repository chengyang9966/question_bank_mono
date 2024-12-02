import { upload } from '../config/multer';

import { NextFunction, Request, Response } from 'express';
const uploadImageMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const uploadedFiles = upload.array('files');

  uploadedFiles(req, res, async (err) => {
    if (err) {
      try {
        switch (err.code) {
          case 'LIMIT_INVALID_TYPE':
            throw new Error('Invalid file type! Only PNG and JPEG are allowed');

          case 'LIMIT_FILE_SIZE':
            throw new Error('File size is too large! Max size is 2MB');

          default:
            throw new Error('Something went wrong!');
        }
      } catch (err) {
        res.status(400).json({ message: err });
        return;
      }
    }
    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return res.status(400).json({ message: 'No file uploaded!' });
    }

    next();
  });
};

export default uploadImageMiddleware;
