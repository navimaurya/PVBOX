const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const authController = require('./authController');
const Contact = require('./../models/contacts');
const User = require('./../models/users');
const users = require('./../models/users');

exports.getLoggedInUser = catchAsync(async (req, res, next) => {
    req.user.image = req.protocol + "://" + req.get("host") + "/users/profile/" + req.user.image;
    res.status(200).json({
        status: 'success',
        data: req.user
    })
});

exports.getFriends = catchAsync(async (req, res, next) => {
    const { userid } = req.query;
    let users = null;
    // var regex = new RegExp(["^", userid, "$"].join(""), "i");
    if (userid) {

        let regex = new RegExp("^" + userid, "i")
        // let ngregex = new RegExp("^" + req.user.username, "i") //{ $regex: SystemDefaultTemplate"}
        // let ngregex = new RegExp('^((?!('+ req.user.username +')).)*$', "i") //{ $regex: SystemDefaultTemplate"}
        if (userid?.startsWith('@')) {
            const str = userid.replace('@', '')
            users = await User.find({ username: { $regex: str } }).limit(20)
        } else {
            users = await User.find({
                $and: [{
                    $or: [
                        { username: { $regex: regex } },
                        { name: { $regex: regex } },
                        { email: { $regex: regex } },
                    ]
                }, {
                    $or: [
                        { _id: { $ne: req.user._id } }
                    ]
                }]
            }).limit(20);
        }
    }
    const url = req.protocol + "://" + await req.get("host") + "/users/profile/"
    users.map((item, i) => {
        users[i].image = url + users[i].image
    })
    res.status(200).json({
        status: 'success',
        data: users
    })
})

exports.addContact = catchAsync(async (req, res, next) => {
    const { userId } = req.body;
    if (!userId) return next(new AppError('Please provide a valid userId.', 400));
    const email = username = userId;
    const phone = userId * 1 || 0;
    const user = await User.findOne({ $or: [{ email }, { phone }, { username }] })
    if (!user) return next(new AppError("Incorrect user identity", 404));
    const isAlreadyFriend = await Contact.findOne({ $and: [{ user: req.user._id }, { friend: user._id }] })
    if (isAlreadyFriend) return next(new AppError("Already he/She your friend.", 401));
    const newContact = new Contact({
        user: req.user._id,
        friend: user._id
    })
    const data = await newContact.save()
    data.friend.image = req.protocol + "://" + req.get("host") + "/users/profile/" + data.friend.image
    res.status(200).json({
        status: 'success',
        data
    });
});

exports.getFriendsList = catchAsync(async (req, res, next) => {
    const user = req.user._id;
    let data = await Contact.find({ user }, { __V: -1 }).sort({ name: 1 });
    if (data.length > 0) {
        data.forEach((item, i) => {
            data[i] = item.friend;
            if (!item.friend.image.startsWith('http')) {
                data[i].image = req.protocol + "://" + req.get("host") + "/users/profile/" + item.friend.image;
            }
        });
    }
    console.log(data);
    res.status(200).json({
        status: 'success',
        total: data.length,
        data
    });
});

exports.updateClinetId = catchAsync(async (req, res, next) => {
    const user = req.user._id;
    const { socketId } = req.body;
    let data = await User.findById(user._id);
    if (!data) {
        return next(new AppError("user not login", 401))
    }
    data.socketId = socketId
    await data.save()
    res.status(200).json({
        status: 'success',
        data
    });
});

exports.getClinetId = catchAsync(async (req, res, next) => {
    const { _id } = req.body;
    let data = await User.findById(_id);
    if (!data) {
        return next(new AppError("User not found", 404))
    }
    res.status(200).json({
        status: 'success',
        socketId: data?.socketId
    });
});