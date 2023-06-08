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

Here is an example of how to use GyoDB in your Node.js application:

```javascript
const GyoDB = require('gyodb');

// Create an instance of GyoDB with the path to your JSON database file
const db = new GyoDB('data.json');

// Set a value
db.set('name', 'Özcan Kasapoğlu');

// Get a value
const name = db.get('name');
console.log(name); // Output: Özcan Kasapoğlu

// Check if a key exists
const exists = db.has('name');
console.log(exists); // Output: true

// Remove a key-value pair
db.remove('name');

// Clear the entire database
db.clear();

// Get the size of the database
const size = db.size();
console.log(size); // Output: 0

// Search for values that include a specific query
const results = db.search('apple');
console.log(results); // Output: { fruit: 'apple', color: 'red' }

// Update a value using a custom update function
db.update('count', value => value + 1);

// Get the key(s) associated with a specific value
const key = db.getKeyByValue('Özcan Kasapoğlu');
console.log(key); // Output: name

const keys = db.getKeysByValue('apple');
console.log(keys); // Output: [ 'fruit' ]

// Merge an object into the database
db.merge({ city: 'New York', country: 'USA' });

// Validate a value using a custom validation function
const isValid = db.validate('age', value => value >= 18);
console.log(isValid); // Output: true

// Export the database to a JSON file
db.exportDatabase('backup.json');

// Start a web API server to expose the database data
db.startWebAPI(3000);
```
# Api

`new GyoDB(dbFilePath)`
Creates a new instance of GyoDB with the specified JSON database file path.

`loadDatabase()`
Loads the JSON database file and returns its contents as an object. If the file does not exist or is empty, an empty object `{}` is returned.

`saveDatabase()`
Saves the current state of the database to the JSON file.

`get(key)`
Retrieves the value associated with the specified key.

`set(key, value)`
Sets the value of the specified key.

`has(key)`
Checks if the specified key exists in the database.

`remove(key)`
Removes the key-value pair associated with the specified key.

`clear()`
Clears the entire database.

`getAll()`
Returns the entire database as an object.

`size()`
Returns the number of key-value pairs in the database.

`search(query)`
Searches for values that include the specified query and returns an object with matching key-value pairs.

`update(key, updateFn)`
Updates the value associated with the specified key using a custom update function. The update function receives the current value as a parameter and should return the updated value.

`getKeyByValue(value)`
Returns the key associated with the specified value. If multiple keys have the same value, only the first occurrence is returned.

`getKeysByValue(value)`
Returns an array of keys associated with the specified value.

`merge(dataObject)`
Merges the specified object into the database.

`validate(key, validationFn)`
Validates the value associated with the specified key using a custom validation function. The validation function receives the value as a parameter and should return a boolean value indicating whether the value is valid or not.

`exportDatabase(exportFilePath)`
Exports the current state of the database to a JSON file at the specified path.

`startWebAPI(port)`
Starts a web API server to expose the database data. The server listens on the specified port and provides a JSON API endpoint at /api/data to retrieve the database contents.