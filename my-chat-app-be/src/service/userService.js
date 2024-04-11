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
    findAllUserInRoom(roomid) {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM room_member
            join user on user.id = room_member.userid
            where roomid = '${roomid}';`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    createRoomMember(roomid, userid) {
        return new Promise((resolve, reject) => {
            con.query(`insert into room_member values('${roomid}', '${userid}');`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    findRoomMember(roomid, userid) {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM room_member where roomid = '${roomid}' and userid='${userid}';`, function (error, result, fields) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        })
    }

    updateStatus(status, userid) {
        return new Promise((resolve, reject) => {
            con.query(`update room_member set status = ${status} where userid='${userid}';`, function (error, result, fields) {
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