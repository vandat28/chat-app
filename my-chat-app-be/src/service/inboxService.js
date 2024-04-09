const con = require('../config/configDB')

class inboxService {

    findOneById(id) {
        return new Promise((resolve, reject) => {
            con.query(`SELECT json_data FROM inbox where id = '${id}';`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result[0]);
            });
        })
    }


    create(id) {
        return new Promise((resolve, reject) => {
            con.query(`insert into inbox(id) value('${id}');`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    update(id, json) {
        return new Promise((resolve, reject) => {
            con.query(`update inbox
            set json_data = '${json}'
            where id = '${id}'`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            con.query(`delete from inbox where id = '${id}';`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

}

module.exports = new inboxService()