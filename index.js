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

  search(query) {
    const results = {};

    for (const key in this.data) {
      if (this.data.hasOwnProperty(key)) {
        const value = this.data[key];
        if (typeof value === 'string' && value.includes(query)) {
          results[key] = value;
        }
      }
    }

    return results;
  }

  update(key, updateFn) {
    if (this.data.hasOwnProperty(key)) {
      const value = this.data[key];
      const updatedValue = updateFn(value);
      this.data[key] = updatedValue;
      this.saveDatabase();
      return updatedValue;
    } else {
      return null;
    }
  }

  getKeyByValue(value) {
    for (const key in this.data) {
      if (this.data.hasOwnProperty(key) && this.data[key] === value) {
        return key;
      }
    }
    return null;
  }

  getKeysByValue(value) {
    const keys = [];
    for (const key in this.data) {
      if (this.data.hasOwnProperty(key) && this.data[key] === value) {
        keys.push(key);
      }
    }
    return keys;
  }

  merge(dataObject) {
    this.data = { ...this.data, ...dataObject };
    this.saveDatabase();
  }

  validate(key, validationFn) {
    if (this.data.hasOwnProperty(key)) {
      const value = this.data[key];
      if (validationFn(value)) {
        return true;
      } else {
        return false;
      }
    } else {
      return null;
    }
  }

  exportDatabase(exportFilePath) {
    const data = JSON.stringify(this.data, null, 2);
    fs.writeFileSync(exportFilePath, data);
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
