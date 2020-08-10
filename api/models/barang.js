const mysqldb = require('../util/database'); //open mysql pool (connection to mysql database)

module.exports = class Barang {
    constructor(id, nama_barang, harga) {
        this.id = id;
        this.nama_barang = nama_barang;
        this.harga = harga;
    }
    
    static fetchAll(){
        return mysqldb.execute('SELECT * FROM barang'); //this will return a promise, since the mysqldb itself return a promise
    }
}