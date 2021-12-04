const db = require("../models/index");
const Sinhvien = db.Sinhvien;
const Bangdiem = db.Bangdiem;
const Diemrenluyen = db.Diemrenluyen;
const Covan = db.Covan;
const Lophoc = db.Lophoc;
const { QueryTypes, Sequelize } = require('sequelize');
const Op = Sequelize.Op;

//
const teacherInfo = async (req, res) => {
    // const username = res.locals.user.tennguoidung;
    const username = req.params.email;
    let userInfo = '';
    let malop = req.params.malop;
    const classId = await Lophoc.findAll({
        where: { emailcovan: username },
        attributes: ['malop'],
    });
    userInfo = await Covan.findByPk(username);
    userInfo.dataValues.role = 'covan';
    const sinhviens = await Sinhvien.findAll({
        where: { malop: malop },
        attributes: ['mssv', 'hoten', 'ngaysinh', 'malop', 'email', 'sdt', 'sdtphuhuynh', 'diachi'],
    });

    diemsinhvien = await Sinhvien.findAll({
        where: { malop: malop },
        include: [
            {
                model: Bangdiem,
                where: {
                    mssv: Sequelize.col('sinhvien.mssv')
                },
                required: false
            }
        ],
        attributes: ['mssv', 'hoten', 'ngaysinh', 'malop']
    });
    const drl = await Sinhvien.findAll({
        where: { malop: malop },
        include: [
            {
                model: Diemrenluyen,
                where: {
                    mssv: Sequelize.col('sinhvien.mssv')
                },

                required: false
            }
        ],
        attributes: ['mssv', 'hoten', 'ngaysinh', 'malop']
    });
    const ngaysinhchuan = await Covan.findOne({
        where: { email: username },
        attributes: ['ngaysinh']
    })
    const xuatsac = await Bangdiem.count({
        where: {
            malop: malop,
            gpa: {
                [Op.gte]: 3.6
            }
        }
    });
    console.log(malop)
    const gioi = await Bangdiem.count({
        where: {
            malop: malop,
            gpa: {
                [Op.and]: {
                    [Op.gte]: 3.2,
                    [Op.lt]: 3.6
                }
            }
        }
    });
    const kha = await Bangdiem.count({
        where: {
            malop: malop,
            gpa: {
                [Op.and]: {
                    [Op.gte]: 2.5,
                    [Op.lt]: 3.2
                }
            }
        }
    });
    const trungbinh = await Bangdiem.count({
        where: {
            malop: malop,
            gpa: {
                [Op.and]: {
                    [Op.gte]: 2.0,
                    [Op.lt]: 2.5
                }
            }
        }
    });
    const yeu = await Bangdiem.count({
        where: {
            malop: malop,
            gpa: {
                [Op.lt]: 2.0
            }
        }
    });
    console.log(malop)
    console.log(xuatsac, gioi, kha, trungbinh, yeu)
    userInfo.dataValues.xuatsac = xuatsac;
    userInfo.dataValues.gioi = gioi;
    userInfo.dataValues.kha = kha;
    userInfo.dataValues.trungbinh = trungbinh;
    userInfo.dataValues.yeu = yeu;
    userInfo.dataValues.ngaysinhchuan = ngaysinhchuan;
    userInfo.dataValues.sinhvien = sinhviens;
    userInfo.dataValues.diemSinhVien = diemsinhvien;
    userInfo.dataValues.diemRenLuyen = drl;
    userInfo.dataValues.classId = classId;
    userInfo.dataValues.username = username;
    res.render('my', userInfo.dataValues);
}

const changeUserInfo = '';

const user = {
    teacherInfo: teacherInfo,
}

module.exports = user;