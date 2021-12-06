const db = require("../models/index");
const Covan = db.Covan;

const teacherEditProfile = async (req, res) => {
    const a = await Covan.findByPk(req.params.email);
    const malopcu = req.params.malop;
    a.hoten = req.body.hoten;
    a.sdt = req.body.sdt;
    await a.save();
    return res.status(200).json({
        message: "success!"
    });
}

const user = {
    teacherEditProfile: teacherEditProfile,
}

module.exports = user;