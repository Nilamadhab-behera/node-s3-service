import express from 'express';
import * as fileContoller from "../controllers/file.controller.js";
import { uploadLimit5Mb } from '../middlewares/uploadLimit5Mb.js';

const router = express.Router();

router.route('/upload-file').post(uploadLimit5Mb.single('profile_pic'), fileContoller.handleFileUpload);
router.route('/multipart/initiate').post(fileContoller.handleHeavyFileUpload);
router.route('/multipart/complete').post(fileContoller.handleLargeFileCompleteUpload);

export default router;