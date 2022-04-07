module.exports = (sequelize, Sequelize, afterValidate) => {
  const UserShare = sequelize.define("user_shares", {
    shares: {
      type: Sequelize.INTEGER
    },
  }, {
    hooks: {
      afterValidate,
    }
  }

  );
  UserShare.belongsTo(require("./portfolio.model.js")(sequelize, Sequelize))
  UserShare.belongsTo(require("./share.model.js")(sequelize, Sequelize))
  return UserShare;
};