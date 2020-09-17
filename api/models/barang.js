const mysqldb = require('../util/database'); //open mysql pool (connection to mysql database)

module.exports = class Barang {
    constructor(id, nama_barang, harga) {
        this.id = id;
        this.nama_barang = nama_barang;
        this.harga = harga;
    }

    save() {
        return mysqldb.execute(
            'INSERT INTO barang (id, nama_barang, harga) VALUES (? ,?, ?)', [this.id, this.nama_barang, this.harga] //Question marks will be replaced with item in the array. This is used to prevent SQL Injection
        );
    }

    // https://github.com/sidorares/node-mysql2/issues/384
    async saveTransac() {
        return new Promise(async(resolve, reject) => {
            const connection = await mysqldb.getConnection();
            try {
                await connection.query('START TRANSACTION');
                await connection.query(
                    'INSERT INTO barang (id, nama_barang, harga) VALUES (? ,?, ?)', [this.id, this.nama_barang, this.harga] //Question marks will be replaced with item in the array. This is used to prevent SQL Injection
                );
                const a = 1 / 0;
                await connection.query(
                    'INSERT INTO barang (id, nama_barang, harga) VALUES (? ,?, ?)', [100 + this.id, this.nama_barang + " copy", this.harga]
                );
                await connection.query('COMMIT');
                await connection.release();
                resolve(true);
            } catch (e) {
                await connection.query('ROLLBACK');
                await connection.release();
                reject(e);
            }
        });
    }

    static fetchAll(){
        return mysqldb.execute('SELECT * FROM barang'); //this will return a promise, since the mysqldb itself return a promise
    }

    static findById(id){
        return mysqldb.execute('SELECT * FROM barang WHERE id = ?', [id]);
    }
    

}