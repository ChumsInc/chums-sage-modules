const {getDBCompany, getSageCompany, parseSQL} = require('./utils');
const {SageODBC} = require('sage-odbc');

exports.getDBCompany = getDBCompany;
exports.getSageCompany = getSageCompany;
exports.parseSQL = parseSQL;
exports.SageODBC = SageODBC;
