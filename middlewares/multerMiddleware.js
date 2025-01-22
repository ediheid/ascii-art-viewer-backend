const multer = require("multer");

const upload = multer({
  dest: "uploads/", // Directory where uploaded files will be stored
});

module.exports = upload;
