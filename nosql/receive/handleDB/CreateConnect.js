const MongoClient = require('mongodb').MongoClient;
const DB_CONN_STR = require('../../arguments.config.js').DB_CONN_STR;

class CreateConnect {

    constructor(TABALE_NAME, callback) {

        MongoClient.connect(DB_CONN_STR + TABALE_NAME, (err, db) => {

            if (err) return console.log('connect err:' + TABALE_NAME);

            console.log('connect success:' + TABALE_NAME);

            this.db = db;
            callback && callback(db);

        });
    }

    collection(collectionName, next) {

        if (!this.db) {
            if (next) next('connect err:' + TABALE_NAME);
            else return console.log('connect err:' + TABALE_NAME);
        }

        return this.db.collection(collectionName);

    }

}

module.exports = CreateConnect;