const db = require('../models');


exports.create_user = async (req, res) => {
        try {
            const data = await db.User.create(req.body)
            return res.status(200).json({ id: data.id })
        }
        catch (error){
            return res.sendStatus(500)
        }
}

exports.get_users = async (req, res) => {
    try {
        const data = await db.User.findAll()
        return res.status(200).send(data)
    }
    catch (error){
        return res.sendStatus(500)
    }
}

exports.get_user_by_id = async (req, res) => {
    try {
        const user = await db.User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.get_user_by_email = async (req, res) => {
    try {
        const user = await db.User.findOne({ where: {email: req.body.email} });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.delete_user = async (req, res) => {
    try {
        const deleted_Count = await db.User.destroy({ where: {id: req.params.id} });
        if (deleted_Count === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.sendStatus(200);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.update_user = async (req, res) => {
    try {
        const [updated_Count, [updated_user]] = await db.User.update(req.body, {
            where: {id: req.params.id},
            returning: true,
        });
        if (updated_Count === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.sendStatus(200);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}