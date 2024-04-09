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


}
module.exports = new userController()