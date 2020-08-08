const mysql = require("mysql");
const { query } = require("../base");
const util = require("../util");
const { errorHandler } = require("../errorHandler");

const DeleteFnc = function (table, filter, done) {
    const command = commandCreate(table, filter);
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

const commandCreate = function (table, filter) {

    let command = `DELETE FROM ${table}`;
    if (Object.values(filter).length > 1) {
        command += " WHERE ";
        Object.keys(filter).forEach((element, index) => {
            if (util.isNumber(Object.values(filter)[index])) {
                command += element + "=" + Object.values(filter)[index];
            } else {
                let elobj = "";
                element.split("").forEach((el, ind) => {
                    if (el == "\'" || el == "\"" || el == "\`") {
                        if (element.split("")[ind - 1] == "\\") elobj += el;
                        else elobj += "\\" + el; 
                    } else elobj += el;
                })
                command += element + "=" + elobj;
            }
            if (Object.keys(filter).indexOf(element) != Object.keys(filter).length - 1) command += " AND ";
            else return command;
        });
    } else if (Object.values(filter).length == 1) {
        if (util.isNumber(Object.values(filter)[0])) {
            command += " WHERE " + Object.keys(filter)[0] + "=" + Object.values(filter)[0];
            return command;
        } else {
            let elobj = "";
            Object.values(filter)[0].split("").forEach((el, ind) => {
                if (el == "\'" || el == "\"" || el == "\`") {
                    if (Object.values(filter)[0].split("")[ind - 1] == "\\") elobj += el;
                    else elobj += "\\" + el; 
                } else elobj += el;
            })
            command += " WHERE " + Object.keys(filter)[0] + "= \"" + elobj + "\"";
            return command;
        }
    } return false;

}

module.exports.Delete = DeleteFnc;