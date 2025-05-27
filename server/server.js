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

app.get('/select/:username', (req, res) => {
  if (!req.params.username) {
    return res.status(400).json({ error: 'username parameter is required' });
  }
  fs.readFile('database/' + req.params.username + '.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(400).json({ error: 'failed to read data' });
    }
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (error) {
      res.status(400).json({ error: 'invalid json format' });
    }
  });
});

app.post('/update', (req, res) => {
  if (!req.body.username) {
    return res.status(400).json({ error: 'username required' });
  }
  const filePath = 'database/' + req.body.username + '.json';
  if (!fs.existsSync(filePath)) {
    try {
      fs.writeFileSync(filePath, JSON.stringify({}));
    } catch (err) {
      return res.status(400).json({ error: 'failed to create data file' });
    }
  }
  fs.writeFile(filePath, JSON.stringify(req.body), (err) => {
    if (err) {
      return res.status(400).json({ error: 'failed to update data' });
    }
    res.status(200).json({ message: 'updated' });
  });
});

app.get('/:username', (req, res) => {
  fs.readFile(path.join(__dirname, 'public', 'index.html'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('error loading page');
    }
    const updatedHtml = data.replaceAll(/{username}/g, req.params.username);
    res.send(updatedHtml);
  });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});