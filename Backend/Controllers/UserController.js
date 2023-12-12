const User = require('../Models/UserModel');

exports.addUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.removeUser = async (req, res) => {
    try {
        const result = await User.destroy({
            where: {id: req.body.id}
        });

        if (result === 0) return res.status(404).send('User not found');
        res.status(200).send({message: 'User deleted'});
    } catch (error) {
        res.status(500).send(error.message);
    }
}

