const express = require('express');
const app = express();
const path = require('path');

app.get('/sendFile', (req, res) => {
  const filePath = path.join(__dirname, 'abc', 'build', 'index.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(`Error sending file: ${err}`);
      res.status(500).send('Error sending file');
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});