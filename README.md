![Chums Logo](https://intranet.chums.com/images/chums/chums-badge-120x120.png)
# CHUMS Local API Modules
This is used on a variety of node.js server instance for standard tasks.

## Required Environment Variables
Module | VARIABLE | Default Value | notes
--- | --- | --- | ---
General | DEBUG | chums:*
Sage100 | SAGE_QUERY_EXECUTABLE | | Required for sageQuery, requires that ODBC connections are established on server
SageODBC | SAGE_DSN | | Required for SageODBC, DSN Name for SOTAMAS90 odbc connection


## Exports
### MySQL
```javascript
/**
 * Creates a MySQL2 connection instance
 * @returns {Promise<void>}
 */
getConnection = async () => {}

/**
 * A mysql2 pool created at run, uses appropriate environment variables 
 * @type {Promise<Pool>}
 */
mysql2Pool = mysql2.createPool({...config})
pool = mysql2Pool;

/**
 * Usage Example
 */
const {mysql2Pool} = require('chums-local-modules');
const connection = await mysql2Pool.getConnection();
const [rows] = await connection.query(sql, args);
connection.release();

const [rows] = await mysql2Pool.query(sql, args);

```

### User Authentication
```javascript
/**
 * Validates a user against /api/user
 *  - on success populates res.locals.profile = {user, roles, accounts}
 *  - on failure sends json with status 401, {error: 401, status: 'ERR_NOT_AUTHORIZED'}
 * @param req
 * @param res
 * @param next
 */
validateUser = (req, res, next) => {}

/**
 * Ensures a user has one of the required roles
 *  - on success, executes next();
 *  - on failure sends json with status 403, {error: 403, status: 'Not Authorized'}
 * @param {[String]} validRoles
 * @returns {function(*, *, *)}
 */
validateRole = (validRoles = []) => (req, res, next) => {}


/**
 * Usage Example
 */
const {validateRole, validateUser} = require('chums-local-modules');

router.use(validateRole);
router.get('/user/:id', validateRole(['admin']), user.getProfile);
```
    
### General Utils
```javascript
/**
 * Returns a valid database company
 * @param {String} Sage Company Code
 * @returns {String} Company "chums" or "bc" for use in database company fields
 */
getCompany = (company = '') => {}

/**
 * Returns a valid Sage Company Code
 * @param {String} company
 * @returns {String} Sage Company Code CHI or BCS
 */
getSageCompany = (company = '') => {}

/**
 * Usage Example
 */
const {getCompany, getSageCompany} = require('chums-local-modules');
const company = getCompany('CHI'); // returns 'chums'
const companyCode = getSageCompany(company); // returns 'CHI'
```
