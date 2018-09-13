const model = require("./model");
const User = model.user;
const key = require("./key");
const jwt = require("jsonwebtoken");

module.exports = function(app) {
  // 注册
  app.post("/user/register", function(req, res) {
    const { user, pwd, type } = req.body;
    User.findOne({ user }, function(e, doc) {
      if (doc) {
        return res.status(200).json({ code: 1, msg: "the user is already exist" });
      }
      const model = new User({ user, pwd, type });
      model.save(function(error, doc) {
        if (error || !doc) {
          return res.status(500).json({ msg: "error in server" });
        }
        const { user, type, _id } = doc;
        // 保持登录状态7天
        const token = jwt.sign({ id: _id }, key, {
          expiresIn: 60 * 60 * 24 * 7
        });
        return res.status(200).json({ code: 0, token, data: { user, type, id: _id } });
      });
    });
  });
  // 登录
  app.post("/user/login", function(req, res) {
    const { user, pwd } = req.body;
    User.findOne({ user, pwd }, { pwd: 0 }, function(e, doc) {
      if (!doc) {
        return res.status(200).json({ code: 1, msg: "username or password is wrong" });
      }
      if (e) {
        return res.status(500).json({ msg: "error in server" });
      }
      const { user, type, _id } = doc;
      const token = jwt.sign({ id: _id }, key, {
        expiresIn: 60 * 60 * 24 * 7
      });
      return res.status(200).json({ code: 0, data: { user, type, id: _id }, token });
    });
  });
  // 获取登录信息
  app.post("/user/info", function(req, res) {
    const { id } = req.decoded;
    User.findOne({ _id: id }, function(e, user) {
      if (!user) {
        return res.status(401).json({ msg: "token wrong" });
      }
      if (e) {
        return res.status(500).json({ msg: "error in server" });
      }
      return res.json({
        code: 0,
        data: {
          user: user.user,
          type: user.type,
          id: user.id
        }
      });
    });
  });
  // 获取订单
  app.post("/user/orders", function(req, res) {
    const { id } = req.decoded;

    User.findOne({ _id: id })
      .populate({ path: "orders", options: { sort: { date: -1 } } })
      .exec(function(error, user) {
        if (error) {
          return res.status(500).json({ msg: "error in server" });
        }
        if (!user) {
          return res.status(200).json({ code: 1, errorMsg: "can not fond the user" });
        }

        return res.status(200).json({ code: 0, data: user.orders });
      });
  });
}
