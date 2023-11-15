const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Configure multer to handle file uploads
// In-memory storage keeps the chunks in buffer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).fields([
  { name: 'chunk', maxCount: 1 },
  { name: 'chunkIndex', maxCount: 1 },
  { name: 'totalChunks', maxCount: 1 },
  { name: 'fileIdentifier', maxCount: 1 }
]);

// Helper function to combine chunks
const combineChunks = (fileIdentifier, totalChunks, res) => {
  const fileStream = fs.createWriteStream(`uploads/${fileIdentifier}`);

  const combine = (index) => {
    if (index >= totalChunks) {
      res.status(200).send('File uploaded and combined successfully!');
      return;
    }

    const chunkPath = `uploads/${fileIdentifier}-chunk${index}`;
    fs.createReadStream(chunkPath)
      .on('end', () => {
        fs.unlink(chunkPath, (err) => {
          if (err) throw err; // If there's an error deleting the chunk, throw an error
        });
        combine(index + 1);
      })
      .on('error', (err) => {
        res.status(500).send('Error combining file chunks.');
      })
      .pipe(fileStream, { end: false });
  };

  combine(0);
};

app.post('/upload-chunk', upload, (req, res) => {
  const chunk = req.files['chunk'][0];
  const chunkIndex = req.body.chunkIndex;
  const totalChunks = req.body.totalChunks;
  const fileIdentifier = req.body.fileIdentifier;

  // Save the chunk to the uploads directory with a unique name
  const chunkName = `${fileIdentifier}-chunk${chunkIndex}`;
  fs.writeFile(`uploads/${chunkName}`, chunk.buffer, (err) => {
    if (err) {
      return res.status(500).send('Error saving chunk.');
    }

    // If it's the last chunk, combine all chunks
    if (parseInt(chunkIndex, 10) === parseInt(totalChunks, 10) - 1) {
      combineChunks(fileIdentifier, totalChunks, res);
    } else {
      res.status(200).send('Chunk uploaded successfully!');
    }
  });
});

// Route to serve the index.html file
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => console.log('Server started on http://localhost:3000'));
