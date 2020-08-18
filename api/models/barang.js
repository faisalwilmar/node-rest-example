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

    static fetchAll(){
        return mysqldb.execute('SELECT * FROM barang'); //this will return a promise, since the mysqldb itself return a promise
    }

    static findById(id){
        return mysqldb.execute('SELECT * FROM barang WHERE id = ?', [id]);
    }
    

}