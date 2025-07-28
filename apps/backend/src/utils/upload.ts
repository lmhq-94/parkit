import { Request } from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { logger } from './logger';

// Ensure upload directory exists
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const type = req.params.type || 'general';
    const typeDir = path.join(uploadDir, type);

    if (!fs.existsSync(typeDir)) {
      fs.mkdirSync(typeDir, { recursive: true });
    }

    cb(null, typeDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File filter
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'text/plain'
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`File type ${file.mimetype} is not allowed`));
  }
};

// Configure multer
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 5 // Max 5 files
  }
});

// Specific upload configurations
export const evidenceUpload = upload.fields([
  { name: 'photos', maxCount: 5 },
  { name: 'documents', maxCount: 3 }
]);

export const avatarUpload = upload.single('avatar');

export const qrCodeUpload = upload.single('qrCode');

// File validation
export function validateFile(file: Express.Multer.File): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return { valid: false, error: 'File too large. Maximum size is 5MB' };
  }

  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf'
  ];

  if (!allowedTypes.includes(file.mimetype)) {
    return { valid: false, error: 'File type not allowed' };
  }

  return { valid: true };
}

// File cleanup
export function deleteFile(filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        logger.warn(`Failed to delete file: ${filePath}`, { error: err.message });
        reject(err);
      } else {
        logger.debug(`File deleted: ${filePath}`);
        resolve();
      }
    });
  });
}

// Get file URL
export function getFileUrl(filePath: string): string {
  const baseUrl = process.env.BASE_URL || 'http://localhost:4000';
  return `${baseUrl}/uploads/${filePath}`;
}

// File info
export function getFileInfo(file: Express.Multer.File) {
  return {
    originalName: file.originalname,
    filename: file.filename,
    path: file.path,
    size: file.size,
    mimetype: file.mimetype,
    url: getFileUrl(file.path.replace(uploadDir, '').replace(/\\/g, '/'))
  };
}
