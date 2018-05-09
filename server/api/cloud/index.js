const express = require('express');
const router = express.Router();
const Multer = require('multer');
const imgUpload = require('./upload');
const {User} = require('../../db/models')

// Handles the multipart/form-data
// Adds a .file key to the request object
// the 'storage' key saves the image temporarily for in memory
// You can also pass a file path on your server and it will save the image there
const multer = Multer({
  storage: Multer.MemoryStorage,
  fileSize: 5 * 1024 * 1024
});

// the multer accessing the key 'image', as defined in the `FormData` object on the front end
// Passing the uploadToGcs function as middleware to handle the uploading of request.file
router.post('/image-upload', multer.single('image'), imgUpload.uploadToGcs, (req, res, next) => {
  const data = req.body;
  if (req.file && req.file.cloudStoragePublicUrl) {
    data.imgUrl = req.file.cloudStoragePublicUrl;
  }
  res.json(data)
})

module.exports = router
