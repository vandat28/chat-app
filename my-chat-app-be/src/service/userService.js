const con = require('../config/configDB')

class userService {

    findOneById(id) {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM user where id = '${id}';`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

}

module.exports = new userService()