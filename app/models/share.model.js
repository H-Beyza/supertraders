module.exports = (sequelize, Sequelize) => {
    const Share = sequelize.define("shares", {
        id: {
            type: Sequelize.STRING(3),
            primaryKey: true,
        },
        rate: {
            type: Sequelize.DECIMAL(10, 2)
        },
        total_shares: {
            type: Sequelize.INTEGER
        },
        shares_bought: {
            type: Sequelize.INTEGER
        },
        shares_sold: {
            type: Sequelize.INTEGER
        },
    });
    return Share;
};