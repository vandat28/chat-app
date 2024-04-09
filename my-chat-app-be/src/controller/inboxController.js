const inboxService = require('../service/inboxService')
class inboxController {
    async findOneById(req, res) {
        try {
            let id = req.params.id
            let inbox = await inboxService.findOneById(id)
            res.status(200).json(inbox);
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy inbox' });
        }
    }

    async create(req, res) {
        try {
            let { id } = req.body
            await inboxService.create(id)
            res.status(200).json({ message: 'Đã thêm inbox thành công' });
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi thêm inbox' });
        }
    }
    async update(req, res) {
        try {
            let id = req.params.id
            let { json } = req.body
            await inboxService.update(id, json)
            res.status(200).json({ message: 'Đã cập nhật inbox thành công' });
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật inbox' });
        }
    }

    async delete(req, res) {
        try {
            let id = req.params.id
            await inboxService.delete(id)
            res.status(200).json({ message: 'Đã xóa inbox thành công' });
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa inbox' });
        }
    }



}
module.exports = new inboxController()