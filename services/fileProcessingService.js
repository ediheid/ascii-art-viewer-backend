const fs = require("fs");

exports.processFile = (filePath, interval, io) => {
  const lines = fs.readFileSync(filePath, "utf-8").split("\n");
  const totalLines = lines.length;

  let lineIndex = 0;

  const intervalId = setInterval(() => {
    if (lineIndex < totalLines) {
      // Emit the current line and progress
      io.emit("line", {
        line: lines[lineIndex],
        progress: Math.floor(((lineIndex + 1) / totalLines) * 100),
      });
      lineIndex++;
    } else {
      // Emit completion event and stop the interval
      io.emit("complete");
      clearInterval(intervalId);

      // Delete the uploaded file after processing
      fs.unlinkSync(filePath);
    }
  }, interval);
};
