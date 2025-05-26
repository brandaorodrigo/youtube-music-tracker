const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 4444;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/select', (req, res) => {
  fs.readFile('server.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(400).json({ error: 'Failed to read data' });
    }
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      res.status(500).json({ error: 'Invalid JSON format' });
    }
  });
});

app.post('/update', (req, res) => {
  fs.writeFile('server.json', JSON.stringify(req.body), (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).json({ error: 'Failed to update data' });
    }
    res.status(200).json({ message: 'Data updated successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});