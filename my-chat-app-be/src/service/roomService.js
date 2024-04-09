const con = require('../config/configDB')

class roomService {

    findAll() {
        return new Promise((resolve, reject) => {
            con.query(`SELECT room.*, user.username FROM room inner join user on user.id = room.userid;`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    create(id, roomname, img, description, userid) {
        return new Promise((resolve, reject) => {
            con.query(`insert into room values('${id}','${roomname}','${img}','${description}','${userid}');`, function (error, result, fields) {
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
            con.query(`delete from room where id = '${id}'`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

}

module.exports = new roomService()