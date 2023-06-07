const fs = require('fs');
const express = require('express');

class GyoDB {
  constructor(dbFilePath) {
    this.dbFilePath = dbFilePath;
    this.data = this.loadDatabase();
    this.app = express();
  }

  loadDatabase() {
    try {
      const data = fs.readFileSync(this.dbFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return {};
    }
  }

  saveDatabase() {
    const data = JSON.stringify(this.data, null, 2);
    fs.writeFileSync(this.dbFilePath, data);
  }

  get(key) {
    return this.data[key];
  }

  set(key, value) {
    this.data[key] = value;
    this.saveDatabase();
  }

  has(key) {
    return this.data.hasOwnProperty(key);
  }

  remove(key) {
    delete this.data[key];
    this.saveDatabase();
  }

  clear() {
    this.data = {};
    this.saveDatabase();
  }

  getAll() {
    return this.data;
  }

  size() {
    return Object.keys(this.data).length;
  }

  startWebAPI(port) {
    if (typeof this.handleWebAPIRequest === 'function') {
      this.app.get('/api/data', (req, res) => {
        res.json(this.data);
      });

      this.app.listen(port, () => {
        console.log(`Web API running on port ${port}`);
      });
    } else {
      console.log('handleWebAPIRequest function is not defined. Web API server cannot be started.');
    }
  }
}

module.exports = GyoDB;
