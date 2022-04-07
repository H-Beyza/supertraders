module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transaction_logs", {
        transaction_type: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.DECIMAL(10, 2)
        },
        shares: {
            type: Sequelize.INTEGER
        },
    });
    Transaction.belongsTo(require("./portfolio.model.js")(sequelize, Sequelize))
    Transaction.belongsTo(require("./share.model.js")(sequelize, Sequelize))
    return Transaction;
};