const roomService = require('../service/roomService')
class roomController {
    async findAll(req, res) {
        try {
            let rooms = await roomService.findAll()
            res.status(200).json(rooms);
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy phòng' });
        }
    }

    async findOneById(req, res) {
        try {
            let id = req.params.id
            let room = await roomService.findOneById(id)
            res.status(200).json(room);
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy phòng' });
        }
    }

    async create(req, res) {
        try {
            let { id, roomname, img, description, userid } = req.body
            await roomService.create(id, roomname, img, description, userid)
            res.status(200).json({ message: 'Đã tạo phòng thành công' });
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi tạo phòng' });
        }
    }
    async delete(req, res) {
        try {
            let id = req.params.id
            await roomService.deleteRoomMember(id)
            await roomService.delete(id)
            res.status(200).json({ message: 'Đã xóa phòng thành công' });
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa phòng' });
        }
    }


}
module.exports = new roomController()