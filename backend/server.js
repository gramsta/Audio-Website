const express = require("express");
const path = require("path");
const multer = require("multer");

const app = express();
const PORT = 3000;

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads")); // Save files in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Rename the file with a timestamp
    },
});

const upload = multer({ storage });

// Serve the frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// File upload route
app.post("/upload", upload.single("file"), (req, res) => {
    res.send({ message: "File uploaded successfully", file: req.file });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
