import AWS from "aws-sdk";
import multerS3 from "multer-s3";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,        // set in .env
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // set in .env
  region: process.env.AWS_REGION,                     // e.g., "ap-south-1"
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME,              // your S3 bucket
    acl: "public-read",                               // or "private"
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const fileName = `profiles/${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const ext = file.originalname.toLowerCase();
    if (allowed.test(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

export const profileImageUpload = upload.single("profilePicture");
