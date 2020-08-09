const mysql = require("mysql");
const { errorHandler } = require("./errorHandler");

let connMysql = "";

const setAccount = function (host, port, user, password, database, eqInt) { 
    return new Promsie((resolve, reject) => {
        const connMysql = mysql.createConnection({
            host,
            port,
            user,
            password,
            database
        });
        try {
            connMysql.connect();
            emptyQuery(eqInt ? eqInt : 1000000);
            resolve(true);
        } catch (e) {
            reject(errorHandler(`setAccount`, e));
        }
    })
}

const query = function (q_comm) {
    return new Promise((resolve, reject) => {
        if (connMysql == "") reject(errorHandler(`Query`, `Cannot perform query: setAccount is not set`));
        conn_mysql.query(q_comm, (err, rows, fields) => {
        if (err) {
                reject(errorHandler(`Query`, err))
            } else {
                resolve(rows);
            }
        })
    })
}

const emptyQuery = function(timeInterval) { 
    conn_mysql.query("show databases");
    setTimeout(() => {
        console.log("empty query sent");
        emptyQuery();
    }, timeInterval ? timeInterval : 1000000);
}

module.exports = {
    setAccount,
    query,
    emptyQuery
}