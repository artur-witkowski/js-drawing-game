exports.getMainPage = (req, res, next) => {
    return res.render('index/main-page');
}

exports.getNewRoom = (req, res, next) => {
    return res.render('index/new-room');
}

