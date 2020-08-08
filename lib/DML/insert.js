const mysql = require("mysql");
const { query } = require("../base");
const util = require("../util");
const { errorHandler } = require("../errorHandler");

const InsertFnc = function (table, data, done) {
    const command = commandCreate(table, data);
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

const commandCreate = function (table, data) {

    if (data.constructor == Object) {

        /*
    
            * data: Insert Type: JSON
           
            ex) {"keyA": "valueA", "keyB", "valueB", ...}
        
        */
        
    
        let command = `INSERT INTO ${table} (${Object.keys(data).toString()})`;
        if (Object.values(data).length > 1) {
            command += " VALUES (";
            Object.values(data).forEach((element, index) => {
                command += (element == "null" ? element : (util.isNumber(element) ? element : "\"" + element + "\""));
                index != Object.values(data).length - 1 ? command += ", " : command += ");";
                if (index == Object.values(data).length - 1) {
                    return command;
                }
            });
        } else if (Object.values(data).length == 1) {
            // console.log("frd");
            command += " VALUES (" + (element == "null" ? element : (util.isNumber(Object.values(data)[0]) ? Object.values(data)[0] : "\"" + Object.values(data)[0] + "\""));
            return command;
        } else return done(errorHandler(`commandCreate`, `Unvalid Insert`))

    } else if (data.constructor == Array) {

        /*
    
            * data: Insert Type: Array
           
            ex) [
                    {"keyA": "valueA", "keyB", "valueB", ...}, 
                    {"keyA": "valueA", "keyB", "valueB", ...},
                    {"keyA": "valueA", "keyB", "valueB", ...}
                ]
        
        */
    
    
        let counter = 1;
        let command = `INSERT INTO ${table} (${Object.keys(dataArr[0]).toString()}) VALUES `;
        for (var data of dataArr) {
            if (Object.values(data).length > 1) {
                command += "(";
                Object.values(data).forEach((element, index) => {
                    if (element != "null" && element != null) {
                        if (!util.isNumber(element)) {
                            if (element.split("").includes("\"") || element.split("").includes("\'")) {
                                let thisel = "";
                                element.split("").forEach((value, indexel) => {
                                    if (value == "\'" || value == "\"") {
                                        if (element.split("")[indexel - 1] == "\\") thisel += value;
                                        else thisel += "\\" + value;
                                    } else thisel += value;
                                })
                                command += `"${thisel}"`;
                            } else command += `"${element}"`;
                        }
                        else command += `"${element}"`;
                    } else command += element
                    index != Object.values(data).length - 1 ? command += ", " : command += "),";
                });
            } else if (Object.values(data).length == 1) {
                if (element != "null" && element != null) {
                    command += "(" + (util.isNumber(Object.values(data)[0]) ? Object.values(data)[0] : "\"" + Object.values(data)[0] + "\"");
                } else {
                    command += "(" + element;
                }
            } else return errorHandler(`commandCreate`, `Unvalid data type: ${typeof data}`);

            if (dataArr.length == counter++) {
                command = command.substr(0, command.length - 1) + ";";
                return command;
            }
        }

    } else return errorHandler(`commandCreate`, `Unvalid data type: ${typeof data}`);

}

module.exports.Insert = InsertFnc;