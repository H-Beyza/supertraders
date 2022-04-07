module.exports = (sequelize, Sequelize) => {
    const Portfolio = sequelize.define("portfolios", {
        name: {
            type: Sequelize.STRING
        },
        surname: {
            type: Sequelize.STRING
        },
    });
    return Portfolio;
};