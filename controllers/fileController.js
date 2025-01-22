const { processFile } = require("../services/fileProcessingService");

exports.uploadFile = (req, res) => {
  const file = req.file;
  const interval = parseInt(req.body.interval, 10);

  if (!file || isNaN(interval)) {
    return res.status(400).send("Invalid file or interval.");
  }

  const io = req.app.get("io"); // Get the io instance from the app

  // Emit the file processing event via WebSocket
  processFile(file.path, interval, io);
  res.status(200).send("File uploaded and processing started.");
};
