const room = require('./room')
const user = require('./user')
const inbox = require('./inbox')

function route(app) {
    app.use('/room', room)
    app.use('/user', user)
    app.use('/inbox', inbox)

}

module.exports = route