const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const afterValidate = (usershare) => {
  console.log(usershare.dataValues)
  if (usershare.dataValues.shares == 0) {
    db.user_shares.destroy({ where: { shares: "0" } })
  }
}
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.shares = require("./share.model.js")(sequelize, Sequelize);
db.portfolios = require("./portfolio.model.js")(sequelize, Sequelize);
db.user_shares = require("./user_shares.model.js")(sequelize, Sequelize, afterValidate);
db.transaction_logs = require("./transaction_log.model.js")(sequelize, Sequelize);

module.exports = db;