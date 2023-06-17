const fs = require('fs');
const express = require('express');

class GyoDB {
  constructor(dbFilePath) {
    this.dbFilePath = dbFilePath;
    this.data = this.loadDatabase();
    this.app = express();
    this.indexes = {};
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

  createIndex(indexName) {
    if (!this.indexes[indexName]) {
      this.indexes[indexName] = {};
      for (const key in this.data) {
        if (this.data.hasOwnProperty(key)) {
          const value = this.data[key];
          if (typeof value === 'object' && value.hasOwnProperty(indexName)) {
            const indexValue = value[indexName];
            if (!this.indexes[indexName][indexValue]) {
              this.indexes[indexName][indexValue] = [];
            }
            this.indexes[indexName][indexValue].push(key);
          }
        }
      }
    }
  }

  getIndexKeys(indexName, indexValue) {
    if (this.indexes[indexName] && this.indexes[indexName][indexValue]) {
      return this.indexes[indexName][indexValue];
    }
    return [];
  }

  removeFromIndex(indexName, indexValue, key) {
    if (this.indexes[indexName] && this.indexes[indexName][indexValue]) {
      const indexKeys = this.indexes[indexName][indexValue];
      const keyIndex = indexKeys.indexOf(key);
      if (keyIndex !== -1) {
        indexKeys.splice(keyIndex, 1);
        if (indexKeys.length === 0) {
          delete this.indexes[indexName][indexValue];
        }
      }
    }
  }

  addToIndex(indexName, indexValue, key) {
    if (!this.indexes[indexName]) {
      this.indexes[indexName] = {};
    }
    if (!this.indexes[indexName][indexValue]) {
      this.indexes[indexName][indexValue] = [];
    }
    this.indexes[indexName][indexValue].push(key);
  }

//New Functions
  // 1. Auto backup
  startAutoBackup() {
    setInterval(() => {
      this.backupDatabase();
    }, this.options.autoBackupInterval);
  }

  backupDatabase(backupFilePath = `${this.dbFilePath}.backup`) {
    const data = JSON.stringify(this.data, null, 2);
    fs.writeFileSync(backupFilePath, data);
  }

  // 2. Data encryption and decryption
  encryptData(data) {
    if (!this.options.encryptionKey) {
      return data;
    }

    const cipher = crypto.createCipher('aes-256-cbc', this.options.encryptionKey);
    let encryptedData = cipher.update(data, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    return encryptedData;
  }

  decryptData(encryptedData) {
    if (!this.options.encryptionKey) {
      return encryptedData;
    }

    const decipher = crypto.createDecipher('aes-256-cbc', this.options.encryptionKey);
    let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');
    return decryptedData;
  }

  // 3. Transaction log
  logTransaction(action, key, value = null) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      action,
      key,
      value,
    };
    fs.appendFileSync(`${this.dbFilePath}.log`, JSON.stringify(logEntry) + '\n');
  }

  // 4. Data validation
  isValidData(key, value) {
    if (!this.options.schema) {
      return true;
    }

    const schema = this.options.schema[key];
    if (!schema) {
      return false;
    }

    return schema(value);
  }

  // 5. Advanced indexing
  createIndex(indexName, indexFn) {
    if (!this.indexes[indexName]) {
      this.indexes[indexName] = {};
      for (const key in this.data) {
        if (this.data.hasOwnProperty(key)) {
          const value = this.data[key];
          const indexValue = indexFn(value);
          if (indexValue !== null && indexValue !== undefined) {
            if (!this.indexes[indexName][indexValue]) {
              this.indexes[indexName][indexValue] = [];
            }
            this.indexes[indexName][indexValue].push(key);
          }
        }
      }
    }
  }

  // 6. Asynchronous operations
  async loadDatabaseAsync() {
    try {
      const data = await fs.promises.readFile(this.dbFilePath, 'utf8');
      return JSON.parse(this.decryptData(data));
    } catch (error) {
      return {};
    }
  }

  async saveDatabaseAsync() {
    const data = JSON.stringify(this.data, null, 2);
    await fs.promises.writeFile(this.dbFilePath, this.encryptData(data));
  }

  // 7. Event handling
  on(event, callback) {
    this.events = this.events || {};
    this.events[event] = this.events[event] || [];
    this.events[event].push(callback);
  }

  emit(event, ...args) {
    if (this.events && this.events[event]) {
      this.events[event].forEach((callback) => callback(...args));
    }
  }

  // 8. Data caching
  getWithCache(key) {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    const value = this.get(key);
    if (this.cache.size >= this.options.cacheSize) {
      this.cache.delete(this.cache.keys().next().value);
    }
    this.cache.set(key, value);
    return value;
  }

  // 9. Pagination
  getPage(page, pageSize) {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const keys = Object.keys(this.data).slice(start, end);
    const pageData = {};
    keys.forEach((key) => {
      pageData[key] = this.data[key];
    });
    return pageData;
  }

  // 10. Data compression
  compressData(data) {
    return JSON.stringify(data);
  }

  decompressData(compressedData) {
    return JSON.parse(compressedData);
  }
}
module.exports = GyoDB;