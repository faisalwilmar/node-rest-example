# node-rest-example

Node-rest-example is example project for RESTful API using NodeJs.

- MariaDB / MySQL database
- MongoDB v4.2.8
- Mongoose as ODM (Object Data Model)
- Sequelize as ORM (Object Relational Model)
- Nodemon as Server Monitor -- development dependency
- Azure Blob Storage
- Redis Server for Cache. [Download here](https://github.com/dmajkic/redis/downloads) for Windows.

This project based on Maximilian Schwarzmüller's video on [Youtube](https://www.youtube.com/playlist?list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q) and [Udemy Course](https://www.udemy.com/course/nodejs-the-complete-guide/) with several modifications.

## Installation

Make sure you already have NodeJs installed in your machine, any kind of SQL Database, and MongoDB Cluster that ready to use.

1. Download or [Clone](https://docs.github.com/en/enterprise/2.13/user/articles/cloning-a-repository) this repository.
2. Install all dependencies.
```bash
npm install
```
3. Change file named *example-nodemon.json* to *nodemon.json*. This file should contain all the environment variables used in this project. This file is Development Dependency since this project using nodemon.
4. Import *master_barang.sql* and *sequelize_item.sql* to your SQL Database, and save your database user, password, host, and database name in *nodemon.json*.
5. Open your MongoDB Cluster, copy the connection string, and save it in *nodemon.json*.
6. Open your Azure Blob Storage, copy the connection string and key, and save it in *nodemon.json*.

## Usage

Start the server.
```bash
npm start
```
For testing the RESTful API, [import](https://learning.postman.com/docs/getting-started/importing-and-exporting-data/) *node-rest-trial.postman_collection.json* to [Postman](https://www.postman.com/downloads/). This file contains all the available APIs and how to use it. This APIs using JWT Authentication, make sure to configure the Authorization Token.

## Contributing
none

## License
none
