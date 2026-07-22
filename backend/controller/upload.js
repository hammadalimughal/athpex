const express = require('express');
const router = express.Router();
const { uploadPdf, uploadImage, uploadVideo, uploadUniversal } = require('../utils/upload');

// Helper to normalize backend system path to clean relative web path
const normalizePath = (filePath) => {
    if (!filePath) return '';
    return filePath.replace(/\\/g, '/').replace(/^\.\/views\//, '').replace(/^views\//, '').replace(/^\//, '');
};

// 1. Image Upload (Passport/License Photos)
router.post('/image', uploadImage.single('document'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: "Please upload a valid image (JPG, PNG, WEBP)" });
        }
        
        res.status(200).json({
            success: true,
            message: "Image uploaded successfully",
            filePath: normalizePath(req.file.path),
            filename: req.file.filename
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 2. Video Upload
router.post('/video', uploadVideo.single('document'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: "Please upload a valid video (MP4, AVI, MKV)" });
        }

        res.status(200).json({
            success: true,
            message: "Video uploaded successfully",
            filePath: normalizePath(req.file.path)
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 3. Document Upload (PDF IDs)
router.post('/document', uploadPdf.single('document'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: "Please upload a valid PDF document" });
        }

        res.status(200).json({
            success: true,
            message: "Document uploaded successfully",
            filePath: normalizePath(req.file.path)
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Special Route: Universal Upload (Matches your Frontend 'upload-id' call)
router.post('/upload-id', (req, res, next) => {
    uploadUniversal.single('document')(req, res, (err) => {
        if (err) return res.status(400).json({ success: false, error: err.message });
        if (!req.file) return res.status(400).json({ success: false, error: "No file provided" });
        
        res.status(200).json({
            success: true,
            message: "Verification document uploaded",
            filePath: normalizePath(req.file.path)
        });
    });
});

module.exports = router;