import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import config from '../config/config';

const generateFile = async (
  files: Express.Multer.File[],
  customPath: string
): Promise<
  Array<{
    filename: string;
    destination: string;
    fieldname: string;
    encoding: string;
    mimetype: string;
    size: number;
  }>
> => {
  const saveToPath = path.resolve(__dirname, '..', 'public', 'uploads', customPath);

  if (!fs.existsSync(saveToPath)) {
    fs.mkdirSync(saveToPath, { recursive: true });
  }
  for (const file of files) {
    try {
      const filename = `${Date.now()}.jpeg`;
      const filePath = path.join(saveToPath, filename);
      await sharp(file.buffer).jpeg({ quality: 70 }).toFile(filePath);
      file.filename = filename;
      file.destination = config.BASE_URL + '/public/uploads/' + customPath + '/' + filename;
    } catch (err) {
      console.log('🚀 ~ uploadedFiles ~ err:', err);
    }
  }
  return files.map((file) => {
    return {
      filename: file.filename,
      destination: file.destination,
      fieldname: file.fieldname,
      encoding: file.encoding,
      mimetype: file.mimetype,
      size: file.size
    };
  });
};

export { generateFile };
