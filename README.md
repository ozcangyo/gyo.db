# gyo.db

A lightweight Node.js module for managing JSON-based databases.

gyo.db is a simple and efficient module that provides easy-to-use functions for managing JSON-based databases. It allows you to store, retrieve, update, and delete data using a JSON file as the storage mechanism.

## Features:
- Lightweight and efficient data storage solution
- Easy-to-use API for managing JSON-based databases
- Supports key-value data storage
- Provides functions for data retrieval, update, and deletion
- Built-in support for JSON file as the database storage
- Option to start a Web API server to access data over HTTP

## Installation:
npm install gyo.db


## Documentation:
For detailed usage instructions and API documentation, please refer to the [GitHub repository](https://github.com/ozcangyo/gyo.db).

## License:
This project is licensed under the MIT License. See the [LICENSE](https://github.com/ozcangyo/gyo.db/blob/main/LICENSE) file for more information.

## Support:
For bug reports, feature requests, or any other questions related to gyo.db, please use the [issue tracker](https://github.com/ozcangyo/gyo.db/issues) on GitHub.

## Usage

gyo.db is a lightweight Node.js module for managing JSON-based databases. It provides a simple and intuitive API for storing, retrieving, updating, and deleting data using a JSON file as the database storage.

### Initialization:
To get started, require the 'gyo.db' module and create a new instance of the GyoDB class, specifying the JSON file to be used as the database storage.

```javascript
const GyoDB = require('gyo.db');

const db = new GyoDB('database.json');
```
### Data Storage:
To store data in the database, use the set(key, value) function. It allows you to set a key-value pair, where the key is a string and the value can be any valid JSON data type.

```javascript
db.set('name', 'Özcan Kasapoğlu');
db.set('age', 18);
db.set('email', 'ozjangyo@gmail.com');
```
### Data Retrieval:
To retrieve data from the database, use the `get(key)` function. It returns the value associated with the specified key.

```javascript
const name = db.get('name');
console.log(name); // Output: Özcan Kasapoğlu
```
### Data Update:
To update data in the database, use the `set(key, value)` function. It works similarly to the data storage operation but with an existing key.

```javascript
db.set('age', 18);
```
### Data Deletion:
To delete data from the database, use the `remove(key)` function. It removes the key-value pair associated with the specified key.
```javascript
db.remove('email');
```
### All Data Retrieval:
To retrieve all data stored in the database, use the `getAll()` function. It returns an object containing all the key-value pairs.

```javascript
const allData = db.getAll();
console.log(allData); // Output: { name: 'Özcan Kasapoğlu', age: 18 }
```
### Database Size:
To get the number of key-value pairs stored in the database, use the size() function. It returns the size of the database.

```javascript
const size = db.size();
console.log(size); // Output: 2
```
### Web API Server:
If you want to expose the data stored in the database through a Web API, you can start a Web API server using the `startWebAPI(port)` function. It starts an Express server that listens on the specified port and serves the data as JSON over HTTP.

```javascript
db.startWebAPI(3000);
```
