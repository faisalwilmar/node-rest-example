const client = require('./redis-connection');

// this class was created because redis's client.get needs callback, and that is bad

module.exports = class CacheConnector {
    async getValue(key) {
        if (!key) {
            const error = new Error();
            error.status = 500;
            error.message = 'Key must be provided';
            throw error;
        }

        return new Promise((resolve, reject) => {
            client.get(key, (error, result) => {
                if (error) {
                    reject(error);
                }

                if (result) {
                    resolve(JSON.parse(result));
                }
                resolve(null);
            });
        });
    }

    async setValue(key, value, timeout = null){
        return new Promise((resolve) => {
            let isDone;
            if (timeout == null) {
                isDone = client.set(key, value);
            } else {
                isDone = client.setex(key, timeout, value);
                
            }
            resolve(isDone);
        });
        
    }
}