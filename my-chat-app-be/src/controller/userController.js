const userService = require('../service/userService')
class userController {
    async findOneById(req, res) {
        try {
            let id = req.params.slug
            let user = await userService.findOneById(id)
            res.status(200).json(user[0]);
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy user' });
        }
    }
    async createRoomMember(req, res) {
        try {
            let { roomid, userid } = req.body
            await userService.createRoomMember(roomid, userid)
            res.status(200).json({ message: 'Đã thêm user vào phòng thành công' });
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi thêm user vào phòng' });
        }
    }

    async findRoomMember(req, res) {
        try {
            let roomid = req.query.roomid
            let userid = req.query.userid
            console.log(roomid, userid)
            let result = await userService.findRoomMember(roomid, userid)
            res.status(200).json(result[0]);
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi thêm user vào phòng' });
        }
    }

    async findAllUserInRoom(req, res) {
        try {
            let result = await userService.findAllUserInRoom(req.params.id)
            res.status(200).json(result);
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy user trong phòng' });
        }
    }

    async updateStatus(req, res) {
        try {
            let userid = req.params.id
            let { status } = req.body
            await userService.updateStatus(status, userid)
            res.status(200).json({ message: 'Đã cập nhật trạng thái user thành công' });
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật trạng thái user' });
        }
    }




}
module.exports = new userController()