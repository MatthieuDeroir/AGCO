const bcrypt = require('bcryptjs');
const User = require('../Models/UserModel'); // Import your User model

async function basicAuth(req, res, next) {
    const header = req.headers.authorization || '';
    const [type, payload] = header.split(' ');

    if (type === 'Basic' && payload) {
        const decoded = Buffer.from(payload, 'base64').toString();
        const [username, password] = decoded.split(':');
        console.log('username:', username);
        console.log('password:', password)

        try {
            const user = await User.findOne({where: {username}});
            console.log('user:', user)
            console.log(user && bcrypt.compareSync(password, user.password))
            if (user && bcrypt.compareSync(password, user.password)) {
                req.user = user; // Optional: Add user info to request object
                return next();
            }
        } catch (error) {
            console.error('Error authenticating user:', error);
            return res.status(500).send('Error authenticating user');
        }
    }

    res.status(401).send('Unauthorized');
}

module.exports = basicAuth;
