const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON in the request body
app.use(express.json());

// File path
const filePath = 'filee.txt';

// ReadFile Endpoint (GET /readFile)
app.get('/readFile', async (req, res) => {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    res.status(200).json({ content });
  } catch (error) {
    res.status(500).json({ error: 'Error reading the file.' });
  }
});
app.post('/writeFile', async (req, res) => {
    try {
      const { data } = req.body;
      console.log('Received data:', data);
  
      if (!data) {
        return res.status(400).json({ error: 'No data provided in the request body.' });
      }
  
      console.log('Writing to file...');
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
      console.log('File written successfully.');
  
      res.status(200).json({ message: 'File written successfully.' });
    } catch (error) {
      console.error('Error writing to the file:', error);
      res.status(500).json({ error: 'Error writing to the file.' });
    }
  });
  
  
  // UpdateFile Endpoint (PUT /updateFile)
  app.put('/updateFile', async (req, res) => {
    try {
      const { data } = req.body; // Change from newData to data
  
      if (!data) {
        return res.status(400).json({ error: 'No new data provided in the request body.' });
      }
  
      await fs.appendFile(filePath, `\n${data}`, 'utf-8');
      res.status(200).json({ message: 'File updated successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating the file.' });
    }
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
