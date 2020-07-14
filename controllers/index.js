exports.getMainPage = (req, res, next) => {
    return res.render('index/main-page', {
        path: "/"
    });
}

exports.getAboutPage = (req, res, next) => {
    return res.render('index/about-page', {
        path: "/about"
    });
}

exports.getAuthorPage = (req, res, next) => {
    return res.render('index/author-page', {
        path: "/author"
    });
}