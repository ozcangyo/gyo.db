const GyoDB = require('gyo.db');

const db = new GyoDB('database.json');

db.set('name', 'Ozjan');
db.set('age', 19);

db.startWebAPI(3000);
