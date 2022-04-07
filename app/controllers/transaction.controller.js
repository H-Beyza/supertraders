const db = require("../models");

exports.buy = (req, res) => {
    db.portfolios.findByPk(req.header("portfolioID")).then(user => {
        if (user) {
            db.shares.findByPk(req.body.shareID).then(share => {
                if (share) {
                    if (parseInt(share.total_shares) + parseInt(share.shares_sold) - parseInt(share.shares_bought) >= parseInt(req.body.numberOfShares)) {
                        var new_count = parseInt(share.shares_bought) + parseInt(req.body.numberOfShares);
                        db.shares.update({ "shares_bought": new_count }, {
                            where: { id: share.id }
                        })
                            .then(ok => {
                                if (ok == 1) {
                                    db.user_shares.findOne({ where: { portfolioId: user.id, shareId: req.body.shareID } }).then(user_share => {
                                        if (user_share) {
                                            db.user_shares.update({ "shares": db.sequelize.literal(`shares + ${parseInt(req.body.numberOfShares)}`) }, {
                                                where: { portfolioId: user.id, shareId: req.body.shareID }
                                            }).then(data => {
                                                if (data) {
                                                    const transaction_log = {
                                                        shares: req.body.numberOfShares,
                                                        portfolioId: user.id,
                                                        shareId: share.id,
                                                        price: share.rate,
                                                        transaction_type: "BUY"
                                                    };
                                                    db.transaction_logs.create(transaction_log).then(data => {
                                                        if (data) {
                                                            res.status(200).send({
                                                                message: "Buying process is completed successfully!",
                                                                transaction_log: data
                                                            })
                                                        } else {
                                                            res.send({
                                                                message: "Transaction log could not be recorded!"
                                                            });
                                                        }
                                                    })

                                                } else {
                                                    res.send({
                                                        message: "User share in portfolio could not be recorded!"
                                                    });
                                                }
                                            })
                                        } else {
                                            const user_share = {
                                                shares: req.body.numberOfShares,
                                                portfolioId: user.id,
                                                shareId: share.id
                                            };
                                            db.user_shares.create(user_share).then(data => {
                                                if (data) {
                                                    const transaction_log = {
                                                        shares: req.body.numberOfShares,
                                                        portfolioId: user.id,
                                                        shareId: share.id,
                                                        price: share.rate,
                                                        transaction_type: "BUY"
                                                    };
                                                    db.transaction_logs.create(transaction_log).then(data => {
                                                        if (data) {
                                                            res.status(200).send({
                                                                message: "Buying process is completed successfully!",
                                                                transaction_log: data
                                                            })
                                                        } else {
                                                            res.send({
                                                                message: "Transaction log could not be recorded!"
                                                            });
                                                        }
                                                    })

                                                } else {
                                                    res.send({
                                                        message: "User share in portfolio could not be recorded!"
                                                    });
                                                }
                                            })
                                        }
                                    })
                                } else {
                                    res.send({
                                        message: "Shares Bought could not be recorded!"
                                    });
                                }
                            })
                    } else {
                        res.status(400).send({
                            message: "Share quantity is not sufficient!"
                        });
                    }
                } else {
                    res.status(400).send({
                        message: "Share could not be found!"
                    });
                }
            }
            )
        } else {
            res.status(400).send({
                message: "Portfolio could not be found!"
            });
        }
    }
    )
};

exports.sell = (req, res) => {
    db.portfolios.findByPk(req.header("portfolioID")).then(user => {
        if (user) {
            db.user_shares.findOne({ where: { portfolioId: user.id, shareId: req.body.shareID } }).then(user_share => {
                if (user_share) {
                    var remaining_share = parseInt(user_share.shares) - parseInt(req.body.shareCount);
                    if (remaining_share >= 0) {
                        db.shares.update({ "shares_sold": db.sequelize.literal(`shares_sold + ${parseInt(req.body.shareCount)}`) }, {
                            where: { id: user_share.shareId }
                        })
                            .then(ok => {
                                if (ok == 1) {

                                    db.user_shares.update({ "shares": remaining_share }, {
                                        where: { portfolioId: user.id, shareId: req.body.shareID }
                                    })
                                        .then(num => {
                                            if (num == 1) {
                                                db.shares.findByPk(req.body.shareID).then(share => {
                                                    const transaction_log = {
                                                        shares: req.body.shareCount,
                                                        portfolioId: user.id,
                                                        shareId: share.id,
                                                        price: share.rate,
                                                        transaction_type: "SELL"
                                                    };
                                                    db.transaction_logs.create(transaction_log).then(data => {
                                                        if (data) {
                                                            res.status(200).send({
                                                                message: "Selling process is completed successfully!",
                                                                transaction_log: data
                                                            })
                                                        } else {
                                                            res.send({
                                                                message: "Transaction log could not be recorded!"
                                                            });
                                                        }
                                                    })
                                                })

                                            } else {
                                                res.send({
                                                    message: 'Portfolio could not updated successfully!'
                                                });
                                            }
                                        })

                                } else {
                                    res.send({
                                        message: "Shares Sold could not be recorded!"
                                    });
                                }
                            })
                    } else {
                        res.status(400).send({
                            message: "Share in portfolio is not sufficient to sold!"
                        });
                    }
                } else {
                    res.status(400).send({
                        message: "Share could not be found in portfolio!"
                    });

                }
            });
        }
        else {
            res.status(400).send({
                message: "Portfolio could not be found!"
            });
        }
    }
    )
};
