module.exports.errorHandler = function (errorPo, errData) {
    const error = new Error(`ERR[mysqlCntlError]: ${errorPo} - ${errData}`);
    return error;
}