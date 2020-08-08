const mysql = require("mysql");
const { query } = require("../base");
const util = require("../util");
const { errorHandler } = require("../errorHandler");

const UpdateFnc = function (table, base, alter, done) {
    const command = commandCreate(table, base, alter);
    if (typeof done != "function") {
        return new Promise((resolve, reject) => {
            query(command)
                .then(result => resolve(result))
                .catch(e => reject(e));
        });
    } else {
        query(command)
            .then((result) => { return done(null, result) })
            .catch((e) => { return done(e) });
    }
}

const commandCreate = function (table, base, alter) {

    let command = "UPDATE " + table;
    // console.log(typeof data.values);

    if (Object.values(alter).length > 1) {
        command += " SET ";
        Object.values(alter).forEach((element, index) => {
            command += "" + Object.keys(alter)[index] + " = " + (util.isNumber(element) ? element : "'" + element + "'");
            index != Object.values(alter).length-1 ? command += ", " : command += "";
        });
    } else if (Object.values(alter).length == 1) {
        command += " SET " + Object.keys(alter)[0] + " = " + (util.isNumber(Object.values(alter)[0]) ? Object.values(alter)[0] : "'" + Object.values(alter)[0] + "'");
    }

    if (Object.values(base).length > 1) {
        command += " WHERE ";
        Object.values(base).forEach((element, index) => {
            command += "" + Object.values(base)[index] + " = " + (util.isNumber(element) ? element : "'" + element + "'");
            index != Object.values(base).length - 1 ? command += " AND " : command += ");";
            if (index == Objecy.values(base).length - 1) return command;
        });
    } else if (Object.values(base).length == 1) {
        command += " WHERE " + "" + Object.keys(base)[0] + " = " + (util.isNumber(Object.values(base)[0]) ? Object.values(base)[0] : "'" + Object.values(base)[0] + "'");
        return command;
    }

}

module.exports.Update = UpdateFnc;