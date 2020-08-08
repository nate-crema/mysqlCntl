const insertM = require("./DML/insert");
const updateM = require("./DML/update");
const readM = require("./DML/select");
const deleteM = require("./DML/delete");

module.exports = {
    DML: {
        Insert: insertM.Insert,
        Update: updateM.Update,
        Select: readM.Select,
        Delete: deleteM.Delete
    }
}