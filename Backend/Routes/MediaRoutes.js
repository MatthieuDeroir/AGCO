const express = require('express');
const router = express.Router();
const mediaController = require('../Controllers/MediaController');
const multer = require('multer');
const auth = require('../Middlewares/Auth');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './media');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/upload', auth, upload.single('file'), mediaController.uploadMedia);

router.get('/', mediaController.getAllMedia);

router.delete('/:id', auth, mediaController.deleteMedia);
router.put('/:id', auth, mediaController.updateMedia);

module.exports = router;
