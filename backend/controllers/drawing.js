exports.getData = (req, res, next) => {
  res.status(200).json({
    git: true,
  });
};
